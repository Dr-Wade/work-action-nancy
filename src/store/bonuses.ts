import { useCollection } from "vuefire"
import { collection, deleteDoc, doc, getFirestore, addDoc, setDoc, query, orderBy, Timestamp, serverTimestamp, where } from 'firebase/firestore'
import { computed } from "vue"
import { defineStore } from "pinia"
import type { Team } from "@/composables/useTeams"
import { useConfig } from "./config"

export interface Bonus {
    id?: string
    team: Team
    points: string
    description: string
    granted_at?: Timestamp
    round: number
}

export const useBonuses = defineStore('bonuses', () => {
    const config = useConfig()
    const ref = computed(() => collection(getFirestore(), 'bonuses'))
    const bonusQuery = computed(() => query(ref.value, where('round', '==', config.round), orderBy('granted_at', 'desc')))
    const list = useCollection<Bonus>(bonusQuery)

    const add = (bonus: Bonus) => addDoc(ref.value, { ...bonus, granted_at: serverTimestamp() })
    const update = (bonus: Bonus) => setDoc(doc(ref.value, bonus.id), bonus)
    const remove = (id: string) => deleteDoc(doc(ref.value, id))

    return {
        ref,
        list,
        add,
        update,
        remove
    }
})