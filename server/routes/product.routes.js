const express = require('express')
const checkRole = require('../middleware/role.middleware')
const Product = require('../models/Product')
const router = express.Router({ mergeParams: true })

router
    .route('/')
    .get(async (req, res) => {
        try {
            const list = await Product.find()
            res.send(list)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })
    .post(checkRole(true), async (req, res) => {
        try {
            const newProduct = await Product.create({
                ...req.body
            })
            res.status(201).send(newProduct)
        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })
router
    .route('/:productId')
    .get(async (req, res) => {
        try {
            const { productId } = req.params
            const product = await Product.findById(productId)
            res.send(product)
        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })
    .patch(checkRole(true), async (req, res) => {
        try {
            const { productId } = req.params

            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                req.body,
                {
                    new: true
                }
            )
            res.send(updatedProduct)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })
    .delete(checkRole(true), async (req, res) => {
        try {
            const { productId } = req.params
            const removedProduct = await Product.findById(productId)
            await removedProduct.remove()
            return res.send(null)
        } catch (error) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже'
            })
        }
    })

module.exports = router
