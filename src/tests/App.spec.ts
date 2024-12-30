import { describe, it, expect, vi, beforeAll } from 'vitest'
import App from '@/App.vue'
import { getDefaultMountingOptions } from './helpers/testing'
import { shallowMount } from '@vue/test-utils'

describe('App', () => {
  beforeAll(() => {
    vi.mock('@/composables/useTitle', () => ({ useTitle: vi.fn() }))
    vi.mock('vue-router', () => ({ useRoute: vi.fn(), useRouter: vi.fn() }))
  })

  it('renders properly', () => {
    const options: Record<any, any> = getDefaultMountingOptions()
    const w = shallowMount(App, options)
    expect(w.html()).toContain('appContainer')
  })
})
