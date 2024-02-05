import { useAuth } from "@vueuse/firebase"
import { getAuth } from "firebase/auth"
import { computed } from "vue"

export const useServiceAccount = () => {
    const auth = getAuth()
    const { user } = useAuth(auth)

    const teamLeaderEmail = 'chef@work.com'
    const serviceAccountEmail = 'nancy@work.com'
    const isServiceAccount = computed(() => user.value?.email == serviceAccountEmail)
    
    return {
        teamLeaderEmail,
        isServiceAccount,
        serviceAccountEmail
    }
}