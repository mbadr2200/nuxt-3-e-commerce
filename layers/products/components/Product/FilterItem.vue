<script setup lang="ts">
defineProps({
    label: {
        type: String,
        required: true
    },
})
</script>
<template>
<div>
    <div class="flex flex-col items-start gap-3">
        <p>{{ label }}</p>
        <slot></slot>
    </div>
</div>
</template>
