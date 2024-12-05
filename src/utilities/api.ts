import axios, { type AxiosResponse } from 'axios'
import { camelise, snakify } from './casify'
import { API_CONFIG } from '@/config/api'

type ApiOptions = {
  data?: Record<string, any>
}

export const getApiOptions = (options: ApiOptions | undefined): ApiOptions | undefined => {
  if (options?.data && API_CONFIG.SNAKIFY_OUTGOING) options.data = snakify(options.data)
  return options
}

const onApiError = (e: Error) => console.error(e)

const onApiSuccess = (res: AxiosResponse, returnRes: boolean): any =>
  returnRes ? res : API_CONFIG.CAMELISE_INCOMING ? camelise(res?.data) : res?.data

export const getApiUrl = (target: string) => `${import.meta.env.VITE_API_ROOT_URL}/api${target}`

export const api = async (target: string, options?: ApiOptions, returnRes: boolean = false) => {
  const res = await axios(getApiUrl(target), getApiOptions(options)).catch(e => onApiError(e))
  if (!res) throw new Error('No response object returned from API call')
  return onApiSuccess(res, returnRes)
}
