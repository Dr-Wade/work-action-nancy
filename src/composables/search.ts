import { computed, ref, type ComputedRef, type Ref } from "vue"

type Items = Ref<any[]> | ComputedRef<any[]>
export const useSearch = (items: Items, fields: string[]) => {
    const searchQuery = ref()
    const splitQuery = computed(() => searchQuery.value && searchQuery.value.split(' '))

    const resolve = (obj: Object, path: string): any => {
        return path ? path.split('.').reduce((o: any, p) => o ? o[p] : null, obj) : obj
    }

    const filteredItems = computed(() => {
        return items.value.filter((item) => !splitQuery.value || splitQuery.value.every((query: string) => {
            return fields.some((field) => resolve(item, field) && resolve(item, field).toString().toLowerCase().includes(query.toLowerCase()))
        }))
    })

    return { 
        searchQuery,
        filteredItems
    }
}