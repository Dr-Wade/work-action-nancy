import type { Team } from '@/composables/useTeams'
import { collection, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { defineStore } from "pinia"
import { computed } from "vue"
import { useCollection } from "vuefire" 

export interface TeamConfig {
    id: Team
    numberOfU18: number
    numberOfBUK: number
    numberOfSamvirk: number
}

export const useTeamConfigs = defineStore('teamConfigs', () => {

    const ref = computed(() => collection(getFirestore(), 'config'))
    const list = useCollection<TeamConfig>(ref)

    return {
        ref,
       list
    }
})