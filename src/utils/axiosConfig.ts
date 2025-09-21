import axios from 'axios'
import Cookie from 'js-cookie'
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to check for FormData and set the correct Content-Type
api.interceptors.request.use(
  config => {
    const token = Cookie.get('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// Optionally, add interceptors for requests and responses
api.interceptors.response.use(
  response => response,
  error => {
    // Handle errors globally (e.g., logging, alerting, etc.)
    return Promise.reject(error)
  },
)

export default api
