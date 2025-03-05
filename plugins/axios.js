import { getToken } from '../utils/authorization'
import { showErrorAlert } from '../utils/services'
import W from '../utils/getWindow'

export default function ({ store, app: { $axios } }, inject) {
  // create an axios instance
  const api = $axios.create({
    baseURL: process.env.VUE_APP_APPLICATION_SERVER,
    timeout: 30000, // request timeout
  })

  // request interceptor
  api.interceptors.request.use(
    (config) => {
      // do something before request is sent
      const token = getToken()
      if (token) config.headers.Authorization = `Bearer ${token}`

      config.headers.Accept = 'application/json'

      return config
    },
    (error) => {
      // do something with request error
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      const status = (error && error.response && error.response.status) || 0

      const data = (error && error.response && error.response.data) || {}
      const { message } = data
      const isNotAuthenticated =
        status === 401 ||
        message.toUpperCase().includes('TOKEN EXPIRED') ||
        message.toUpperCase().includes('TOKEN TIDAK VALID') ||
        message.toUpperCase().includes('INVALID TOKEN')

      if (isNotAuthenticated) {
        showErrorAlert(message)

        store.dispatch('user/logout')
        setTimeout(() => {
          W.location.replace('/login')
        }, 1000)
      }
      return Promise.reject(error)
    }
  )

  // Inject to context as $api
  inject('api', api)
}
