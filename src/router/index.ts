import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/overlay/camps', name: 'camps', component: () => import('../views/CampsOnly.vue') },
    { path: '/overlay/lydia', name: 'lydia', component: () => import('../views/Lydia.vue') },
    { path: '/overlay/overview', name: 'overlay', component: () => import('../views/Overlay.vue') },
    { path: '/overlay/youth', name: 'youth', component: () => import('../views/YouthOnly.vue') },
    { path: '/overlay/zero', name: 'zero', component: () => import('../views/Zero.vue')},
    { path: '/overlay/team/:team', name: 'team', component: () => import('../views/TeamOverlay.vue') },
    { path: '/', component: Layout, children: [
      { path: '/', name: 'home', component: () => import('../views/Home.vue') },
      { path: '/teams', name: 'teams', component: () => import('../views/Teams.vue') },
      { path: '/activities', name: 'activities', component: () => import('../views/Activities.vue') },
      { path: '/registrations', name: 'registrations', component: () => import('../views/Registrations.vue') },
      { path: '/bonuses', name: 'bonuses', component: () => import('../views/Bonuses.vue') },
      { path: '/overlays', name: 'overlays', component: () => import ('../views/Overlays.vue') }
    ]}
  ]
})

export default router
