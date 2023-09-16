<template>
    <div class="w-screen h-screen bg-cover" :style="{ background: 'url(/img/overlay-bg.jpg)' }">
        <div class="absolute z-0 inset-0 bg-black/70"></div>
        <TransitionGroup v-if="loaded" tag="div" name="list" class="z-10 absolute inset-0 flex flex-col justify-center gap-y-24 container mx-auto px-8">
            <div v-for="team in rankedTeams" :key="team"
                class="text-gray-200 flex items-center gap-x-5">         
                <img class="w-24 h-24" :src="'/img/'+ team + '.svg'">
                <div class="shadow-lg p-4 rounded transition-all duration-1000 border-2"
                    :class="[`bg-${team}-500`, `shadow-${team}-600`, `border-${team}-400`]"
                    :style="{ width: width(team) + '%' }"></div>
                <span class="font-bold text-4xl drop-shadow-md shadow-white">{{ pointsPerTeam[team] }}</span>
            </div>
        </TransitionGroup>
    </div>
</template>
<script setup lang="ts">
import { useTeams, type Team } from '@/composables/useTeams'
import { usePoints } from '@/composables/usePoints'
import { computed, ref, watch } from 'vue'

const { names } = useTeams()
const { pointsPerTeam } = usePoints()
const maxPoints = computed(() => names.reduce((acc: number, c) => Math.max(acc, pointsPerTeam.value[c]), 0))
const minPoints = computed(() => names.reduce((acc: number, c) => Math.min(acc, pointsPerTeam.value[c]), Infinity))

const width = (team: Team) => 25 + 50 * (pointsPerTeam.value[team] - minPoints.value)/(maxPoints.value - minPoints.value)

const rankedTeams = computed(() => names.sort((a,b) => pointsPerTeam.value[b] - pointsPerTeam.value[a]))
watch(rankedTeams, () => console.log(rankedTeams.value), { immediate: true })

const loaded = ref(false)
setTimeout(() => loaded.value = true, 1000)
</script>
<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 1.5s ease;
}
</style>