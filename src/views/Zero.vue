<template>
    <div class="w-screen h-screen bg-cover" :style="{ background: 'url(/img/overlay-bg.jpg)' }">
        <div class="absolute z-0 inset-0 bg-black/70"></div>
        <div v-if="loaded" class="mx-auto py-12 h-full max-w-4xl grid grid-cols-4 gap-x-8">
            <img class="col-span-full mx-auto h-40 z-10" :src="'/img/logo.svg'">
            <div v-for="team in names" :key="team" class="z-10 text-gray-200 flex flex-col items-center gap-y-1.5 transition-all duration-[1500ms] mt-auto">
                <div v-for="property in properties" class="w-full shadow-lg rounded transition-all duration-[1500ms] border-2 shrink-0 text-3xl flex flex-col justify-center font-bold text-center"
                    :class="[`bg-${team}-500`, `shadow-${team}-600`, `border-${team}-400`]"
                    :style="{ height: height(team, property) + 'px' }">
                    {{ pointsFrom(team, property) }}%
                    <div class="flex rounded-lg justify-center items-center mt-1 overflow-hidden">
                        <img v-if="property == 'buk'" class="h-10 w-10 mr-1" src="/img/buk.png">
                        <img v-else-if="property == 'samvirk'" class="h-10 w-10"  src="/img/samvirk.png" style="filter: brightness(0) invert(1);"/>
                    </div>
                </div>
                <img class="w-32 h-32" :src="'/img/'+ team + '.svg'">
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useConfig } from '@/store/config'
import { ref, computed } from 'vue'
import { useTeams, type Team } from '@/composables/useTeams';

const properties = ['buk', 'samvirk'] as const
type Property = typeof properties[number]

const { names } = useTeams()
const config = useConfig()

const numberOfBUK = {
    blue: 27,
    green: 7,
    orange: 13,
    red: 10
}

const numberOfZeroBUK = {
    blue: 11,
    green: 3,
    orange:5,
    red:5
}

const numberOfSamvirk = {
    blue: 23,
    green: 7,
    orange: 6,
    red: 6
}

const numberOfZeroSamvirk = {
    blue: 12,
    green: 4,
    orange:2,
    red:5
}

const BASE_HEIGHT = computed(() => config.data?.campsHeight || 500)

const pointsFrom = (team: Team, property: Property) => property == 'buk'
    ? Math.round(100 * (numberOfZeroBUK[team]  / numberOfBUK[team]))
    : Math.round(100 * (numberOfZeroSamvirk[team]  / numberOfSamvirk[team]))

const height = (team: Team, property: Property) => (pointsFrom(team, property) * BASE_HEIGHT.value / 100)
const loaded = ref(false)
setTimeout(() => loaded.value = true, 1000)
</script>
<style>
.list-move {
  transition: all 1.5s ease;
}
</style>