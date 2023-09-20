<template>
    <div class="min-h-screen" :class="[isOverlay ? '' : 'bg-neutral-100 text-primary']">
        <Spinner v-if="!loaded" />
        <template v-else>
            <RouterView v-if="isAuthenticated" />
            <Login :open="!isAuthenticated" />
        </template>
    </div>  
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { initializeApp } from 'firebase/app'
import { useRoute } from 'vue-router'
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth"
import { useAuth } from '@vueuse/firebase'
import { useServiceAccount } from './composables/useServiceAccount'

const firebaseConfig = {
    apiKey: "AIzaSyCGtcfg6_y1tNdn_c0p7RYsSjr1TmPV5PI",
    authDomain: "work-action-nancy.firebaseapp.com",
    projectId: "work-action-nancy",
    storageBucket: "work-action-nancy.appspot.com",
    messagingSenderId: "24194568972",
    appId: "1:24194568972:web:4414c34aaa061b078f6f29"
}

initializeApp(firebaseConfig)
const auth = getAuth()
setPersistence(auth, browserLocalPersistence)
const { isAuthenticated } = useAuth(auth)

const route = useRoute()
const isOverlay = computed(() => route.path.startsWith('/overlay'))
const { serviceAccountEmail } = useServiceAccount()

const loaded = ref(false)

onMounted(async () => {
    if (route.query.pass) await signInWithEmailAndPassword(auth, serviceAccountEmail, route.query.pass.toString()).then(() => loaded.value = true)
    else await auth.authStateReady().then(() => loaded.value = true) 
})
</script>