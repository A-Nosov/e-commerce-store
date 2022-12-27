const { Schema, model } = require('mongoose')

const schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        size: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('CartProduct', schema)
