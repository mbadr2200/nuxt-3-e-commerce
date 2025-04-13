<script setup lang="ts">
import Slider from 'primevue/slider';
import { useRouteQuery } from '@vueuse/router';
import InputText from 'primevue/inputtext';

const priceQuery = useRouteQuery('price') as unknown as Ref<number[]>;
const titleQuery = useRouteQuery('title') as Ref<string>;
const categoryQuery = useRouteQuery('category') as Ref<string>;


const resetFilters = () => {
    titleQuery.value = '';
    categoryQuery.value = '';
    priceQuery.value = [0, 1000];
}
</script>
<template>
    <div class="bg-light h-max lg:sticky top-10 w-full lg:w-[20%] lg:max-w-[20%] p-3 space-y-3 rounded-md">
        <h2 class="text-lg font-bold">Filter Products</h2>
        <ProductFilterItem label="Title">
             <BaseInput name="title" v-model="titleQuery" placeholder="Search by title" class="w-full"
                :inputOnly="true" />
        </ProductFilterItem>
        <ProductFilterItem label="Categories">
            <ProductCategorySelect v-model="categoryQuery" class="w-full" />
        </ProductFilterItem>
        <ProductFilterItem label="Price">
            <div class="flex items-center gap-2">
                <span>From: <strong>{{ priceQuery?.[0] }}</strong></span>
                <span>To: <strong>{{ priceQuery?.[1] }}</strong></span>
            </div>
            <Slider v-model="priceQuery" :min="0" :max="1000" range class="w-full" />
        </ProductFilterItem>
        <BaseButton class="w-full" @click="resetFilters">Reset Filters</BaseButton>
    </div>
</template>