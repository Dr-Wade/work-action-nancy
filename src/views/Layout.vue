<template>
    <section class="flex flex-col gap-y-5 lg:px-4">
        <Navbar ref="navbar" solid :rounded="width >= 768" class="md:mt-2 w-full max-w-3xl mx-auto bg-neptune-600 text-primary">
            <template #logo>
                <NavbarLogo link="/" alt="Work Logo" image-url="/img/logo.svg" />
            </template>
            <template #default=" {isShowMenu }">
                <NavbarCollapse :isShowMenu="isShowMenu">
                    <RouterLink v-for="item in items"
                        :key="item.name"
                        :to="{ path: item.link}"
                        exact-active-class="bg-neptune-400">
                        {{ item.name}}
                    </RouterLink>
                </NavbarCollapse>
            </template>
        </Navbar>
        <RouterView class="w-full max-w-3xl mx-auto px-4 md:px-0" />
    </section>
</template>
<script setup lang="ts">
import { Navbar, NavbarLogo, NavbarCollapse } from 'flowbite-vue'
import { useRoute } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
import { ref, watch } from 'vue';

const { width } = useWindowSize()
const items = [
    { link: '/', name: 'Home' },
    { link: '/teams', name: 'Teams' },
    { link: '/activities', name: 'Activities' },
    { link: '/registrations', name: 'Registrations' },
    { link: '/bonuses', name: 'Bonuses' }
]

const navbar = ref()
const route = useRoute()
watch(() => route.name, () => navbar.value.isShowMenuOnMobile = false)
</script>
<style>
nav button[aria-controls="navbar-default"] {
    @apply !text-white;
    @apply hover:!bg-neptune-500
}

nav > div > div > ul {
    @apply !bg-neptune-500 !border-neptune-500;
}

nav ul > a {
    @apply block !py-2 !pr-4 !pl-3 !rounded md:!p-2 !text-gray-200 hover:bg-neptune-400;
}
</style>