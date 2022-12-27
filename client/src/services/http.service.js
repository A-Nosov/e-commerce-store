import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import authService from './auth.service'
import localStorageService from './localStorage.service'

const http = axios.create({
    baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(
    async function (config) {
        const expiresDate = localStorageService.getTokenExpiresDate()
        const refreshToken = localStorageService.getRefreshToken()
        if (refreshToken && expiresDate < Date.now()) {
            const data = await authService.refresh()
            localStorageService.setTokens(data)
        }
        const accessToken = localStorageService.getAccessToken()
        if (accessToken) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`
            }
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

http.interceptors.response.use(
    (res) => {
        res.data = { content: res.data }
        return res
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500

        if (!expectedErrors) {
            console.log(error)
            toast.error('Something was wrong. Try it later')
        }
        return Promise.reject(error)
    }
)
const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
}
export default httpService
