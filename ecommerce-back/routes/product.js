const express = require('express')
const router = express.Router()

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')
// crud operations
const { create,
    productById,
    read,
    remove,
    update,
    list,
    listRelated,
    listCategories,
    listBySearch,
    photo,
    listSearch } = require("../controllers/product");
const { userById } = require('../controllers/user')

router.get('/product/:productId', read) // -> get single post 
router.post("/product/create/:userId", requireSignin, isAuth, isAdmin, create); // -> create single post
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove)
// put method is used to update
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update)

router.get('/products', list)
router.get('/products/search', listSearch)
router.get('/products/related/:productId', listRelated)
router.get('/products/categories', listCategories)
router.post('/products/by/search', listBySearch)
router.get('/product/photo/:productId', photo) // -> get photo of single post


router.param('userId', userById)
router.param('productId', productById)

module.exports = router

