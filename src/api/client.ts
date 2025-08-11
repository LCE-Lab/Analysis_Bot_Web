import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandle = (error: any) => {
  if (error.response) {
    console.error('Response error:', error.response)
    return error.response
  } else if (error.request) {
    console.error('Request error:', error.request)
  } else {
    console.error('Error:', error.message)
  }
}

export const apiClient = () => {
  const client = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL ?? ''}/api`,
    timeout: 60 * 1000,
  })

  client.interceptors.request.use((value) => value, errorHandle)
  client.interceptors.response.use((value) => value, errorHandle)

  return client
}
