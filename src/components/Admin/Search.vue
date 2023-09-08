<template>
    <div class="w-full relative">
        <input v-model="query" class="w-full bg-tiber-700 text-white border-2 border-tiber-500 h-10 px-5 pr-16 rounded-lg text-sm" type="search" name="search" placeholder="Search">
    </div>
</template>
<script setup lang="ts">
import { useVModel } from '@vueuse/core';
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const query = useVModel(props, 'modelValue', emit)
</script>