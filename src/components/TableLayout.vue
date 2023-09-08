<template>
    <section class="flex flex-col gap-y-3">
        <div class="flex flex-col gap-y-3 lg:flex-row lg:justify-between items-center">
            <h3 v-if="title" class="font-bold">{{ title }}</h3>
            <BccInput
                class="w-full lg:w-96"
                :icon="SearchIcon"
                placeholder="Search"
                v-model="searchQuery"
            />
        </div>
        <div class="rounded-lg bg-neptune-200">
            <BccTable
                :columns="columns"
                :items="pagedItems"
                v-model:sortBy="sortBy"
                v-model:sortDirection="sortDirection">
                <template #item.gender="{ item }">
                    <BccBadge :context="item.gender == 'Male' ? 'info' : 'danger'">{{ item.gender }}</BccBadge>
                </template>
                <template #item.team="{ item }">
                    <BccSelect v-model="item.team">
                        <option disabled value="">Select a team...</option>
                        <option v-for="team in names" :value="team" :key="team">{{team}}</option>
                    </BccSelect>
                </template>
            </BccTable>
            <Pagination class="pagination flex justify-between p-3 bg-neptune-300 items-end" v-model="currentPage" :total-items="filteredItems.length" :perPage="PAGING_SIZE" :layout="'table'" />
        </div>
    </section>
    
</template>
<script setup lang="ts" generic="T">
import { Pagination } from 'flowbite-vue'
import { BccInput, BccTable, BccBadge, BccSelect } from '@bcc-code/design-library-vue'
import { useSearch } from '@/composables/search'
import { SearchIcon } from '@bcc-code/icons-vue'
import { ref, toRef } from 'vue'
import { usePagination } from '@/composables/pagination'
import { useTeams } from '@/composables/teams'

type Column = {
    key: string
    text: string
    sortable?:boolean
}

const props = defineProps<{
    draggable?: boolean
    title?: string
    columns: Column[]
    items: T[]
    searchFields: string[]
    pageSize?: number
}>()

const items = toRef(props, 'items')
const { searchQuery, filteredItems } = useSearch(items, props.searchFields as string[])
const { pagedItems, PAGING_SIZE, currentPage } = usePagination(filteredItems, props.pageSize)
const sortBy = ref()
const sortDirection = ref()

const {names} = useTeams()
</script>
<style>
.bcc-table-header-row {
    @apply !bg-neptune-300;
}
.pagination button {
    @apply !bg-neptune-400;
    @apply !text-gray-800;
    @apply !border-neptune-500;
}
</style>