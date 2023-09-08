<template>
    <div :class="`bg-${team}-500`" class="text-gray-200 p-4 rounded" @drop="onDropToTeam($event)" @dragover.prevent @dragenter.prevent>
        <h3 class="relative text-xl text-center uppercase border-b pb-5 mb-3">
            {{ team }}
            <span class="absolute inset-x-0 bottom-0 text-xxs text-gray-300">{{ list && list.length || 0 }} members</span>
        </h3>
        
        <ul class="divide-y divide-gray-400">
            <li v-for="member in list"
                :key="member.personID"
                draggable
                @dragstart.native="startMemberDrag($event, member)"
                class="py-1 flex justify-between cursor-pointer no-select">
                <span>{{ member.name }}</span>
                <span>{{ member.age }}</span>
            </li>
            <span v-if="!list || list.length == 0">No members yet</span>
        </ul>  
    </div>
</template>
<script setup lang="ts">
import { useTeams, type Team } from '@/composables/teams'
import { useMembers } from '@/store/members';
import type { DocumentData } from 'firebase/firestore';
import { computed } from 'vue'

const props = defineProps<{ team: Team }>()

const { teams } = useTeams()
const list = computed(() => teams.value[props.team])

const startMemberDrag = (evt: any, item: DocumentData) => {
    console.log('startDrag')
    evt.dataTransfer.dropEffect = 'move'
    evt.dataTransfer.effectAllowed = 'move'
    evt.dataTransfer.setData('itemID', item.id)
}

const members = useMembers()
const onDropToTeam = (evt: any) => {
    if (!list.value) return
    const itemID = evt.dataTransfer.getData('itemID')
    if (itemID) members.setTeam(itemID,  props.team)
}
</script>