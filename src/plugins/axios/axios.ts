import axios from 'axios'
const config = {
  timeout: 60 * 1000
}
// tslint:disable-next-line: variable-name
const _axios = axios.create(config)
// tslint:disable-next-line: no-shadowed-variable
_axios.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

_axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

export default {
  async Get (url: string) {
    const res = await _axios.get(url)
    return JSON.stringify(res.data)
  }
}