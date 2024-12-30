export const AUTH_TYPES = {
  NONE: 1,
  COOKIE: 2,
  TOKEN: 3,
}

export const DEFAULT_AUTH_TYPE = parseInt(import.meta.env.VITE_AUTH_TYPE || AUTH_TYPES.COOKIE)
