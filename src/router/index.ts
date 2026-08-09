import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import PhotoViewer from '../components/PhotoViewer.vue'
// @ts-ignore
import PhotoContact from '../components/PhotoContact.vue'

const routes = [
  {
    path: '/',
    name: 'PhotoViewer',
    component: PhotoViewer
  },
  {
    path: '/contact',
    name: 'PhotoContact',
    component: PhotoContact
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router