<script setup lang="ts">
defineProps({
    variant:{
        type: String as PropType<'primary' | 'secondary' | 'danger' | 'outline'>,
        default: 'primary'
    },
    loading:{
        type: Boolean,
        default: false
    }
})

</script>

<template>
    <button :disabled="loading" 
    class="w-full px-4 py-2   rounded-md  transition-colors"
    :class="[
        variant === 'primary' && 'bg-primary hover:bg-primary/80 text-white',
        variant === 'secondary' && 'bg-secondary hover:bg-secondary/80 text-white',
        variant === 'danger' && 'bg-danger hover:bg-danger/80 text-white',
        variant === 'outline' && 'border border-primary hover:bg-primary/10 text-primary',
    ]"
    >
        <BaseSpinner v-if="loading" />
        <div v-else>
            <slot />
        </div>
    </button>
</template>