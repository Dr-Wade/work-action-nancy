import { useCollection } from 'vuefire'
import { FieldValue, Timestamp, addDoc, collection, getFirestore, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { computed } from "vue"
import { defineStore } from "pinia"

export type ImportType = 'activities' | 'registrations'
export interface Import {
    id?: string
    type: ImportType
    imported_at: Timestamp
}

export const useImports = defineStore('imports', () => {
    const ref = computed(() => collection(getFirestore(), 'imports'))
    const importQuery = computed(() => query(ref.value, orderBy('imported_at', 'desc')))
    const list = useCollection<Import>(importQuery)

    const add = (newImport: Partial<Import>) => addDoc(ref.value, {
        imported_at: serverTimestamp(),
        type: newImport.type
    })

    const registrations = computed(() => list.value.filter((i) => i.type == 'registrations'))
    
    const lastActivityImport = computed(() => list.value.find((i) => i.type == 'activities'))
    const lastRegistrationImport = computed(() => list.value.find((i) => i.type == 'registrations'))

    return {
        ref,
        list,
        add,
        lastActivityImport,
        lastRegistrationImport,
        registrations
    }
})