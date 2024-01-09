<template>
    <section id="overlays">
        <h3 class="font-bold mb-5">Overlays</h3>
        <div class="grid grid-cols-4 gap-3">
            <BccButton @click="goToOverlay('overview')">Overview</BccButton>
            <BccButton @click="goToOverlay('camps')">Camps U18</BccButton>
            <BccButton @click="goToOverlay('lydia')">Soirée Lydia</BccButton>
            <div></div>
            <template v-if="config.data">
                <span class="col-span-full font-bold">Base heights (in px)</span>
                <BccInput v-model="config.data.totalHeight" />
                <BccInput v-model="config.data.campsHeight" />
                <BccInput v-model="config.data.lydiaHeight" />
                <BccButton :style="{ height: '40px !important' }" @click="config.save().then(success)">Save</BccButton>
            </template>
            <BccAlert class="fixed bottom-5 right-5" icon closeButton context="success" :open="showSuccess" @close="showSuccess = false" title="Changes saved!" />
        </div>
        <h3 class="font-bold my-5">Team overlays</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <BccButton v-for="name in names" @click="goToOverlay('team/' + name)" :class="name" >{{capitalize(name)}}</BccButton>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useFormat } from '@/composables/useFormat'
import { useTeams } from '@/composables/useTeams'
import { useConfig } from '@/store/config';
import { BccButton, BccInput, BccAlert } from '@bcc-code/design-library-vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const { names } = useTeams()
const { capitalize } = useFormat()
const router = useRouter()
const goToOverlay = (overlay: string) => router.push('/overlay/' + overlay)
const config = useConfig()
const showSuccess = ref(false)
const success = () => {
    showSuccess.value = true
    setTimeout(() => showSuccess.value = false, 5000)
}
</script>
<style>
#overlays .bcc-button {
    height: 60px;
}
.bcc-button.red {
    @apply bg-red-500;
}
.bcc-button.orange {
    @apply bg-orange-500;
}
.bcc-button.blue {
    @apply bg-blue-500;
}
.bcc-button.green {
    @apply bg-green-500;
}
</style>