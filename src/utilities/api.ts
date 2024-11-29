import axios from 'axios'

type ApiOptions = {
  data?: Record<string, any>
}

export const api = async (target: string, options?: ApiOptions) => {
  const url = `${import.meta.env.VITE_API_ROOT_URL}/api${target}`
  return axios(url, options).catch(e => console.error(e))
}
