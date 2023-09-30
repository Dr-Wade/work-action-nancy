<template>
    <div class="w-screen h-screen bg-cover" :style="{ background: 'url(/img/overlay-bg.jpg)' }">
        <div class="absolute z-0 inset-0 bg-black/70"></div>
        <template v-if="loaded">
            <div v-for="team in names" :key="team"
                class="absolute left-12 right-0 text-gray-200 flex items-center gap-x-5 transition-all duration-[1500ms]"
                :style="{ top: y(team) + '%' }">         
                <img class="w-24 h-24" :src="'/img/'+ team + '.svg'">
                <div class="shadow-lg p-4 rounded transition-all duration-[1500ms] border-2 shrink-0"
                    :class="[`bg-${team}-500`, `shadow-${team}-600`, `border-${team}-400`]"
                    :style="{ width: width(team) + '%' }"></div>
                <span class="font-bold text-4xl drop-shadow-md shadow-white">{{ points[team] }}</span>
                <img class="w-16 -rotate-45" src="/img/hammer.png">
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import { useTeams, type Team } from '@/composables/useTeams'
import { usePoints } from '@/composables/usePoints'
import { computed, ref } from 'vue'
import LogScale from 'log-scale'
import { useOverlay } from '@/store/overlay'
import { useImports } from '@/store/imports'

const { names } = useTeams()
const { pointsTotal } = usePoints()
const overlay = useOverlay()
const imports = useImports()

const importedAt = (index: number) => index ? imports.registrations.at(index)!.imported_at : undefined
const points = computed(() => pointsTotal(importedAt(overlay.data?.index!)))
const latestPoints = computed(() => pointsTotal(importedAt(overlay.data?.scaleIndex! - 1)))
const nextLatestPoints = computed(() => pointsTotal(importedAt(overlay.data?.scaleIndex!)))

const maxPoints = computed(() => names.reduce((acc: number, c) => Math.max(acc, latestPoints.value[c]), 0))
const minPoints = computed(() => names.reduce((acc: number, c) => Math.min(acc, nextLatestPoints.value[c]), Infinity))

const rankedTeams = computed(() => [...names].sort((a,b) => points.value[b] - points.value[a]))

const logScale = computed(() => new LogScale(minPoints.value -2 , maxPoints.value))

const rank = (team: Team) => rankedTeams.value.indexOf(team) + 1
const y = (team: Team) => rank(team) * 25 - 20
const width = (team: Team) => 75 * logScale.value.logarithmicToLinear(points.value[team])

const loaded = ref(false)
setTimeout(() => loaded.value = true, 1000)
</script>
<style>
.list-move {
  transition: all 1.5s ease;
}
</style>