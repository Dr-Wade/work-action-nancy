import { useCollection } from "vuefire"
import { collection, deleteDoc, doc, getFirestore, addDoc, setDoc } from 'firebase/firestore'
import { computed } from "vue"
import { defineStore } from "pinia"
import type { Team } from "@/composables/teams"

export interface Bonus {
    id?: string
    team: Team
    hammer: number
    description: string
}

export const useBonuses = defineStore('bonuses', () => {
    const ref = computed(() => collection(getFirestore(), 'bonuses'))
    const list = useCollection<Bonus>(ref)

    const add = (bonus: Bonus) => addDoc(ref.value, bonus)
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