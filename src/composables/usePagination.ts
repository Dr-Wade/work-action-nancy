import { computed, ref, type ComputedRef } from "vue"

export const usePagination = (items: ComputedRef<any[]>, PAGING_SIZE: number = 50) => {
    const currentPage = ref(1)
    const totalRows = computed(() => items.value.length)
    const totalPages = computed(() => Math.ceil(totalRows.value / PAGING_SIZE))

    const pagedItems = computed(() => {
        let startIndex = (currentPage.value - 1) * PAGING_SIZE
        return items.value.slice(startIndex, startIndex + PAGING_SIZE)
    })

    return {
        PAGING_SIZE,
        currentPage,
        totalPages,
        pagedItems
    }

}