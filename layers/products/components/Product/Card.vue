<script setup lang="ts">
import type { Product } from '../../types';
const props = defineProps({
    product: {
        type: Object as PropType<Product>,
        required: true
    }
})
const localeRoute = useLocaleRoute()
</script>

<template>
     <div  class="group relative">
                    <img :src="product.images?.[0]" :alt="product.title"
                        class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80" />
                    <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-sm text-gray-700">
                                <nuxt-link :to="localeRoute(`/products/${product.slug}`)">
                                    <span aria-hidden="true" class="absolute inset-0" />
                                    {{ product.title }}
                                </nuxt-link>
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">{{ product.category.name }}</p>
                        </div>
                        <p class="text-sm font-black text-gray-900">{{ product.price }}$</p>
                    </div>
                </div>
</template>