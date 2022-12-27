const Product = require('../models/Product')
const productsMock = require('../mock/products.json')
const Brand = require('../models/Brand')
const brandsMock = require('../mock/brands.json')
const User = require('../models/User')
const usersMock = require('../mock/users.json')
const Size = require('../models/Size')
const sizesMock = require('../mock/sizes.json')

module.exports = async () => {
    const brands = await Brand.find()
    if (brands.length !== brandsMock.length) {
        await createInitialEntity(Brand, brandsMock)
    }

    const products = await Product.find()
    if (products.length < productsMock.length) {
        await createInitialEntity(Product, productsMock)
    }

    const users = await User.find()
    if (users.length < usersMock.length) {
        await createInitialEntity(User, usersMock)
    }

    const sizes = await Size.find()
    if (sizes.length !== sizesMock.length) {
        await createInitialEntity(Size, sizesMock)
    }
}

async function createInitialEntity(Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async (item) => {
            try {
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (error) {
                return error
            }
        })
    )
}
