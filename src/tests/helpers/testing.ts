import { createTestingPinia } from '@pinia/testing'
import { shallowMount } from '@vue/test-utils'
import { vi } from 'vitest'

export const getMockRoute = () => ({ meta: {} })

export const getMockRouter = () => ({ push: vi.fn() })

export const getMocks = () => ({
  $route: getMockRoute(),
  $router: getMockRouter(),
})

export const getDefaultMountingOptions = () => ({
  global: {
    plugins: [createTestingPinia({ createSpy: () => () => {} })],
    mocks: getMocks(),
  },
})

export const shallowMountComponent = (c: any, options?: Record<any, any>) =>
  shallowMount(c, { ...getDefaultMountingOptions(), ...(options || {}) })
