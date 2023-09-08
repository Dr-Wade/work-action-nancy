<template>
    <div class="flex flex-row justify-between items-center">
        <h3 class="font-bold">Activities</h3>
        <BccButton class="self-end" :icon="DownloadIcon" @click="showModal = true">Import</BccButton>
    </div>
    <TableLayout v-bind="{ columns, searchFields, pageSize, items: activities.list }"  />
    <BccModal title="Import activities" :open="showModal" @close="showModal = false">
        <div class="mb-3">
            <BccInput disabled :value="file ? file.name : 'No file selected'"/>
            <BccButton @click="triggerFileClick">Browse</BccButton>
            <input class="hidden" ref="fileRef" type="file" accept="text/csv" @change="(e: any) => file = e.target!.files[0]">
        </div>
        <BccTable v-if="parsedActivities && parsedActivities.length" :columns="columns" :items="parsedActivities" />
        <template #secondaryAction>
            <BccButton variant="secondary" @click="parsedActivities = [], showModal = false">Cancel</BccButton>
        </template>
        <template #primaryAction>
            <BccButton @click="importActivities">Confirm</BccButton>
        </template>
    </BccModal>
</template>

<script setup lang="ts">
import TableLayout from '@/components/TableLayout.vue'
import { useActivities, type Activity } from '@/store/activities'
import { BccButton, BccInput, BccModal, BccTable } from '@bcc-code/design-library-vue'
import { DownloadIcon } from '@bcc-code/icons-vue'
import { ref, watch } from 'vue'

const fileRef = ref<HTMLElement>()
const triggerFileClick = () => { fileRef.value?.click() }
const file = ref<File>()

const activities = useActivities()
const columns = [
    { key: 'id', text: 'Activity ID', sortable: false},
    { key: 'name', text: 'Name', sortable: false },
    { key: 'points', text: 'Points', sortable: false }
]
const searchFields = [ 'id', 'name' ]
const pageSize = 50

const showModal = ref(false)
const parsedActivities = ref<Activity[]>()

const file2string = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    const readFile = () => {
      const str = reader.result as string
      resolve(str)
    }
    reader.addEventListener('load', readFile)
    reader.readAsText(file)
  })
}

const makeUnique = (arr: Array<string>) => {
    let result: Array<string> = []
    arr.forEach((el) => {
        let i = 0
        const getName = () => el + (i == 0 ? '' : i)
        while (result.indexOf(getName()) != -1) i++
        result.push(getName())
    })
    return result
}

const csvToArray = (str: string, delimiter = ",") => {
  const headers = makeUnique(str.slice(0, str.indexOf("\n")).split(delimiter))
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  const arr = rows.map((row) => {
    const values = row.split(delimiter);
    const el = headers.reduce((object, header, index) => {
        if (!values[index]) return object
        object[header] = values[index].replaceAll('"', '').trim();
        return object;
    }, {} as {[key: string]: any});
    return el
  }).filter((row) => Object.keys(row).length > 0)
  return arr
}

const calculatePoints = (startDay: string, endDay: string, start: string, end: string): number => {
    if (startDay != endDay) return 1
    const startHour = Number(start.split(':')[0])
    const endHour = Number(end.split(':')[0])
    return (endHour - startHour) > 4 ? 1 : 0.5
}

const importActivities = async () => {
    if (!parsedActivities.value) return
    await Promise.all(parsedActivities.value.map(activities.set)).then(() => {
        showModal.value = false
    })
}

watch(file, async () => {
    if (!file.value) return
    const buffer = await file2string(file.value)
    parsedActivities.value = csvToArray(buffer).map((line): Activity => ({
        id: line['Activity ID'],
        name: line['Activity name'],
        points: calculatePoints(line.Start, line.End, line.Time, line.Time1)
    }))
})
</script>