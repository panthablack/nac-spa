import axios from 'axios'
import Echo, { Channel, type PresenceChannel } from 'laravel-echo'
import Pusher from 'pusher-js'

Pusher.logToConsole = import.meta.env.DEV

export type ListenCallback = (event: any) => void

export type ReverbConfig = {
  broadcaster: 'reverb'
  key: string
  wsHost: string
  wsPort: string | number
  wssPort: string | number
  forceTLS: string
  enabledTransports: string[]
}

export type UseReverbInterface = {
  channels: Record<string, Channel>
  close: (channelName: string, eventName?: string) => void
  init: () => void
  join: (channelName: string) => PresenceChannel
  listen: (
    channelName: string,
    eventName: string,
    callback: ListenCallback,
    isPrivate?: boolean
  ) => Channel
  reverb: Echo<'reverb'>
  socketId: string | undefined
}

export const makeNewReverb = (config?: ReverbConfig): Echo<'reverb'> => {
  const { broadcaster, key, wsHost, wsPort, wssPort, forceTLS, enabledTransports } = config || {}

  const authURL = `${import.meta.env.VITE_API_ROOT_URL}/broadcasting/auth`
  const axiosJSONHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' }

  return new Echo({
    authorizer: (channel: typeof Channel) => ({
      authorize: (socketId: string, callback: Function) =>
        axios(authURL, {
          method: 'POST',
          data: { socket_id: socketId, channel_name: channel.name },
          headers: axiosJSONHeaders,
        })
          .then(r => callback(false, r.data))
          .catch(e => callback(true, e.response)),
    }),
    broadcaster: broadcaster || 'reverb',
    options: { pusher: Pusher },
    key: key || import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: wsHost || import.meta.env.VITE_REVERB_HOST,
    wsPort: (wsPort || import.meta.env.VITE_REVERB_PORT) ?? 80,
    wssPort: (wssPort || import.meta.env.VITE_REVERB_PORT) ?? 443,
    forceTLS: forceTLS || (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: enabledTransports || ['ws', 'wss'],
  })
}
