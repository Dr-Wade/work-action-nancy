<template>
	<div class="w-full flex justify-between mb-3">
		<Search v-model="searchQuery" />
	</div>
	<div class="shadow overflow-x-auto border-b border-tiber-500 rounded-lg">
		<table class="min-w-full divide-y divide-tiber-500 table-fixed">
			<thead class="bg-tiber-700">
				<tr class="text-left text-xs font-medium text-white uppercase tracking-wider">
					<slot name="header" />
				</tr>
			</thead>
			<tbody class="bg-tiber-700 divide-y divide-tiber-500" name="flip-list">
				<slot name="new-row" />
				<slot v-for="item in pagedItems" v-bind="{ item }" :key="item.id" name="row" />
			</tbody>
			<tfoot class="bg-tiber-700 border-t border-tiber-500">
				<tr>
					<td colspan="100%">
						<div class="w-full px-4 py-3 sm:px-6 flex items-center justify-between">
							<p class="text-sm text-white">
								<span class="font-medium">{{firstResultNumber}}</span>
								-
								<span class="font-medium">{{lastResultNumber}}</span>
								of
								<span class="font-medium">{{totalRows}}</span>
								results
							</p>
							<nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px pagination" aria-label="Pagination">
								<button type="button" @click="handlePrevious" :class="{ 'opacity-25 cursor-default' : currentPage <= 1 }">&lt;</button>
								<button type="button" @click="currentPage = page" v-for="page in firstPages" :key="page">
									{{page}}
								</button>
								<span v-if="firstPages.length && firstPages[firstPages.length - 1] < currentPages[0] - 1" class="relative inline-flex items-center px-4 py-2 border border-tiber-500 bg-tiber-700 text-sm font-medium text-white"> ... </span>
								<button type="button" @click="currentPage = page" v-for="page in currentPages" :key="page"
									:class="{ 'z-10 !bg-tiber-400': currentPage == page }">
									{{page}}
								</button>
								<span v-if="lastPages.length && lastPages[0] > currentPages[currentPages.length - 1] + 1" class="relative inline-flex items-center px-4 py-2 border border-tiber-500 bg-tiber-700 text-sm font-medium text-white"> ... </span>
								<button type="button" @click="currentPage = page" v-for="page in lastPages" :key="page" class="bg-tiber-700 border-tiber-500 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium">
									{{page}}
								</button>
								<button type="button" @click="handleNext" :class="{ 'opacity-25 cursor-default' : currentPage >= totalPages }">></button>
							</nav>
						</div>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>

</template>
<script setup lang="ts">
import Search from './Search.vue'
import { computed, toRef, watch } from 'vue'
import { useSearch } from '@/composables/search'
import { usePagination } from '@/composables/pagination'
import { useExport } from '@/composables/export'
import { useI18n } from 'vue-i18n'

export interface TableProps {
	items: any[],
    filters: any,
	searchFields: any[],
	allowCreate?: boolean,	
}

const props = withDefaults(defineProps<TableProps>(), { allowCreate: false })

const emit = defineEmits(['create'])
const items = toRef(props, 'items')

const globalFilteredItems = computed(() => items.value.filter((i) => Object.keys(props.filters).every((f) => !props.filters[f] || i[f] == props.filters[f])))

const { d } = useI18n()
const { searchQuery, filteredItems } = useSearch(globalFilteredItems, props.searchFields)
const { currentPage, firstResultNumber, lastResultNumber, currentPages, firstPages, lastPages, handleNext, handlePrevious, totalPages, pagedItems } = usePagination(filteredItems)
const totalRows = computed(() => filteredItems.value.length)

watch(searchQuery, () => currentPage.value = 1)

const getDateForExport = () => d(new Date(), 'long', 'en-GB').replace(', ', '-').replaceAll('/', '-').replaceAll(':', '-')

const getName = () => {
    let name = 'Export-'
    Object.keys(props.filters).forEach((f) => {
        if (props.filters[f]) name += props.filters[f] + '-'
    })
    return name + getDateForExport() + '.xlsx'
}

const summedUpItems = computed(() => filteredItems.value.reduce((acc, c) => {
	let findUser = acc.find((a: any) => a.firstname == c.firstname && a.lastname == c.lastname)
	if (findUser) findUser.amount += c.amount
	else acc.push(c)
	return acc
}, []))

const exportToCsv = () => useExport()(summedUpItems.value, getName())

defineExpose({ exportToCsv })
</script>
<style scoped>
.pagination button {
	@apply relative inline-flex items-center text-sm font-medium bg-tiber-700 text-white px-4 py-2 border border-tiber-500;
}

</style>