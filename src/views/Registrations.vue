<template>
    <div class="flex flex-row justify-between items-center">
        <h3 class="font-bold">Registrations</h3>
        <BccButton class="self-end" :icon="DownloadIcon" @click="showModal = true">Import</BccButton>
    </div>
    <TableLayout v-bind="{ columns, searchFields, pageSize, items: registrations.list }"  />
    <BccModal title="Import registrations" :open="showModal" @close="showModal = false">
        <div class="mb-3">
            <BccInput disabled :value="file ? file.name : 'No file selected'"/>
            <BccButton @click="triggerFileClick">Browse</BccButton>
            <input class="hidden" ref="fileRef" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="(e: any) => file = e.target!.files[0]">
        </div>
        <BccTable v-if="importLoaded" :columns="columns" :items="parsedRegistrations" />
        <template #secondaryAction>
            <BccButton variant="secondary" @click="parsedRegistrations = [], showModal = false">Cancel</BccButton>
        </template>
        <template #primaryAction>
            <BccButton :disabled="!importLoaded" @click="importRegistrations">Confirm</BccButton>
        </template>
    </BccModal>
</template>

<script setup lang="ts">
import TableLayout from '@/components/TableLayout.vue'
import { useActivities } from '@/store/activities'
import { useMembers } from '@/store/members'
import { useRegistrations, type Registration } from '@/store/registrations'
import { BccButton, BccInput, BccModal, BccTable } from '@bcc-code/design-library-vue'
import { DownloadIcon } from '@bcc-code/icons-vue'
import { computed, ref, watch } from 'vue'
import xlsxParser from 'xlsx-parse-json'
const fileRef = ref<HTMLElement>()
const triggerFileClick = () => { fileRef.value?.click() }
const file = ref<File>()

const registrations = useRegistrations()
const members = useMembers()
const activities = useActivities()

const columns = [
    { key: 'member.name', text: 'Member', sortable: false },
    { key: 'activity.id', text: 'Activity', sortable: false },
    { key: 'activity.points', text: 'Points' }
]
const searchFields = [ 'id', 'name' ]
const pageSize = 50

const showModal = ref(false)
const parsedRegistrations = ref<Registration[]>()
const importLoaded = computed(() => parsedRegistrations.value && parsedRegistrations.value.length)

const importRegistrations = async () => {
    if (!parsedRegistrations.value) return
    await Promise.all(parsedRegistrations.value.map(registrations.set)).then(() => {
        showModal.value = false
    })
}

watch(file, async () => {
    if (!file.value) return
    xlsxParser.onFileSelection(file.value)
        .then((data: any) => {
            parsedRegistrations.value = data.Registrations.map((r: any): Registration => {
                let member = members.fromId(r['Person ID'])
                let activity = activities.fromId(r['Activity ID'])
                if (!member || !activity) throw new Error('NONO')
                return { member, activity }
            })
        })
})
</script>