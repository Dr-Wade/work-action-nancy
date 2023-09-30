<template>
    <section class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div v-for="team in names"
            :key="team"
            :class="`bg-${team}-500`" class="text-gray-200 p-4 rounded flex flex-col gap-y-2">
            <h3 class="relative text-xl text-center uppercase border-b pb-5 mb-3">{{ team }}</h3>
            <div class="flex justify-between text-sm">
                <span>Registrations:</span>
                <span>{{ pointsFromRegistrations[team] }}</span>
            </div>
            <div class="flex justify-between text-sm">
                <span>Bonuses:</span>
                <span>{{ pointsFromBonuses[team] }}</span>
            </div>
            <div class="flex justify-between font-bold text-lg">
                <span>Total points:</span>
                <span>{{ pointsPerTeam[team] }}</span>
            </div>
        </div>
        <div class="card">
            <span>Last registration import</span>
            <span class="font-bold">{{ imports.lastRegistrationImport
                ? date(imports.lastRegistrationImport.imported_at!)
                : 'Never'
            }}</span>
        </div>
        <div class="card">
            <span>Last activity import</span>
            <span class="font-bold">{{ imports.lastActivityImport
                ? date(imports.lastActivityImport.imported_at!)
                : 'Never'
            }}</span>
        </div>
        <div class="card">
            <span>Shown on overlay</span>
            <span class="font-bold">{{ overlay.data && overlay.data.import
                //@ts-ignore
                ? date(overlay.data.import.imported_at!)
                : 'None'
            }}</span>
            <div class="grid grid-cols-2 gap-2">
                <BccButton :disabled="!canGoPrevious" @click="goPrevious">Previous</BccButton>
                <BccButton :disabled="!canGoNext" @click="goNext">Next</BccButton>
            </div>
            
        </div>
    </section>
</template>

<script setup lang="ts">
import { usePoints } from '@/composables/usePoints'
import { useTeams } from '@/composables/useTeams'
import { useImports } from '@/store/imports'
import { useFormat } from '@/composables/useFormat'
import { useOverlay } from '@/store/overlay'
import { BccButton } from '@bcc-code/design-library-vue'
import { computed } from 'vue'

const { date } = useFormat()
const { names } = useTeams()
const { pointsPerTeam, pointsFromBonuses, pointsFromRegistrations } = usePoints()
const imports = useImports()
const overlay = useOverlay()

const importIndex = computed(() => {
    if (!overlay.data) return -1
    else return imports.registrations.findIndex((i) => i.id == overlay.data!.import.id)
})

const canGoPrevious = computed(() => {
    if (imports.registrations.length == 0) return false
    return importIndex.value < imports.registrations.length - 1
})

const canGoNext = computed(() => {
    if (imports.registrations.length == 0) return false
    return importIndex.value > 0
})

const goPrevious = () => overlay.set({ import: imports.registrations.at(importIndex.value + 1)! })
const goNext = () => overlay.set({ import: imports.registrations.at(importIndex.value - 1)! })
</script>
<style scoped>
.card {
    @apply bg-white p-4 rounded flex flex-col gap-y-3 col-span-2 text-center;
}
</style>