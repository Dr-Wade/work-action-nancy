import { useCollection } from 'vuefire'
import { collection, deleteDoc, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import { computed } from "vue"
import { defineStore } from "pinia"

export interface Activity {
    id: string
    name: string
    points: number
}

export const useActivities = defineStore('activities', () => {
    const ref = computed(() => collection(getFirestore(), 'activities'))
    const list = useCollection<Activity>(ref)

    const fromId = (id: string) => list.value.find((a) => a.id == id)
    const set = (activity: Activity) => setDoc(doc(ref.value, activity.id), activity)
    const remove = (activity: Activity) => deleteDoc(doc(ref.value, activity.id))
    return {
        ref,
        list,
        set,
        remove,
        fromId
    }
})