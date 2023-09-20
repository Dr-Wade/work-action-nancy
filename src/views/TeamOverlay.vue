<template>
    <div class="w-full bg-white">
        <div class="py-5 flex justify-center gap-x-5" :class="`bg-${team}-2`">
            <img class="w-24" src="/img/logo.svg">
            <img class="w-24" :src="'/img/'+ team + '.svg'">
        </div>
        <div class="flex justify-around py-5 px-5">
            <ul v-for="(column, idx) in [firstColumn, secondColumn]" :key="idx">
                <li v-for="member in column"
                    :key="member.personID"
                    class="py-1 flex justify-between cursor-pointer no-select">
                    <span>{{ member.name }}</span>
                </li>
            </ul>
        </div>  
    </div>
    
</template>
<script setup lang="ts">
import { useTeams } from '@/composables/useTeams'
import { useRouteParams } from '@vueuse/router'
import { computed } from 'vue'

const team = useRouteParams('team')

const { teams } = useTeams()
const list = computed(() => teams.value[team.value])
const orderedList = computed(() => list.value?.sort((a,b) => a.name.localeCompare(b.name)))
const half = computed(() => Math.ceil(orderedList.value.length / 2))
const firstColumn = computed(() => orderedList.value.slice(0, half.value))
const secondColumn = computed(() => orderedList.value.slice(half.value))

</script>