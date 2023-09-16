import { useCollection } from "vuefire"
import { addDoc, collection, deleteDoc, doc, getFirestore, setDoc } from 'firebase/firestore'
import { computed } from "vue"
import { defineStore } from "pinia"
import RegistrationConverter from "@/converters/registration"
import type { Activity } from "./activities"
import type { Member } from "./members"

export interface Registration {
    id: string
    member: Member
    activity: Activity
}

export const useRegistrations = defineStore('registrations', () => {
    const ref = computed(() => collection(getFirestore(), 'registrations').withConverter(RegistrationConverter))
    const list = useCollection<Registration>(ref)

    
    const set = (registration: Registration) => setDoc(doc(ref.value, registration.id), registration, { merge: true })
    //const set = (registration: Registration) => addDoc(ref.value, registration)
    const remove = (id: string) => deleteDoc(doc(ref.value, id))
    return {
        ref,
        list,
        set,
        remove
    }
})