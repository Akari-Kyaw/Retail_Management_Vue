import axios from "axios"
import { Cookie } from "lucide-vue-next"

export type APIResponse<T> = {
    message: string
    status: number
    data: T
}
const axiosInstance = axios.create({
    baseURL: 'https://localhost:7175/api',
    // timeout: 10000, // Optional: Set a timeout for requests (in milliseconds)
    headers: {
        'Content-Type': 'application/json'
    }
    // Add more default configurations if needed
})
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = Cookies.get('template-app-token')
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`
//         }

//         // Add authorization or other headers if needed
//         return config
//     },
//     (error) => {
//         return Promise.reject(error)
//     }
// )

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance
