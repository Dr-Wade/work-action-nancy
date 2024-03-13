<template>
    <section>
        <div class="flex flex-row justify-between items-center mb-2">
            <h3 class="font-bold">Registrations</h3>
            <BccButton class="self-end" :icon="DownloadIcon" @click="showModal = true">Import</BccButton>
        </div>
        <TableLayout v-bind="{ columns, searchFields, pageSize, items: registrations.list }"  />
        <BccModal title="Import registrations" :open="showModal" @close="showModal = false">
            <div class="mb-3">
                <BccInput disabled :value="file ? file.name : 'No file selected'"/>
                <BccButton @click="triggerFileClick">Browse</BccButton>
                <input class="hidden" ref="fileRef" type="file" accept="text/csv" @change="(e: any) => file = e.target!.files[0]">
            </div>
            <template v-if="importLoaded">
                <div class="flex justify-between">
                    <span>{{ parsedRegistrations.length }} parsed</span>
                    <span class="text-gray-500">{{ ignoredRegistrations.length }} ignored</span>
                </div>
                <h3 class="text-lg font-bold my-2">Parsed</h3>
                <BccTable :columns="columns.filter((el) => el.text!='Import')" :items="parsedRegistrations!" />
                <h3 class="text-lg font-bold my-2">Ignored</h3>
                <BccTable class="mt-2" :columns="ignoredColumns" :items="ignoredRegistrations!" />
            </template>
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
import { useCsv } from '@/composables/useCsv'
import { useActivities } from '@/store/activities'
import { useImports, type Import } from '@/store/imports'
import { useMembers } from '@/store/members'
import { useConfig } from '@/store/config'
import { useRegistrations, type Registration } from '@/store/registrations'
import { BccButton, BccInput, BccModal, BccTable } from '@bcc-code/design-library-vue'
import { DownloadIcon } from '@bcc-code/icons-vue'
import { Timestamp } from 'firebase/firestore'
import { computed, ref, watch } from 'vue'

const fileRef = ref<HTMLElement>()
const triggerFileClick = () => { fileRef.value?.click() }
const file = ref<File>()

const registrations = useRegistrations()
const members = useMembers()
const activities = useActivities()
const imports = useImports()
const config = useConfig()

const columns = [
    { key: 'member.name', text: 'Member', sortable: false },
    { key: 'activity.id', text: 'Activity', sortable: false },
    { key: 'activity.points', text: 'Points' },
    { key: 'import.imported_at', text: 'Import', sortable: false }
]

const ignoredColumns = [
    { key: 'name', text: 'Member', sortable: false },
    { key: 'activityID', text: 'Activity', sortable: false },
    { key: 'personID', text: 'Person ID', sortable: false }
]

const searchFields = [ 'id', 'name', 'member.name' ]
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
    const importData: Import = {
        type: 'registrations',
        imported_at: Timestamp.now(),
        round: config.round
    }
    importData.id = (await imports.add(importData)).id
    await Promise.all(parsedRegistrations.value.map((r) => registrations.set({
        ...r,
        import: importData
    }))).then(reset)
}

const { file2string, csvToArray} = useCsv()

watch(file, async () => {
    if (!file.value) return
    const buffer = await file2string(file.value)
    const data = csvToArray(buffer)
    data.forEach((r) => {
        let member = members.fromId(r['Person ID'])
        let activity = activities.fromId(r['Activity ID'])
        let age = r['Age']
        if (!member || !activity || age >= 18 || age <= 13) ignoredRegistrations.value.push({ name: r['Name'], activityID: r['Activity ID'], personID: r['Person ID'] })
        else parsedRegistrations.value.push({ id: [activity.id, member.id].join('-'), member, activity })
    })
})
</script>