<template>
    <section class="flex flex-col gap-y-3">
        <h2 class="font-bold text-xl">Statuses</h2>
        <div id="statuses" class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <div v-for="team in statuses.list" :key="team.id" class="flex flex-col gap-y-2 mb-5 p-4 rounded text-gray-200" :class="`bg-${team.id}-500`">
                <span class="uppercase  border-b text-xl text-center">{{ team.id }}</span>
                <BccInput class="percent" v-model="team.buk" label="BUK" />
                <BccInput class="percent" v-model="team.samvirk" label="Samvirk" />
                <BccInput class="euro" v-model="team.camps" label="Don Camps" />
                <BccInput class="euro" v-model="team.lydia" label="Cagnotte Lydia" />
                <BccInput class="euro" v-model="team.lydiaTemp" label="Soirée Lydia" />
            </div>
            <BccButton @click="statuses.save().then(success)">Save</BccButton>
            <BccButton @click="updateLydia">Update Lydia</BccButton>
            <BccAlert class="fixed bottom-5 right-5" icon closeButton context="success" :open="showSuccess" @close="showSuccess = false" title="Changes saved!" />
        </div>
        <h2 class="font-bold text-xl">Crawl</h2>
        <div id="crawl" v-if="config.data" class="grid grid-cols-3 gap-3 mb-8">
            <div class="flex">
                <BccInput v-model="config.data.crawlStart" />
                <BccButton @click="setToNow">Now</BccButton>
            </div>
            <BccButton v-if="!config.data.crawlActive || config.data.crawlerId != crawler.id" @click="start">Start</BccButton>
            <BccButton v-else @click="stop" context="danger">Stop</BccButton>
            <div class="flex flex-col divide-y">
                <template v-if="!config.data?.crawlActive">Not running</template>
                <template v-else>
                    <span>Running: <strong>{{crawler.runningTime}}</strong></span>
                    <span class="text-xs text-gray-500">Last sync: {{ crawler.lastSync }}</span>
                </template>
            </div>
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
import { useConfig } from '@/store/config'
import { useCrawler } from '@/store/crawler'
import { ref } from 'vue';

const { names } = useTeams()
const statuses = useStatuses()
const config = useConfig()
const showSuccess = ref(false)
const success = () => {
    showSuccess.value = true
    setTimeout(() => showSuccess.value = false, 5000)
}

const crawler = useCrawler()
const setToNow = () => {
    if (!config.data) return
    const date = new Date()
    config.data.crawlStart = [date.toISOString().slice(0,10), date.toLocaleTimeString()].join(' ')
}

const start = async () => {
    if (!config.data) return
    config.data.crawlerId = crawler.id
    config.data.crawlActive = true
    crawler.runningSince = Date.now()
    await config.save()
}

const stop = async () => {
    if (!config.data) return
    config.data.crawlerId = ''
    config.data.crawlActive = false
    crawler.runningTime = '00:00:00'
    crawler.runningSince = null
    await config.save()
}

const updateLydia = async () => {
    if (!config.startDate) return
    await crawler.crawl(config.startDate + ' 00:00:00')
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

#statuses .bcc-form-label span {
    color: white;
}
</style>