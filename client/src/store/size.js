import { createSlice } from '@reduxjs/toolkit'
import sizeService from '../services/size.service.js'

const sizesSlice = createSlice({
    name: 'sizes',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        sizesRequested: (state) => {
            state.isLoading = true
        },
        sizesReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        sizesRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: sizesReducer, actions } = sizesSlice
const { sizesRequested, sizesReceived, sizesRequestFiled } = actions

export const loadSizesList = () => async (dispatch) => {
    dispatch(sizesRequested())
    try {
        const { content } = await sizeService.get()
        dispatch(sizesReceived(content))
    } catch (error) {
        dispatch(sizesRequestFiled(error.message))
    }
}

export const getSizesList = () => (state) => state.sizes.entities
export const getSizesLoadingStatus = () => (state) => state.sizes.isLoading

export default sizesReducer
