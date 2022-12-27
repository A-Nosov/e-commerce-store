import { createAction, createSlice } from '@reduxjs/toolkit'
import cartProductService from '../services/cartProduct.service'

const cartProductSlice = createSlice({
    name: 'cartProduct',
    initialState: { entities: null, isLoading: true, error: null },
    reducers: {
        cartProductRequested: (state) => {
            state.isLoading = true
        },
        cartProductReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        cartProductRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        cartProductCreated: (state, action) => {
            state.entities.push(action.payload)
        },
        cartProductReset: (state) => {
            state.entities = null
        },
        cartProductUpdateSucceeded: (state, action) => {
            state.entities[
                state.entities.findIndex((u) => u._id === action.payload._id)
            ] = action.payload
        },
        cartProductUpdateFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        cartProductRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            )
        }
    }
})

const { reducer: cartProductReducer, actions } = cartProductSlice
const {
    cartProductRequested,
    cartProductReceived,
    cartProductRequestFailed,
    cartProductCreated,
    cartProductUpdateSucceeded,
    cartProductRemoved,
    cartProductUpdateFailed,
    cartProductReset
} = actions

const addCartProductRequested = createAction(
    'cartProduct/addCartProductRequested'
)
const updateCartProductRequested = createAction(
    'cartProduct/updateCartProductRequested'
)
const removeCartProductRequested = createAction(
    'cartProduct/removeCartProductRequested'
)

export const loadUserCartProductsList = () => async (dispatch) => {
    dispatch(cartProductRequested())
    try {
        const { content } = await cartProductService.getUserCartProducts()
        dispatch(cartProductReceived(content))
    } catch (error) {
        dispatch(cartProductRequestFailed(error.message))
    }
}
export const createCartProduct = (payload) => async (dispatch) => {
    dispatch(addCartProductRequested())
    try {
        const { content } = await cartProductService.createCartProduct(payload)
        dispatch(cartProductCreated(content))
    } catch (error) {
        dispatch(cartProductRequestFailed(error.message))
    }
}
export const updateCartProduct =
    (cartProductId, payload) => async (dispatch) => {
        dispatch(updateCartProductRequested())
        try {
            const { content } = await cartProductService.updateCartProduct(
                cartProductId,
                payload
            )
            dispatch(cartProductUpdateSucceeded(content))
        } catch (error) {
            dispatch(cartProductUpdateFailed(error.message))
        }
    }

export const removeCartProduct = (cartProductId) => async (dispatch) => {
    dispatch(removeCartProductRequested())
    try {
        const { content } = await cartProductService.removeCart(cartProductId)
        if (!content) {
            dispatch(cartProductRemoved(cartProductId))
        }
    } catch (error) {
        dispatch(cartProductRequestFailed(error.message))
    }
}
export const resetCartProduct = () => (dispatch) => {
    dispatch(cartProductReset())
}

export const getCartProducts = () => (state) => state.cartProduct.entities
export const getCartProductLoadingStatus = () => (state) =>
    state.cartProduct.isLoading

export default cartProductReducer
