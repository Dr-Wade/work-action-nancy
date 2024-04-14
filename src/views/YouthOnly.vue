<template>
    <div class="w-screen h-screen bg-cover" :style="{ background: 'url(/img/overlay-bg.jpg)' }">
        <div class="absolute z-0 inset-0 bg-black/70"></div>
        <div v-if="loaded" class="mx-auto py-12 h-full max-w-4xl grid grid-cols-4 gap-x-8">
            <img class="col-span-full mx-auto h-40 z-10" :src="'/img/logo.svg'">
            <div v-for="team in statuses.list" :key="team.id" class="z-10 text-gray-200 flex flex-col items-center gap-y-1.5 transition-all duration-[1500ms] mt-auto">
                <div class="w-full shadow-lg rounded transition-all duration-[1500ms] border-2 shrink-0 text-3xl flex flex-col justify-center font-bold text-center"
                    :class="[`bg-${team.id}-500`, `shadow-${team.id}-600`, `border-${team.id}-400`]"
                    :style="{ height: height(Number(team.buk)) + 'px' }">
                    {{ team.buk }}%
                    <div class="flex rounded-lg justify-center items-center mt-1 overflow-hidden">
                        <img class="h-10 w-10 mr-1" src="/img/buk.png">
                    </div>
                </div>
                <span class="flex justify-center gap-x-4 items-center font-bold mt-2 text-5xl drop-shadow-md shadow-white">{{ team.buk }}%</span>
                <img class="w-32 h-32" :src="'/img/'+ team.id + '.svg'">
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useStatuses } from '@/store/statuses'
import { useConfig } from '@/store/config'
import { ref, computed } from 'vue'

const config = useConfig()
const statuses = useStatuses()

const BASE_HEIGHT = computed(() => config.data?.campsHeight || 200)
const height = (status: number) => (status * BASE_HEIGHT.value / 100)
const loaded = ref(false)
setTimeout(() => loaded.value = true, 1000)
</script>
<style>
.list-move {
  transition: all 1.5s ease;
}
</style>