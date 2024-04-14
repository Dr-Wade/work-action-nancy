<template>
    <div class="w-screen h-screen bg-cover !bg-black">
        <div class="mx-auto py-16 h-full max-w-4xl grid grid-cols-3 gap-x-8">
            <img class="col-span-full mx-auto w-40 h-40 z-10" :src="'/img/camps.png'">
            <div v-for="team in statuses.list.filter((t) => t.id != 'blue')" :key="team.id" class="text-gray-200 flex flex-col items-center gap-y-2 transition-all duration-[1500ms] mt-auto">
                <div class="relative w-full rounded transition-all duration-[1500ms] shrink-0 bg-gray-700 bg-opacity-40" :style="{ height: BASE_HEIGHT + 'px' }">
                    <div class="absolute bottom-0 w-full shadow-lg rounded transition-all duration-[1500ms] shrink-0"
                        :class="[`bg-${team.id}-500`, `shadow-${team.id}-600`, `border-${team.id}-400`]"
                        :style="{ height: height(pointsFromRegistrations()[team.id]) + 'px' }">
                        <div class="absolute inset-x-0 -top-12 text-center text-3xl font-bold">
                            {{ marteaux()[team.id] }}
                            <img class="w-10 h-10 inline -rotate-45" src="/img/hammer.png">
                        </div>
                    </div>
                </div>
                <img class="mt-5 w-24 h-24" :src="'/img/'+ team.id + '.svg'">
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useStatuses } from '@/store/statuses'
import { useConfig } from '@/store/config'
import { computed } from 'vue'
import { usePoints } from '@/composables/usePoints';

const statuses = useStatuses()
const config = useConfig()
const BASE_HEIGHT = computed(() => config.data?.campsHeight || 500)
const { marteaux, pointsFromRegistrations } = usePoints()
const height = (points: number) => points * BASE_HEIGHT.value /100
</script>
