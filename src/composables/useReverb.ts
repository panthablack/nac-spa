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
  listen: (channelName: string, eventName: string, callback: ListenCallback) => Channel
  reverb: Echo<'reverb'>
}

export const useReverb = (config?: ReverbConfig): UseReverbInterface => {
  const { broadcaster, key, wsHost, wsPort, wssPort, forceTLS, enabledTransports } = config || {}

  const reverb = new Echo({
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

  const makeNewChannel = (channelName: string): Channel =>
    (channels[channelName] = reverb.channel(channelName))

  const getOrMakeChannel = (channelName: string): Channel =>
    channels[channelName] || makeNewChannel(channelName)

  const listen = (channelName: string, eventName: string, callback: ListenCallback): Channel =>
    getOrMakeChannel(channelName).listen(eventName, callback)

  // TESTING // ************************************************************************************
  // channels.gibbon = reverb.channel('schema-requests')
  // channels.gibbon.listen('ApiSchemaRequested', (e: string) => console.log('ApiSchemaRequested', e))
  // channels.gibbon.listen('MessageSent', (e: string) => console.log('New Message', e))
  // TESTING // ************************************************************************************

  return { channels, listen, reverb }
}
