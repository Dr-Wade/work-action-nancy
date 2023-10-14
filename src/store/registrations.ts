import { useCollection } from "vuefire"
import { collection, deleteDoc, doc, getFirestore, orderBy, query, setDoc, where } from 'firebase/firestore'
import { computed, watchEffect } from "vue"
import { defineStore } from "pinia"
import RegistrationConverter from "@/converters/registration"
import type { Activity } from "./activities"
import type { Member } from "./members"
import { useImports, type Import } from "./imports"

export interface Registration {
    id: string
    member: Member
    activity: Activity
    import?: Import
}

export const useRegistrations = defineStore('registrations', () => {
    const imports = useImports()
    const ref = computed(() => collection(getFirestore(), 'registrations').withConverter(RegistrationConverter))

    const registrationsQuery = computed(() =>  imports.list.length > 0 && query(ref.value, where('import', 'in', imports.list.map((i) => doc(imports.ref!, i.id)))) || null)
    const list = useCollection<Registration>(registrationsQuery)
    
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