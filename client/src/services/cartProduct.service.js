import httpService from './http.service'
import localStorageService from './localStorage.service'
const cartEndpoint = 'cartProduct/'

const cartService = {
    createCartProduct: async (payload) => {
        const { data } = await httpService.post(cartEndpoint, payload)
        return data
    },
    getUserCartProducts: async () => {
        const { data } = await httpService.get(
            cartEndpoint + localStorageService.getUserId()
        )
        return data
    },
    updateCartProduct: async (cartProductId, payload) => {
        const { data } = await httpService.patch(
            cartEndpoint + cartProductId,
            payload
        )
        return data
    },
    removeCart: async (cartProductId) => {
        const { data } = await httpService.delete(cartEndpoint + cartProductId)
        return data
    }
}
export default cartService
