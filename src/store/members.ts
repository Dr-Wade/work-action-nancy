import { useCollection } from "vuefire"
import { collection, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { computed } from "vue"
import { defineStore } from "pinia"
import type { Team } from "@/composables/useTeams"

export interface Member {
    id?: string
    personID: string
    name: string
    age: number
    gender: 'Male' | 'Female'
    team?: Team
}

export const useMembers = defineStore('members', () => {
    const ref = computed(() => collection(getFirestore(), 'members'))
    const list = useCollection<Member>(ref)
    const fromId = (id: string) => list.value.find((a) => a.id == id)
    const setTeam = (personID: string, team: Team) => updateDoc(doc(ref.value, personID), { team })
    return {
        ref,
        list,
        setTeam,
        fromId
    }
})