import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { defineStore } from "pinia"
import { computed } from "vue"
import { useDocument } from "vuefire"
import { useImports, type Import } from './imports'

export interface Overlay {
    import: Import
}

export const useOverlay = defineStore('overlay', () => {
    const imports = useImports()

    const ref = computed(() => doc(getFirestore(), 'config', 'overlay'))
    const data = useDocument<Overlay>(ref)

    const set = (data: Overlay) => setDoc(ref.value, { ...data, import: doc(imports.ref, data.import.id) })

    return {
        ref,
        data,
        set
    }
})