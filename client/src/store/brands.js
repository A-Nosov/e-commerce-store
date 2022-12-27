import { createSlice } from '@reduxjs/toolkit'
import brandService from '../services/brand.service'

const brandsSlice = createSlice({
    name: 'brands',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        brandsRequested: (state) => {
            state.isLoading = true
        },
        brandsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        brandsRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: brandsReducer, actions } = brandsSlice
const { brandsRequested, brandsReceived, brandsRequestFiled } = actions

export const loadBrandsList = () => async (dispatch) => {
    dispatch(brandsRequested())
    try {
        const { content } = await brandService.get()
        dispatch(brandsReceived(content))
    } catch (error) {
        dispatch(brandsRequestFiled(error.message))
    }
}

export const getBrandsList = () => (state) => state.brands.entities
export const getBrandsLoadingStatus = () => (state) => state.brands.isLoading
export const getBrandById = (id) => (state) => {
    if (state.brands.entities) {
        return state.brands.entities.find((b) => b._id === id)
    }
}

export default brandsReducer
