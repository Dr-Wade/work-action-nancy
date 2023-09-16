<template>
    <section class="flex flex-col gap-y-3">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <TeamList v-for="team in names" :key="team" v-bind="{ team }" />
        </div>
        <TableLayout v-bind="{ title, columns, searchFields, items, pageSize }" />
    </section>
    
</template>

<script setup lang="ts">
import TableLayout from '@/components/TableLayout.vue'
import { useTeams } from '@/composables/useTeams'
import { useMembers } from '@/store/members'
import { computed } from 'vue'

const members = useMembers()
const columns = [
    { key: 'personID', text: 'Person ID' },
    { key: 'name', text: 'Name' },
    { key: 'age', text: 'Age' },
    { key: 'gender', text: 'Gender' },
    { key: 'team', text: 'Team' }
]
const searchFields = [ 'personID', 'name', 'age', 'team' ]
const items = computed(() => members.list.filter((m) => !m.team))
const title = 'Unassigned members'
const pageSize = 500
const { names } = useTeams()
</script>@/composables/useTeams