<template>
    <div class="w-screen h-screen bg-cover" :style="{ background: 'url(/img/overlay-bg.jpg)' }">
        <div class="absolute z-0 inset-0 bg-black/70"></div>
        <div v-if="loaded" class="mx-auto py-12 h-full max-w-4xl grid grid-cols-4 gap-x-8">
            <img class="col-span-full mx-auto h-40 z-10" :src="'/img/logo.svg'">
            <div v-for="team in names" :key="team" class="z-10 text-gray-200 flex flex-col items-center gap-y-1.5 transition-all duration-[1500ms] mt-auto">
                <div v-for="property in properties.filter((p) => p != 'bonus' || pointsFrom(team, p) > 0)" class="w-full shadow-lg rounded transition-all duration-[1500ms] border-2 shrink-0 text-3xl flex flex-col justify-center font-bold text-center"
                    :class="[`bg-${team}-500`, `shadow-${team}-600`, `border-${team}-400`]"
                    :style="{ height: height(team, property) + 'px' }">
                    <template v-if="property != 'bonus'">{{ pointsFrom(team, property) }}%</template>
                    <div class="flex rounded-lg justify-center items-center mt-1 overflow-hidden">
                        <template v-if="property == 'youth'">
                            <img class="h-10 w-10 mr-1" src="/img/buk.png">
                            <span class="text-lg">+</span>
                            <img class="h-10 w-10"  src="/img/samvirk.png" style="filter: brightness(0) invert(1);">
                        </template>
                        <img v-else-if="property == 'camps'" class="h-10 w-10" src="/img/camps.png" style="filter: brightness(0) invert(1);" />
                    </div>
                </div>
                <span class="flex justify-center gap-x-4 items-center font-bold mt-2 text-5xl drop-shadow-md shadow-white">{{ pointsTotal()[team] }}%</span>
                <img class="w-32 h-32" :src="'/img/'+ team + '.svg'">
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useTeams, type Team } from '@/composables/useTeams'
import { usePoints } from '@/composables/usePoints'
import { useConfig } from '@/store/config'
import { ref, computed } from 'vue'

const properties = ['bonus', 'youth', 'camps', ] as const
type Property = typeof properties[number]

const config = useConfig()
const { names } = useTeams()
const { pointsTotal, pointsFromYouth, pointsFromCamps, pointsFromBonuses } = usePoints()

const BASE_HEIGHT = computed(() => config.data?.totalHeight || 200)
const pointsFrom = (team: Team, property: Property) => property == 'youth' ? pointsFromYouth()[team] : property == 'camps' ? pointsFromCamps()[team] : pointsFromBonuses()[team]
const height = (team: Team, property: Property) => (pointsFrom(team, property) * BASE_HEIGHT.value / 100)
const loaded = ref(false)
setTimeout(() => loaded.value = true, 1000)
</script>
<style>
.list-move {
  transition: all 1.5s ease;
}
</style>