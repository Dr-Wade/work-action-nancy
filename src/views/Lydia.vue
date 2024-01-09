<template>
    <div class="w-screen h-screen bg-cover !bg-black">
        <div class="mx-auto py-24 h-full max-w-4xl grid grid-cols-4 gap-x-8">
            <img class="col-span-full mx-auto w-40 h-40 z-10" :src="'/img/lydia.webp'">
            <div v-for="team in statuses.list" :key="team.id" class="text-gray-200 flex flex-col items-center gap-y-2 transition-all duration-[1500ms] mt-auto">
                <div class="relative w-full rounded transition-all duration-[1500ms] shrink-0" :style="{ height: BASE_HEIGHT + 'px' }">
                    <div class="absolute bottom-0 w-full shadow-lg rounded transition-all duration-[1500ms] shrink-0"
                        :class="[`bg-${team.id}-500`, `shadow-${team.id}-600`, `border-${team.id}-400`]"
                        :style="{ height: (Number(team.lydia)/5000) * BASE_HEIGHT + 'px' }">
                        <div class="absolute inset-x-0 -top-12 text-center text-3xl font-bold">{{ team.lydia }}€</div>
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

const statuses = useStatuses()
const config = useConfig()
const BASE_HEIGHT = computed(() => config.data?.lydiaHeight || 500)
</script>