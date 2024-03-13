import { useCollection } from 'vuefire'
import { Timestamp, addDoc, collection, getFirestore, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { computed } from "vue"
import { defineStore } from "pinia"
import { useConfig } from './config'

export type ImportType = 'activities' | 'registrations'
export interface Import {
    id?: string
    type: ImportType
    imported_at: Timestamp,
    round: number
}

export const useImports = defineStore('imports', () => {
    const config = useConfig()
    const ref = computed(() => collection(getFirestore(), 'imports'))
    const importQuery = computed(() => query(ref.value, where('round', '==', config.round), orderBy('imported_at', 'desc')))
    const list = useCollection<Import>(importQuery)

    const add = (newImport: Partial<Import>) => addDoc(ref.value, {
        imported_at: serverTimestamp(),
        type: newImport.type,
        round: newImport.round
    })

    const registrations = computed(() => list.value.filter((i) => i.type == 'registrations').toReversed())
    
    const lastActivityImport = computed(() => list.value.find((i) => i.type == 'activities'))
    const lastRegistrationImport = computed(() => list.value.find((i) => i.type == 'registrations'))

    return {
        ref,
        list,
        add,
        lastActivityImport,
        lastRegistrationImport,
        registrations,
    }
})