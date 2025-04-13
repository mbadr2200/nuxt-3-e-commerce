<script setup lang="ts">

const localeRoute = useLocaleRoute()
const items = ref([
    {
        label: 'Home',
        icon: "solar:home-angle-linear",
        to: '/'
    },
    {
        label: 'About',
        to: '/about'
    },
    {
        label: "Products",
        to: '/products'
    },
]);

const isOpen = ref(false)
</script>

<template>
    <nav class="h-16 bg-primary">
        <div class="container flex justify-between items-center h-full">
            <!-- Mobile menu button -->
            <button @click="isOpen = !isOpen" class="lg:hidden text-light p-2">
                <Icon :name="isOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="w-6 h-6" />
            </button>

            <!-- Desktop Navigation -->
            <ul class="hidden lg:flex items-center gap-4">
                <li v-for="item in items" :key="item.label" class="text-light hover:text-secondary">
                    <NuxtLink :to="localeRoute(item.to)" class="flex items-center gap-2">
                        <Icon v-if="item.icon" :name="item.icon" />
                        {{ item.label }}
                    </NuxtLink>
                </li>
            </ul>

            <!-- Mobile Navigation -->
            <div v-if="isOpen" class="lg:hidden absolute top-16 left-0 w-full bg-primary py-4 px-4">
                <ul class="flex flex-col gap-4">
                    <li v-for="item in items" :key="item.label" class="text-light hover:text-secondary">
                        <NuxtLink :to="localeRoute(item.to)" class="flex items-center gap-2">
                            <Icon v-if="item.icon" :name="item.icon" />
                            {{ item.label }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>

            <div class="flex items-center gap-4">
                <BaseAuth />
                <BaseLangSwitcher />
            </div>
        </div>
    </nav>
</template>
<style>
.router-link-active {
    @apply text-secondary;
}
</style>