import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import { defineStore } from "pinia"
import { computed } from "vue"
import { useDocument } from "vuefire"
import { useImports } from './imports'

export interface Overlay {
    index: number
    scaleIndex: number
}

export const useOverlay = defineStore('overlay', () => {
    const imports = useImports()

    const ref = computed(() => doc(getFirestore(), 'config', 'overlay'))
    const data = useDocument<Overlay>(ref)

    const hasOlder = computed(() => {
        if (!data.value || imports.registrations.length == 0) return false
        return (data.value.index || 0) < (imports.registrations.length - 1)
    })

    const hasNewer = computed(() => {
        if (!data.value || imports.registrations.length == 0) return false
        return data.value.index > 0
    })

    const update = (data: Partial<Overlay>) => updateDoc(ref.value, data)
    const previous = () => update({ index: data.value ? data.value.index + 1 : 0 })
    const next = () => update({ index: data.value ? data.value.index - 1 : 0 })
    const rescale = () => update({ scaleIndex: data.value ? data.value.index : 0 })

    return {
        ref,
        data,
        update,
        hasOlder,
        hasNewer,
        next,
        previous,
        rescale
    }
})