const { Schema, model } = require('mongoose')

const schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
        category: { type: String, enum: ['Мужское', 'Женское'] },
        description: { type: String, required: true },
        price: { type: Number, required: true }
    },
    {
        timestamps: true
    }
)

module.exports = model('Product', schema)
