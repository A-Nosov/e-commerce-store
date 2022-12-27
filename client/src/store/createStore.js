import { combineReducers, configureStore } from '@reduxjs/toolkit'
import brandsReducer from './brands'
import cartProductReducer from './cartProduct'
import productsReducer from './products'
import sizesReducer from './size'
import usersReducer from './users'

const rootReducer = combineReducers({
    cartProduct: cartProductReducer,
    users: usersReducer,
    products: productsReducer,
    brands: brandsReducer,
    sizes: sizesReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
