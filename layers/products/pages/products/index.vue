<script setup lang="ts">
import useProducts from '~/layers/products/composables/useProducts';
import { uniqBy } from "lodash-es";
import type { Category, Product } from '~/layers/products/types';
import { useRouteQuery } from '@vueuse/router'
import { PAGINATION_LIMIT } from '~/config/constants';
import { useDebounce } from '@vueuse/core'

const { getProducts } = useProducts();
const titleQuery = useRouteQuery('title') ;
const debouncedTitleQuery = useDebounce(titleQuery, 500);
const categoryQuery = useRouteQuery('category');
const priceQuery = useRouteQuery('price');
const debouncedPriceQuery = useDebounce(priceQuery, 500);
const pageOffsetQuery = ref(0);
const currentPaginationLimit = ref(PAGINATION_LIMIT);
const productsData = ref<Product[]>([]);
const canFetchMore = ref(true);

const productsCategories = computed(() => {
    const categories = productsData.value.map((product) => product.category);
    return uniqBy(categories, 'id');
})
const { status } = await useAsyncData('products', async () => {
    const res = await getProducts({
        pagination: {
            offset: pageOffsetQuery.value,
            limit: currentPaginationLimit.value
        },
        filters:{
            category: categoryQuery.value as string,
            title: titleQuery.value as string,
            price: priceQuery.value as unknown as number[]
        }
    })
    if (res.length < PAGINATION_LIMIT) {
        canFetchMore.value = false;
    } else 
    {
        canFetchMore.value = true;
    }
    productsData.value.push(...res)
}, {
    watch: [pageOffsetQuery, debouncedTitleQuery, categoryQuery, debouncedPriceQuery],
});
const handleLoadMore = () => {
    pageOffsetQuery.value += PAGINATION_LIMIT;

}
</script>

<template>
    <div>
        <BaseTitle title="Products" />
        <div class="flex flex-col md:flex-row">
            <ProductSidebar :categories="productsCategories" />
            <ProductList class="flex-auto bg-red-300" :products="productsData" @loadMore="handleLoadMore" :loading="status === 'pending'"
                :canFetchMore="canFetchMore" />
        </div>
    </div>
</template>