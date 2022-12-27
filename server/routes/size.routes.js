const express = require('express')
const Size = require('../models/Size')
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
    try {
        const list = await Size.find()
        res.send(list)
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

module.exports = router
