<template>
    <div class="w-screen h-screen bg-cover !bg-black">
        <div class="mx-auto py-16 h-full max-w-4xl grid grid-cols-3 gap-x-8">
            <img class="col-span-full mx-auto w-40 h-40 z-10" :src="'/img/camps.png'">
            <div v-for="team in statuses.list.filter((t) => t.id != 'blue')" :key="team.id" class="z-10 text-gray-200 flex flex-col items-center gap-y-1.5 transition-all duration-[1500ms] mt-auto">
                <div class="w-full shadow-lg rounded transition-all duration-[1500ms] border-2 shrink-0 text-3xl flex flex-col justify-center font-bold text-center"
                    :class="[`bg-${team.id}-500`, `shadow-${team.id}-600`, `border-${team.id}-400`]"
                    :style="{ height: height(pointsFromRegistrations()[team.id]) + 'px' }">
                    {{ pointsFromRegistrations()[team.id] }}
                    <div class="flex rounded-lg justify-center items-center mt-1 overflow-hidden">
                        <img class="h-10 w-10 mr-1" src="/img/hammer.png">
                    </div>
                </div>
                <span class="flex justify-center gap-x-4 items-center font-bold mt-2 text-5xl drop-shadow-md shadow-white">{{ pointsFromRegistrations()[team.id] }}%</span>
                <img class="w-32 h-32" :src="'/img/'+ team.id + '.svg'">
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
const { pointsFromRegistrations } = usePoints()
const height = (points: number) => points * 15
</script>
