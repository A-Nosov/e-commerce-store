const express = require('express')
const auth = require('../middleware/auth.middleware')
const CartProduct = require('../models/CartProduct')
const router = express.Router({ mergeParams: true })

router.post('/', auth, async (req, res) => {
    try {
        const newCartProduct = await CartProduct.create({
            ...req.body
        })
        res.status(201).send(newCartProduct)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})
router.get('/:userId', auth, async (req, res) => {
    try {
        const { userId } = req.params
        const cart = await CartProduct.find({ userId })
        res.send(cart)
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})
router
    .route('/:cartProductId')
    .patch(auth, async (req, res) => {
        try {
            const { cartProductId } = req.params

            const updatedCartProduct = await CartProduct.findByIdAndUpdate(
                cartProductId,
                req.body,
                {
                    new: true
                }
            )
            res.send(updatedCartProduct)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })
    .delete(auth, async (req, res) => {
        try {
            const { cartProductId } = req.params
            const removedCartProduct = await CartProduct.findById(cartProductId)
            await removedCartProduct.remove()
            return res.send(null)
        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })

module.exports = router
