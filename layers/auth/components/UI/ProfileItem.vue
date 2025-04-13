<script setup lang="ts">
const props = defineProps<{
    label: string
    value: string
}>()    
</script>
<template>
    <div class="flex items-center gap-2">
        <p class="text-sm text-gray-500">{{ label }}:</p>
        <p class="text-sm text-gray-700">{{ value }}</p>
    </div>
</template>