import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import { defineStore } from "pinia"
import { computed } from "vue"
import { useDocument } from "vuefire"

export interface Config {
    round: number
}

export const useConfig = defineStore('config', () => {
    const ref = computed(() => doc(getFirestore(), 'config', 'global'))
    const data = useDocument<Config>(ref)

    const round = computed(() => data.value && data.value.round || 0)
    const setRound = (round: number) => updateDoc(ref.value, { round })
    return {
        ref,
        data,
        round,
        setRound
    }
})