// src/boot/axios.js
import { boot } from 'quasar/wrappers'
import axios from 'axios'

const API_URL = 'http://attendance-backend-9nhc.onrender.com/api/'
const apiClient = (axios.defaults.baseURL = API_URL)
axios.defaults.headers.common['Content-Type'] = 'application/json'

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = apiClient
})
export { axios, apiClient }
