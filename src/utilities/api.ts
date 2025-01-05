import axios, { type AxiosResponse } from 'axios'
import { camelise, snakify } from './casify'
import { API_CONFIG, X_DEBUG_SESSION_ID } from '@/config/api'
import { useReverb } from '@/composables/useReverb'

export type ApiMethod =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'delete'
  | 'DELETE'

export type ApiOptions = {
  data?: Record<string, any>
  headers?: Record<string, any>
  method?: ApiMethod
  params?: Record<string, any>
}

export const getApiOptions = (options: ApiOptions | undefined = {}): ApiOptions => {
  // snakify, if reuested
  if (options?.data && API_CONFIG.SNAKIFY_OUTGOING) options.data = snakify(options.data)
  // Set API headers
  setApiHeaders(options)
  // Set API params
  setApiParams(options)
  return options
}

const onApiError = (e: Error) => console.error(e)

const onApiSuccess = (res: AxiosResponse, returnRes: boolean): any =>
  returnRes ? res : API_CONFIG.CAMELISE_INCOMING ? camelise(res?.data) : res?.data

export const getApiUrl = (target: string) => `${import.meta.env.VITE_API_ROOT_URL}/api${target}`

export const setApiHeaders = (options: ApiOptions): ApiOptions => {
  options.headers = { ...(options.headers || {}) }
  // if reverb in use and socket ID available, set the header
  const reverb = useReverb()
  if (reverb.socketId) options.headers['X-Socket-Id'] = reverb.socketId
  // return options
  return options
}

export const setApiParams = (options: ApiOptions): ApiOptions => {
  // if xdebug on, set param
  if (import.meta.env.VITE_X_DEBUG === 'true')
    options.params = { ...(options.params || {}), XDEBUG_SESSION_START: X_DEBUG_SESSION_ID }
  // return options
  return options
}

export const api = async (target: string, options?: ApiOptions, returnRes: boolean = false) => {
  const res = await axios(getApiUrl(target), getApiOptions(options)).catch(e => onApiError(e))
  if (!res) throw new Error('No response object returned from API call')
  return onApiSuccess(res, returnRes)
}
