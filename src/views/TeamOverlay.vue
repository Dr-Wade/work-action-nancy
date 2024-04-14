<template>
    <div class="w-screen h-screen bg-cover px-4" :style="{ background: 'url(/img/overlay-bg.jpg)' }">
        <div class="absolute z-0 inset-0 bg-black/70"></div>
        <div class="mx-auto py-24 h-full grid gap-x-2 lg:gap-x-8" :class="actualProperties.length == 4 ? 'max-w-4xl grid-cols-4' : 'max-w-2xl grid-cols-3'">
            <img class="col-span-full mx-auto w-40 h-40 z-10" :src="'/img/' + team + '.svg'">
            <div v-for="property in actualProperties" :key="property" class="text-gray-200 flex flex-col items-center gap-y-5 transition-all duration-[1500ms] mt-auto">
                <div class="relative w-full shadow-lg rounded transition-all duration-[1500ms] shrink-0 bg-gray-700 bg-opacity-50" style="height: 400px;">
                    <div class="absolute bottom-0 w-full shadow-lg rounded transition-all duration-[1500ms] shrink-0"
                    :class="[`bg-${team}-500`, `shadow-${team}-600`, `border-${team}-400`]"
                    :style="{ height: height(property) + 'px' }">
                    <div class="absolute inset-x-0 -top-12 text-center text-lg lg:text-3xl font-bold">{{ pointsFrom(property) }} {{ symbol(property) }}</div>
                </div>
                </div>
                <img class="w-24 h-24 z-10" :src="'/img/'+ property + '.png'">
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { type Team } from '@/composables/useTeams'
import { usePoints } from '@/composables/usePoints'
import { computed } from 'vue'
import { useRouteParams } from '@vueuse/router'
import { useStatuses } from '@/store/statuses'

const properties = ['buk', 'samvirk', 'camps', 'u18'] as const
type Property = typeof properties[number]

const team = useRouteParams<Team>('team')
const actualProperties = computed(() => team.value == 'blue' ? properties.slice(0,3) : properties)
const statuses = useStatuses()
const status = computed(() => statuses.list.find((d) => d.id == team.value))

const { pointsFromRegistrations, pointsFromCamps } = usePoints()

const pointsFrom = (property: Property) => {
    switch(property) {
        case 'u18':
            return pointsFromRegistrations()[team.value]
        case 'camps':
            return Math.round((status.value ? Number(status.value.camps) + Number(status.value.lydia) : 0) * 100) / 100
        default:
            return Number(status.value && status.value[property] || 0)
    }
}
const height = (property: Property) =>  (property == 'camps' ? (100 * pointsFrom(property) / 5000) : pointsFrom(property)) * 400 / 100
const symbol = (property: Property) => property == 'camps' ? '€' : '%'
</script>