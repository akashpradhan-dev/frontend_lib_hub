import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor to check for FormData and set the correct Content-Type
api.interceptors.request.use(
  config => {
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
