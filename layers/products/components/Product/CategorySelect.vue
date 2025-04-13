<script setup lang="ts">
import Select from 'primevue/select';


const { getProductCategories } = useProducts();
const { data: categories,status } = await useAsyncData('categories', () => getProductCategories());
const modelValue = defineModel<string>('modelValue');
</script>
<template>
    <div>
        <Select v-model="modelValue" :options="categories!" optionLabel="name" optionValue="slug" :loading="status === 'pending'" placeholder="Select a category" class="w-full" :showClear="true" :filters="true" />
    </div>
</template>