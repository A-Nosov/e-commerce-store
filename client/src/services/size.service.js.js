import httpService from './http.service'
const sizeEndpoint = 'size/'

const sizeService = {
    get: async () => {
        const { data } = await httpService.get(sizeEndpoint)
        return data
    }
}
export default sizeService
