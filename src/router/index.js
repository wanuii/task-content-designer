import { createRouter, createWebHistory } from 'vue-router'
import EditorPage from '@/views/EditorPage.vue'
import PreviewPage from '@/views/PreviewPage.vue'

const routes = [
  { path: '/', redirect: '/editor' },
  { path: '/editor', component: EditorPage },
  { path: '/preview', component: PreviewPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
