<template>
    <section class="flex flex-col gap-y-3">
        <h2 class="font-bold text-xl">Statuses</h2>
        <div id="statuses" class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <div v-for="team in statuses.list" :key="team.id" class="flex flex-col gap-y-2 mb-5 p-4 rounded text-gray-200" :class="`bg-${team.id}-500`">
                <span class="uppercase  border-b text-xl text-center">{{ team.id }}</span>
                <BccInput class="percent" v-model="team.buk" label="BUK" />
                <BccInput class="percent" v-model="team.samvirk" label="Samvirk" />
                <BccInput class="euro" v-model="team.camps" label="Camps" />
                <BccInput class="euro" v-model="team.lydia" label="Soirée Lydia" />
            </div>
            <BccButton @click="statuses.save().then(success)">Save</BccButton>
            <BccAlert class="fixed bottom-5 right-5" icon closeButton context="success" :open="showSuccess" @close="showSuccess = false" title="Changes saved!" />
        </div>
        <h2 class="font-bold text-xl">Teams</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-24">
            <TeamList v-for="team in names" :key="team" v-bind="{ team }" />
        </div>
    </section>
    
</template>

<script setup lang="ts">
import { BccInput, BccButton, BccAlert } from '@bcc-code/design-library-vue'
import { useTeams } from '@/composables/useTeams'
import { useStatuses } from '@/store/statuses'
import { ref } from 'vue';

const { names } = useTeams()
const statuses = useStatuses()
const showSuccess = ref(false)
const success = () => {
    showSuccess.value = true
    setTimeout(() => showSuccess.value = false, 5000)
}
</script>
<style>
#statuses .bcc-form-label {
    @apply justify-center
}

#statuses .bcc-input {
    @apply bg-white bg-opacity-20 border-white border-opacity-30 text-white text-lg text-center;
}

#statuses .percent .bcc-input-wrapper::after {
    content: '%';
    position: absolute;
    right: 15px;
    top: 8px;
    color: white;
    font-size: 20px;
}

#statuses .euro .bcc-input-wrapper::after {
    content: '€';
    position: absolute;
    right: 15px;
    top: 8px;
    color: white;
    font-size: 20px;
}
</style>