<script setup lang="ts">
const props = defineProps<{
    title: string
}>()
</script>
<template>
     <h1 class="text-2xl font-bold mb-4">{{ title }}</h1>
</template>
