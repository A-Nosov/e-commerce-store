import httpService from './http.service'
const productEndpoint = 'product/'

const productService = {
    get: async () => {
        const { data } = await httpService.get(productEndpoint)
        return data
    },
    getCurrentProduct: async (productId) => {
        const { data } = await httpService.get(productEndpoint + productId)
        return data
    },
    createProduct: async (payload) => {
        const { data } = await httpService.post(productEndpoint, payload)
        return data
    },
    updateProduct: async (productId, payload) => {
        const { data } = await httpService.patch(
            productEndpoint + productId,
            payload
        )
        return data
    },
    removeProduct: async (productId) => {
        const { data } = await httpService.delete(productEndpoint + productId)
        return data
    }
}
export default productService
