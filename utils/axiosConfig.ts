import axios from 'axios'
import Cookies from 'js-cookie'
// Create an instance of Axios with a base URL

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to check for FormData and set the correct Content-Type
api.interceptors.request.use(
  config => {
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }

    const token = Cookies.get('authToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
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
