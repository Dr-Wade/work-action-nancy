<template>
    <section>
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
            <templte v-if="importLoaded">
                <div class="flex justify-between">
                    <span>{{ parsedRegistrations.length }} parsed</span>
                    <span class="text-gray-500">{{ ignoredRegistrations.length }} ignored</span>
                </div>
                <h3 class="text-lg font-bold my-2">Parsed</h3>
                <BccTable :columns="columns" :items="parsedRegistrations!" />
                <h3 class="text-lg font-bold my-2">Ignored</h3>
                <BccTable class="mt-2" :columns="ignoredColumns" :items="ignoredRegistrations!" />
            </templte>
            <template #secondaryAction>
                <BccButton variant="secondary" @click="reset">Cancel</BccButton>
            </template>
            <template #primaryAction>
                <BccButton :disabled="!importLoaded" @click="importRegistrations">Confirm</BccButton>
            </template>
        </BccModal>
    </section>
</template>

<script setup lang="ts">
import TableLayout from '@/components/TableLayout.vue'
import { useActivities } from '@/store/activities'
import { useImports } from '@/store/imports'
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
const imports = useImports()

const columns = [
    { key: 'member.name', text: 'Member', sortable: false },
    { key: 'activity.id', text: 'Activity', sortable: false },
    { key: 'activity.points', text: 'Points' }
]

const ignoredColumns = [
    { key: 'name', text: 'Member', sortable: false },
    { key: 'activityID', text: 'Activity', sortable: false },
    { key: 'personID', text: 'Person ID', sortable: false }
]

const searchFields = [ 'id', 'name' ]
const pageSize = 50

const showModal = ref(false)
const parsedRegistrations = ref<Registration[]>([])
const ignoredRegistrations = ref<any[]>([])
const importLoaded = computed(() => parsedRegistrations.value && parsedRegistrations.value.length)

const reset = () => {
    parsedRegistrations.value = []
    ignoredRegistrations.value = []
    showModal.value = false
}

const importRegistrations = async () => {
    if (!parsedRegistrations.value) return
    await Promise.all(parsedRegistrations.value.map(registrations.set)).then(() => {
        imports.add({ type: 'registrations' })
        reset()
    })
}

//TODO: Replace with csv import?
watch(file, async () => {
    if (!file.value) return
    xlsxParser.onFileSelection(file.value)
        .then((data: any) => {
            data.Registrations.forEach((r: any) => {
                let member = members.fromId(r['Person ID'])
                let activity = activities.fromId(r['Activity ID'])
                if (!member || !activity) ignoredRegistrations.value.push({ name: r['Name'], activityID: r['Activity ID'], personID: r['Person ID'] })
                else parsedRegistrations.value.push({ id: [activity.id, member.id].join('-'), member, activity })
            })
        })
})
</script>