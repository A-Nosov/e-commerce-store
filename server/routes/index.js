const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/auth', require('./auth.routes'))
router.use('/user', require('./user.routes'))
router.use('/product', require('./product.routes'))
router.use('/brand', require('./brand.routes'))
router.use('/cartProduct', require('./cartProduct.routes'))
router.use('/size', require('./size.routes'))

module.exports = router
