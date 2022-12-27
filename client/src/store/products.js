import { createAction, createSlice } from '@reduxjs/toolkit'
import productService from '../services/product.service'

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true
        },
        productsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        productCreated: (state, action) => {
            state.entities.push(action.payload)
        },
        productUpdated: (state, action) => {
            state.entities[
                state.entities.findIndex((p) => p._id === action.payload._id)
            ] = action.payload
        },
        productRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (p) => p._id !== action.payload
            )
        },
        productsRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: productsReducer, actions } = productsSlice
const {
    productsRequested,
    productsReceived,
    productCreated,
    productUpdated,
    productRemoved,
    productsRequestFiled
} = actions

const addProductRequested = createAction('cartProduct/addProductRequested')
const productUpdateRequested = createAction('users/productUpdateRequested')
const productUpdateFailed = createAction('users/productUpdateFailed')
const removeProductRequested = createAction('comments/removeCommentRequested')

export const loadProductsList = () => async (dispatch) => {
    dispatch(productsRequested())
    try {
        const { content } = await productService.get()
        dispatch(productsReceived(content))
    } catch (error) {
        dispatch(productsRequestFiled(error.message))
    }
}
export const createProduct = (payload) => async (dispatch) => {
    dispatch(addProductRequested())
    try {
        const { content } = await productService.createProduct(payload)
        dispatch(productCreated(content))
    } catch (error) {
        dispatch(productsRequestFiled(error.message))
    }
}
export const updateProduct = (productId, payload) => async (dispatch) => {
    dispatch(productUpdateRequested())
    try {
        const { content } = await productService.updateProduct(
            productId,
            payload
        )
        dispatch(productUpdated(content))
    } catch (error) {
        dispatch(productUpdateFailed(error.message))
    }
}
export const removeProduct = (productId) => async (dispatch) => {
    dispatch(removeProductRequested())
    try {
        const { content } = await productService.removeProduct(productId)
        if (!content) {
            dispatch(productRemoved(productId))
        }
    } catch (error) {
        dispatch(productsRequestFiled(error.message))
    }
}

export const getProductsList = () => (state) => state.products.entities
export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading
export const getProductById = (id) => (state) => {
    if (state.products.entities) {
        return state.products.entities.find((p) => p._id === id)
    }
}

export default productsReducer
