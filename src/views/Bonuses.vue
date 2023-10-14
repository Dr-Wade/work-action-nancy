<template>
    <section>
        <div class="flex flex-row justify-between items-center mb-2">
            <h3 class="font-bold">Bonuses</h3>
            <BccButton class="self-end" :icon="AddIcon" @click="showModal = true">New</BccButton>
        </div>
        <TableLayout v-bind="{ columns, searchFields, pageSize, items: bonuses.list }" @delete="handleDeleteEmitted" />
        <BccModal title="New bonus" :open="showModal" @close="showModal = false">
            <div class="grid grid-cols-2 gap-2">
                <BccInput :value="String(bonus.round)" disabled label="Round" class="col-span-full" />
                <BccSelect v-model="bonus.team" label="Team">
                    <option disabled value="">Select a team...</option>
                    <option v-for="team in names" :value="team" :key="team">{{team}}</option>
                </BccSelect>
                <BccInput v-model="bonus.points" label="Points" />
                <BccInput v-model="bonus.description" label="Description" is="textarea" class="col-span-2" />
            </div>
            <template #secondaryAction>
                <BccButton variant="secondary" @click="reset">Cancel</BccButton>
            </template>
            <template #primaryAction>
                <BccButton :disabled="!bonus.description" @click="handleAddBonus">Confirm</BccButton>
            </template>
        </BccModal>
        <BccModal title="Are you sure?" :open="showDeleteModal" @close="showDeleteModal = false">
            Are you sure you want to remove this bonus?
            <template #secondaryAction>
                <BccButton variant="secondary" @click="showDeleteModal = false">Cancel</BccButton>
            </template>
            <template #primaryAction>
                <BccButton context="danger" @click="handlDelete">Confirm</BccButton>
            </template>
        </BccModal>
    </section>
</template>

<script setup lang="ts">
import TableLayout from '@/components/TableLayout.vue'
import { useTeams } from '@/composables/useTeams'
import { type Bonus, useBonuses } from '@/store/bonuses'
import { useConfig } from '@/store/config'
import { BccButton, BccInput, BccModal, BccSelect } from '@bcc-code/design-library-vue'
import { AddIcon } from '@bcc-code/icons-vue'
import {  ref, watch } from 'vue'

const { names } = useTeams()
const bonuses = useBonuses()
const config = useConfig()
const initialBonus: Bonus = { team: 'blue', points: '0', description: '', round: 0 }
const bonus = ref<Bonus>({...initialBonus})

watch(() => config.round, () => bonus.value.round = config.round)

const columns = [
    { key: 'team', text: 'Team', sortable: false },
    { key: 'points', text: 'Points', sortable: false },
    { key: 'description', text: 'Description', sortable: false },
    { key: 'delete-action', text: '', sortable: false }
]
const searchFields = [ 'team', 'description' ]
const pageSize = 50

const showModal = ref(false)
const showDeleteModal = ref(false)
const bonusToDelete = ref<Bonus>()

const reset = () => {
    bonus.value = { ...initialBonus }
    showModal.value = false
}

const handleAddBonus = () => bonuses.add(bonus.value).then(reset)
const handleDeleteEmitted = (b: Bonus) => {
    bonusToDelete.value = b
    showDeleteModal.value = true
}
const handlDelete = () => {
    if (!bonusToDelete.value) return
    bonuses.remove(bonusToDelete.value.id!).then(() => showDeleteModal.value = false)
} 
</script>