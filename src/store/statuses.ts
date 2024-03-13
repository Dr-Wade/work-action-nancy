import type { Team } from '@/composables/useTeams'
import { collection, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { defineStore } from "pinia"
import { computed } from "vue"
import { useCollection } from "vuefire" 
import { useConfig } from './config'
export interface Status {
    id: Team
    buk: string
    samvirk: string
    camps: string
    lydia: string
    lydiaTemp: string
}

export const useStatuses = defineStore('statuses', () => {

    const config = useConfig()
    const ref = computed(() => config.round && collection(getFirestore(), 'rounds', config.round.toString(), 'teams') || null)
    const list = useCollection<Status>(ref)

    const setStatus = (team: string, status: any) => updateDoc(doc(ref.value!, team),  status)
    const save = async () => await Promise.all(list.value.map((t) => updateDoc(doc(ref.value!, t.id), { ...t })))

    return {
        ref,
       list,
       setStatus,
       save
    }
})