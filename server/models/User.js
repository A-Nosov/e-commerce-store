const { Schema, model } = require('mongoose')

const schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        sex: { type: String, enum: ['Мужской', 'Женский'] },
        isAdmin: { type: Boolean, default: false, required: true }
    },
    {
        timestamps: true
    }
)

module.exports = model('User', schema)
