import { useAuth } from "@vueuse/firebase"
import { getAuth } from "firebase/auth"
import { computed } from "vue"

export const useServiceAccount = () => {
    const auth = getAuth()
    const { user } = useAuth(auth)

    const serviceAccountEmail = 'nancy@work.com'
    const isServiceAccount = computed(() => user.value?.email == serviceAccountEmail)
    
    return {
        isServiceAccount,
        serviceAccountEmail
    }
}