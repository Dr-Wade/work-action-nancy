<template>
    <div :class="`bg-${team}-500`" class="text-gray-200 p-4 rounded">
        <h3 class="relative text-xl text-center uppercase border-b pb-5 mb-3">
            {{ team }}
            <span class="absolute inset-x-0 bottom-0 text-xxs text-gray-300">{{ list && list.length || 0 }} members</span>
        </h3>
        <ul class="divide-y divide-gray-400">
            <li v-for="member in list"
                :key="member.personID"
                @contextmenu.prevent="(e) => onContextMenu(e, member)"
                class="py-1 flex justify-between cursor-pointer no-select">
                <span>{{ member.name }}</span>
                <span>{{ member.age }}</span>
            </li>
            <span v-if="!list || list.length == 0">No members yet</span>
        </ul>  
        <context-menu
            v-model:show="show"
            :options="options"
            >
            <context-menu-item v-for="team in names.filter((t) => t != selectedMember?.team)"
                :key="team"
                :label="'Move to ' + team"
                @click="members.setTeam(selectedMember!.personID, team)" />
        </context-menu>
    </div>
</template>
<script setup lang="ts">
import { useTeams, type Team } from '@/composables/useTeams'
import { useMembers, type Member } from '@/store/members'
import { computed, ref } from 'vue'

const props = defineProps<{ team: Team }>()

const { teams, names } = useTeams()
const list = computed(() => teams.value[props.team])
const members = useMembers()
const selectedMember = ref<Member>()
const show = ref(false)
const options = ref({
    zIndex: 3,
    minWidth: 230,
    x: 500,
    y: 200
})

const onContextMenu = (e : MouseEvent, member: Member) => {
    show.value = true
    options.value.x = e.x
    options.value.y = e.y
    selectedMember.value = member
}

</script>