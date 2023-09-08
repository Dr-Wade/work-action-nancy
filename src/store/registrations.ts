import { useCollection } from "vuefire"
import { collection, deleteDoc, doc, getFirestore, setDoc } from 'firebase/firestore'
import { computed } from "vue"
import { defineStore } from "pinia"
import type { Activity } from "./activities"
import type { Member } from "./members"

export interface Registration {
    member: Member
    activity: Activity
}

export const useRegistrations = defineStore('registrations', () => {
    const ref = computed(() => collection(getFirestore(), 'registrations'))
    const list = useCollection<Registration>(ref)

    const set = (registration: Registration) => {
        let id = registration.activity.id + '-' + registration.member.personID
        return setDoc(doc(ref.value, id), registration)
    }
    const remove = (id: string) => deleteDoc(doc(ref.value, id))
    return {
        ref,
        list,
        set,
        remove
    }
})