const { Order, CartItem } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');
// sendgrid for email npm i @sendgrid/mail
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.order = order;
            next();
        });
};

exports.create = (req, res) => {
    console.log('CREATE ORDER: ', req.body);
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        // send email alert to admin
        // order.address
        // order.products.length
        // order.amount
        const emailData = {
            to: 'rahnikaurbansal@gmail.com',
            from: 'rahnidemeis@gmail.com',
            subject: `A new order is received`,
            html: `
            <p>Customer name:</p>
            <p>Total products: ${order.products.length}</p>
            <p>Total cost: £${order.amount}</p>
            <p>Login to dashboard to view the order in detail.</p>
        `
        };
        sgMail
        .send(emailData)
        .then(sent => console.log('SENT >>>', sent))
        .catch(err => console.log('ERR >>>', err));

    // email to buyer
    const emailData2 = {
        to: order.user.email,
        from: 'rahnidemeis@gmail.com',
        subject: `You order is in process`,
        html: `
        <h1>Hey ${req.profile.name}, Thank you for shopping with us.</h1>
        <h2>Total products: ${order.products.length}</h2>
        <h2>Transaction ID: ${order.transaction_id}</h2>
        <h2>Order status: ${order.status}</h2>
        <h2>Product details:</h2>
        <hr />
        ${order.products
            .map(p => {
                return `<div>
                    <h3>Product Name: ${p.name}</h3>
                    <h3>Product Price: £${p.price}</h3>
                    <h3>Product Quantity: ${p.count}</h3>
            </div>`;
            })
            .join('--------------------')}
        <h2>Total order cost: ${order.amount}<h2>
        <p>Thank your for shopping with us.</p>
    `
    };
    sgMail
        .send(emailData2)
        .then(sent => console.log('SENT 2 >>>', sent))
        .catch(err => console.log('ERR 2 >>>', err));

    res.json(data);
});
};

exports.listOrders = (req, res) => {
    Order.find()
        .populate('user', '_id name address')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(orders);
        });
};

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
};

exports.updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(order);
    });
};