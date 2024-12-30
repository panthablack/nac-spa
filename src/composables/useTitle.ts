import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useTitle = () => {
  const route = useRoute()
  const title = computed(() => route.meta.title || import.meta.env.VITE_APP_NAME)
  watch(title, (t: string) => (document.title = t))
  return { title }
}
