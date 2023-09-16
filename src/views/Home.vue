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
                ? formatTimestamp(imports.lastRegistrationImport.imported_at!)
                : 'Never'
            }}</span>
        </div>
        <div class="card">
            <span>Last activity import</span>
            <span class="font-bold">{{ imports.lastActivityImport
                ? formatTimestamp(imports.lastActivityImport.imported_at!)
                : 'Never'
            }}</span>
        </div>
    </section>
</template>

<script setup lang="ts">
import { usePoints } from '@/composables/usePoints'
import { useTeams } from '@/composables/useTeams'
import { useImports } from '@/store/imports';
import type { Timestamp } from 'firebase/firestore';

const { names } = useTeams()
const { pointsPerTeam, pointsFromBonuses, pointsFromRegistrations } = usePoints()
const imports = useImports()
const dateFormat = new Intl.DateTimeFormat('en-GB', {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
})

const formatTimestamp = (t: Timestamp) => dateFormat.format(t.toDate())
</script>
<style scoped>
.card {
    @apply bg-white p-4 rounded flex flex-col gap-y-3 col-span-2 text-center;
}
</style>