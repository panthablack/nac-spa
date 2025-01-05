export const API_CONFIG = {
  CAMELISE_INCOMING: true,
  SNAKIFY_OUTGOING: true,
} as const

export const X_DEBUG_SESSION_ID = import.meta.env.VITE_X_DEBUG_ID || 'X_DEBUG_ID'
