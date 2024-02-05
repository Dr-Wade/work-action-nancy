import { collection, doc, getFirestore, updateDoc } from 'firebase/firestore'
import { defineStore } from "pinia"
import { computed } from "vue"
import { useCollection } from "vuefire"

export interface Status {
    buk: string
    samvirk: string
    camps: string
    lydia: string
    lydiaTemp: string
    numberOfU18: number
    numberOfBUK: number
    numberOfSamvirk: number
}

export const useStatuses = defineStore('statuses', () => {

    const ref = computed(() => collection(getFirestore(), 'statuses'))
    const list = useCollection<Status>(ref)

    const setStatus = (team: string, status: any) => updateDoc(doc(ref.value, team),  status)
    const save = async () => await Promise.all(list.value.map((t) => updateDoc(doc(ref.value, t.id), { ...t })))
    return {
        ref,
       list,
       setStatus,
       save
    }
})