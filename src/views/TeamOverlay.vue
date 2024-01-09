<template>
    <div class="w-screen h-screen bg-cover" :style="{ background: 'url(/img/overlay-bg.jpg)' }">
        <div class="absolute z-0 inset-0 bg-black/70"></div>
        <div class="mx-auto py-24 h-full max-w-4xl grid grid-cols-4 gap-x-8">
            <img class="col-span-full mx-auto w-40 h-40 z-10" :src="'/img/' + team + '.svg'">
            <div v-for="property in properties" :key="property" class="text-gray-200 flex flex-col items-center gap-y-5 transition-all duration-[1500ms] mt-auto">
                <div class="relative w-full shadow-lg rounded transition-all duration-[1500ms] shrink-0 bg-gray-700 bg-opacity-50" style="height: 400px;">
                    <div class="absolute bottom-0 w-full shadow-lg rounded transition-all duration-[1500ms] shrink-0"
                    :class="[`bg-${team}-500`, `shadow-${team}-600`, `border-${team}-400`]"
                    :style="{ height: height(property) + 'px' }">
                    <div class="absolute inset-x-0 -top-12 text-center text-3xl font-bold">{{ pointsFrom(property) }}%</div>
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
const statuses = useStatuses()
const status = computed(() => statuses.list.find((d) => d.id == team.value))

const { pointsFromRegistrations } = usePoints()

const pointsFrom = (property: Property) => property == 'u18' ? pointsFromRegistrations()[team.value] : Number(status.value![property])
const height = (property: Property) =>  pointsFrom(property) * 400 / 100
</script>