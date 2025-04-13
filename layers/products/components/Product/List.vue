<script setup lang="ts">
import type { Product } from '../../types';
import Skeleton from 'primevue/skeleton';
defineProps({
    products: {
        type: Array as PropType<Product[]>,
        required: true
    },
   
    canFetchMore: {
        type: Boolean,
        default:false
    },
    loading:{
        type: Boolean,
        default:true
    }
})
const emit = defineEmits(['loadMore']);
</script>
<template>
    <div class="bg-white">
        <div class="mx-auto max-w-2xl px-4  lg:max-w-7xl lg:px-8">
            <div  class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <template v-if="!loading">
                    <ProductCard v-for="product in products" :key="product.id" :product="product" />
                </template>
               <template v-else>
                <Skeleton v-for="i in 8" :key="i" class="w-full h-full" height="300px" width="100%" />
               </template>
            </div>
            <BaseButton v-if="canFetchMore" class="my-10 w-full mx-auto" @click="emit('loadMore')" :loading="loading" >Load More</BaseButton>
        </div>
    </div>
</template>
