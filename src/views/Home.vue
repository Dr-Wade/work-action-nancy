<template>
    <section class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div v-for="team in names"
            :key="team"
            :class="`bg-${team}-500`" class="text-gray-200 p-4 rounded flex flex-col gap-y-2">
            <h3 class="relative text-xl text-center uppercase border-b pb-5 mb-3">{{ team }}</h3>
            <div class="flex justify-between text-sm">
                <span>Registrations:</span>
                <span>{{ points.registrations[team] }}</span>
            </div>
            <div class="flex justify-between text-sm">
                <span>Bonuses:</span>
                <span>{{ points.bonuses[team] }}</span>
            </div>
            <div class="flex justify-between font-bold text-lg">
                <span>Total points:</span>
                <span>{{ points.total[team] }}</span>
            </div>
        </div>
        <div class="card">
            <span>Last registration import</span>
            <span class="font-bold">{{ imports.lastRegistrationImport
                ? date(imports.lastRegistrationImport.imported_at)
                : 'Never'
            }}</span>
        </div>
        <div class="card">
            <span>Last activity import</span>
            <span class="font-bold">{{ imports.lastActivityImport
                ? date(imports.lastActivityImport.imported_at)
                : 'Never'
            }}</span>
        </div>
        <div class="card">
            <span>Shown on overlay</span>
            <span class="font-bold">{{ overlay.data
                ? date(imports.registrations.at(overlay.data.index)!.imported_at)
                : 'None'
            }}</span>
            <div class="grid grid-cols-3 gap-2">
                <BccButton :disabled="!overlay.hasOlder" @click="overlay.previous">Previous</BccButton>
                <BccButton :disabled="!overlay.hasNewer" @click="overlay.rescale">Rescale</BccButton>
                <BccButton :disabled="!overlay.hasNewer" @click="overlay.next">Next</BccButton>
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
const { pointsTotal, pointsFromBonuses, pointsFromRegistrations } = usePoints()
const points = computed(() => ({
    registrations: pointsFromRegistrations(),
    bonuses: pointsFromBonuses(),
    total: pointsTotal()
}))
const imports = useImports()
const overlay = useOverlay()
</script>
<style scoped>
.card {
    @apply bg-white p-4 rounded flex flex-col gap-y-3 col-span-2 text-center;
}
</style>