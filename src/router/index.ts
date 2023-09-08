import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/overlay', name: 'overlay', component: () => import('../views/Overlay.vue') },
    { path: '/', component: Layout, children: [
      { path: '/', name: 'home', component: () => import('../views/Home.vue') },
      { path: '/teams', name: 'teams', component: () => import('../views/Teams.vue') },
      { path: '/activities', name: 'activities', component: () => import('../views/Activities.vue') },
      { path: '/registrations', name: 'registrations', component: () => import('../views/Registrations.vue') },
      { path: '/bonuses', name: 'bonuses', component: () => import('../views/Bonuses.vue') }
    ]}
  ]
})

export default router
