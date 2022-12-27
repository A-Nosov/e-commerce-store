import httpService from './http.service'
const brandEndpoint = 'brand/'

const brandService = {
    get: async () => {
        const { data } = await httpService.get(brandEndpoint)
        return data
    }
}
export default brandService
