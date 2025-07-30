import axios from 'axios'
const axiosConfig = {
  timeout: 60 * 1000
}

const _axios = axios.create(axiosConfig)

_axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

_axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export default {
  async Get (url: string, headers = {}) {
    const res = await _axios.get(url, headers)
    return JSON.stringify(res.data)
  }
}
