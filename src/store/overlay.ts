import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import { defineStore } from "pinia"
import { computed, watch } from "vue"
import { useDocument } from "vuefire"
import { useConfig } from './config'

export interface Overlay {
    index: number
    scaleIndex: number
}

export const useOverlay = defineStore('overlay', () => {
    const ref = computed(() => doc(getFirestore(), 'config', 'overlay'))
    const data = useDocument<Overlay>(ref)

    const update = (data: Partial<Overlay>) => updateDoc(ref.value, data)
    const previous = () => update({ index: data.value ? data.value.index - 1 : 0 })
    const next = () => update({ index: data.value ? data.value.index + 1 : 0 })
    const rescale = () => update({ scaleIndex: data.value ? data.value.index : 0 })

    const config = useConfig()
    watch(() => config.round, () => update({ index: -1, scaleIndex: -1 }))
    return {
        ref,
        data,
        update,
        next,
        previous,
        rescale
    }
})