import axios from 'axios'
import Echo, { Channel } from 'laravel-echo'
import Pusher from 'pusher-js'
import { reactive } from 'vue'

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
  listen: (
    channelName: string,
    eventName: string,
    callback: ListenCallback,
    isPrivate?: boolean
  ) => Channel
  reverb: Echo<'reverb'>
}

export const useReverb = (config?: ReverbConfig): UseReverbInterface => {
  const { broadcaster, key, wsHost, wsPort, wssPort, forceTLS, enabledTransports } = config || {}

  const authURL = `${import.meta.env.VITE_API_ROOT_URL}/broadcasting/auth`
  const axiosJSONHeaders = { 'Content-Type': 'application/json', Accept: 'application/json' }

  const reverb = new Echo({
    authorizer: (channel: typeof Channel) => ({
      authorize: (socketId: string, callback: Function) =>
        axios(authURL, {
          method: 'POST',
          data: { socket_id: socketId, channel_name: channel.name },
          headers: axiosJSONHeaders,
        })
          .then(res => callback(false, res.data))
          .catch(e => console.error(e)),
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

  const channels: Record<string, Channel> = reactive({})

  const makeNewChannel = (channelName: string, isPrivate?: boolean): Channel =>
    (channels[channelName] = isPrivate ? reverb.private(channelName) : reverb.channel(channelName))

  const getOrMakeChannel = (channelName: string, isPrivate?: boolean): Channel =>
    channels[channelName] || makeNewChannel(channelName, isPrivate)

  const listen = (
    channelName: string,
    eventName: string,
    callback: ListenCallback,
    isPrivate?: boolean
  ): Channel => getOrMakeChannel(channelName, isPrivate).listen(eventName, callback)

  const close = (channelName: string, eventName?: string): void => {
    if (channelName && eventName) closeEvent(channelName, eventName)
    else if (channelName) closeChannel(channelName)
    else throw new Error('cannot close unnamed event or channel isteners')
  }

  const closeChannel = (channelName: string) => {
    reverb.leaveChannel(channelName)
    delete channels[channelName]
  }

  const closeEvent = (channelName: string, eventName: string) => {
    channels[channelName].stopListening(eventName)
  }

  return { channels, close, listen, reverb }
}
