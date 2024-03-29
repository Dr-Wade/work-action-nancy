<template>
    <div :class="`bg-${team}-500`" class="text-gray-200 p-4 rounded flex flex-col justify-between">
        <h3 class="relative text-xl text-center uppercase border-b pb-5 mb-3">
            {{ team }}
            <span class="absolute inset-x-0 bottom-0 text-xxs text-gray-300">{{ list && list.length || 0 }} members</span>
        </h3>
        <ul class="divide-y divide-gray-400 mb-auto">
            <li v-for="member in orderedList"
                :key="member.personID"
                @contextmenu.prevent="(e) => onContextMenu(e, member)"
                class="py-1 flex justify-between">
                <span>{{ member.name }}</span>
                <span class="ml-3">{{ pointsFrom(member.personID) }}</span>
            </li>
            <span v-if="!list || list.length == 0">No members yet</span>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { useTeams, type Team } from '@/composables/useTeams'
import { type Member } from '@/store/members'
import { useRegistrations } from '@/store/registrations';
import { computed, ref } from 'vue'

const props = defineProps<{ team: Team }>()
const registrations = useRegistrations()
const pointsFrom = (id: string) => registrations.list.reduce((acc, r) => r.member.personID == id ? acc + r.activity.points : acc, 0)
const { teams } = useTeams()
const list = computed(() => teams.value[props.team])
const orderedList = computed(() => list.value?.sort((a,b) => a.age - b.age))
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