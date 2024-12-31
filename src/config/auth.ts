import { AUTH_TYPES } from '@/enums/auth'

export const DEFAULT_AUTH_TYPE = parseInt(import.meta.env.VITE_AUTH_TYPE || AUTH_TYPES.COOKIE)
