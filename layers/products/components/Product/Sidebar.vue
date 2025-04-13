<script setup lang="ts">
import Slider from 'primevue/slider';
import { useRouteQuery } from '@vueuse/router';
import type { Category } from '../../types';

defineProps({
    categories: {
        type: Array as PropType<Category[]>,
        required: true
    }
})
const priceQuery = useRouteQuery('price');
const titleQuery = useRouteQuery('title');
const categoryQuery = useRouteQuery('category');


const resetFilters = () => {
    titleQuery.value = '';
    categoryQuery.value = '';
   priceQuery.value = [0,100000];
}
</script>
<template>
    <div class="bg-light h-max lg:sticky top-10 w-full lg:w-[20%] lg:max-w-[20%] p-3 space-y-3 rounded-md">
        <h2 class="text-lg font-bold">Filter Products</h2>
        <ProductFilterItem label="Title">
           <BaseInput name="title" v-model="titleQuery" placeholder="Search by title" class="w-full" :inputOnly="true" />
        </ProductFilterItem>
        <ProductFilterItem label="Categories">
        </ProductFilterItem>
        <ProductFilterItem label="Price">
            <div class="flex items-center gap-2">
                <span>From: <strong>{{ priceQuery?.[0]   }}</strong></span>
                <span>To: <strong>{{ priceQuery?.[1] }}</strong></span>
            </div>
            <Slider v-model="priceQuery" :min="0" :max="100000" range class="w-full"/>
         
        </ProductFilterItem>
        <BaseButton class="w-full" @click="resetFilters">Reset Filters</BaseButton>
    </div>
</template>