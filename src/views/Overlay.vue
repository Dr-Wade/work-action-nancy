<template>
    <transition name="fade">
        Overlay
    </transition>
</template>
<script setup lang="ts">
</script>
<style>
.overlay {
    width: 1920px;
    height: 1080px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>