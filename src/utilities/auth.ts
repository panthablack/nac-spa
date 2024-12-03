import axios from 'axios'
import { api } from '@/utilities/api'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/types/auth'

export const apiLogIn = (email: string, password: string) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_API_ROOT_URL}/login`, { email, password })
      .then(res => {
        if (res.status !== 204) reject(new Error(`Unexpected login status: ${res.status}`))
        console.debug('Successfully logged in to the API: ', res)
        resolve(res)
      })
      .catch(e => reject(e))
  })

export const fetchCookie = () =>
  new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_API_ROOT_URL}/sanctum/csrf-cookie`)
      .then(res => {
        if (res.status !== 204) reject(new Error(`Unexpected cookie status: ${res.status}`))
        console.debug('Cookie Fetched: ', res)
        resolve(res)
      })
      .catch(e => reject(e))
  })

export const fetchUserData = () =>
  new Promise((resolve, reject) => {
    const authStore = useAuthStore()
    console.debug('Fetching User Data')
    api('/user', undefined, true)
      .then(res => {
        console.debug('Successfully fetched User Data: ', res)
        const userData: User = res?.data
        authStore.setUser(userData)
        resolve(res)
      })
      .catch(e => reject(e))
  })

export const logIn = async (email: string, password: string) =>
  new Promise((resolve, reject) => {
    console.debug('Fetching Cookie')
    fetchCookie()
      .then(() => {
        console.debug('Logging in')
        apiLogIn(email, password)
          .then(() => {
            fetchUserData()
              .then(res => {
                resolve(res)
              })
              .catch(e => reject(e))
          })
          .catch(e => reject(e))
      })
      .catch(e => reject(e))
  })

export const logOut = async () =>
  new Promise((resolve, reject) => {
    console.debug('Logging Out')
    axios
      .post(`${import.meta.env.VITE_API_ROOT_URL}/logout`)
      .then(res => {
        if (res.status !== 204) reject(new Error(`Unexpected logout status: ${res.status}`))
        const authStore = useAuthStore()
        authStore.setUser(null)
        console.debug('Successfully logged out of the API: ', res)
        resolve(res)
      })
      .catch(e => reject(e))
  })
