import { computed, ref, type ComputedRef } from "vue"

export const usePagination = (items: ComputedRef<any[]>, PAGING_SIZE: number = 50) => {
    const currentPage = ref(1)
    const totalRows = computed(() => items.value.length)
    const firstResultNumber = computed(() => PAGING_SIZE * (currentPage.value - 1) + 1)
    const lastResultNumber = computed(() => Math.min(totalRows.value, PAGING_SIZE * currentPage.value))
    const totalPages = computed(() => Math.ceil(totalRows.value / PAGING_SIZE))

    const pagedItems = computed(() => {
        let startIndex = (currentPage.value - 1) * PAGING_SIZE
        return items.value.slice(startIndex, startIndex + PAGING_SIZE)
    })

    const currentPages = computed(() => {
        let start = Math.max(1, currentPage.value - 2)
        let end = Math.min(totalPages.value, currentPage.value + 2)
        return Array.from(Array(end - start + 1).keys()).map((key) => key + start)
    })

    const firstPages = computed(() => {
        if (currentPages.value.length == 0) return []
        let limit = Math.min(currentPages.value[0] - 1, 3)
        return Array.from(Array(limit).keys()).map((key) => key + 1)
    })

    const lastPages = computed(() => {
        if (currentPages.value.length == 0) return []
        let limit = Math.max(currentPages.value[currentPages.value.length - 1], totalPages.value - 3)
        return Array.from(Array(totalPages.value - limit).keys()).map((key) => key + limit + 1)
    })

    const handlePrevious = () => currentPage.value = Math.max(1, currentPage.value - 1)
    const handleNext = () => currentPage.value = Math.min(totalPages.value, currentPage.value + 1)

    return {
        PAGING_SIZE,
        currentPage,
        firstResultNumber,
        lastResultNumber,
        currentPages,
        firstPages,
        lastPages,
        totalPages,
        handlePrevious,
        handleNext,
        pagedItems
    }

}