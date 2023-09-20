import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import timeago from 'vue-timeago3'
import ContextMenu from '@imengyu/vue3-context-menu'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import '@/assets/base.css'


const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(timeago)
app.use(ContextMenu)

router.isReady().then(() => {
    app.mount('#app')
})
