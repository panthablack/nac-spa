import { makeNewReverb, type ListenCallback, type ReverbConfig } from '@/utilities/reverb'
import Echo, { Channel, type PresenceChannel } from 'laravel-echo'
import { defineStore } from 'pinia'
import { computed, reactive, type ComputedRef } from 'vue'

export const useReverb = defineStore('reverb', () => {
  // State
  // const reverb: Reactive<Echo<'reverb'>> = reactive(makeNewReverb())
  const reverb: Echo<'reverb'> = makeNewReverb()

  const channels: Record<string, Channel> = reactive({})

  const presenceChannels: Record<string, PresenceChannel> = reactive({})

  // Getters
  const socketId: ComputedRef<string> = computed(() => reverb.socketId())

  // Methods
  const init = (config?: ReverbConfig): void => {
    // TODO: test this as might not work anymore
    Object.assign(reverb, makeNewReverb(config))
  }

  const getOrMakeChannel = (channelName: string, isPrivate?: boolean): Channel =>
    channels[channelName] || makeNewChannel(channelName, isPrivate)

  const getOrMakePresenceChannel = (channelName: string): PresenceChannel =>
    presenceChannels[channelName] || makeNewPresenceChannel(channelName)

  const makeNewChannel = (channelName: string, isPrivate?: boolean): Channel => {
    channels[channelName] = isPrivate ? reverb.private(channelName) : reverb.channel(channelName)
    return channels[channelName]
  }

  const makeNewPresenceChannel = (channelName: string): PresenceChannel => {
    presenceChannels[channelName] = reverb.join(channelName)
    return presenceChannels[channelName]
  }

  const listen = (
    channelName: string,
    eventName: string,
    callback: ListenCallback,
    isPrivate?: boolean
  ): Channel => getOrMakeChannel(channelName, isPrivate).listen(eventName, callback)

  const join = (channelName: string): PresenceChannel => getOrMakePresenceChannel(channelName)

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

  // Interface
  return { channels, close, init, join, listen, reverb, socketId }
})
