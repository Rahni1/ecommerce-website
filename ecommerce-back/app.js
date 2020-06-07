const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const expressValidator = require('express-validator')

require('dotenv').config()

// import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
// app
const app = express()

// connect db - first arg is url (specified in .env)
mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/ecommerce', {
useNewUrlParser: true,
useCreateIndex: true,
useUnifiedTopology: true
}).then(() => console.log('DB connected'))

// middlewares 
app.use(morgan('dev'))
app.use(bodyParser.json())
// used to save users credentials
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())


// routes middleware
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})