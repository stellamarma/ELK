import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import PhotoViewer from '../components/PhotoViewer.vue'
// @ts-ignore
import PhotoContact from '../components/PhotoContact.vue'
// @ts-ignore
import CommentSection from '../components/CommentSection.vue'
// @ts-ignore
import VideoSection from '../components/VideoSection.vue'

const routes = [
  {
    path: '/',
    name: 'PhotoViewer',
    component: PhotoViewer
  },
  {
    path: '/video',
    name: 'VideoSection',
    component: VideoSection
  },
  {
    path: '/contact',
    name: 'PhotoContact',
    component: PhotoContact
  },
  {
    path: '/comments',
    name: 'comments',
    component: CommentSection
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router