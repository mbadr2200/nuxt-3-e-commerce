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
const canFetchMore = ref(true);

const setFetchMore = (length: number) => {
    if (length < PAGINATION_LIMIT) {
        canFetchMore.value = false;
    } else 
    {
        canFetchMore.value = true;
    }
}

const { status,data:productsData } = await useAsyncData('products', async () => {
    const res = await getProducts({
        pagination: {
            offset: 0,
            limit: currentPaginationLimit.value
        },
        filters:{
            category: categoryQuery.value as string,
            title: titleQuery.value as string,
            price: priceQuery.value as unknown as number[]
        }
    })
    setFetchMore(res.length);
    return res;
}, {
    watch: [debouncedTitleQuery, categoryQuery, debouncedPriceQuery],
});
const loading = ref(false);
const handleLoadMore = async () => {
    loading.value = true;
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
    setFetchMore(res.length);
    productsData.value.push(...res)
    pageOffsetQuery.value += PAGINATION_LIMIT;
    loading.value = false;
}
</script>

<template>
    <div>
        <BaseTitle title="Products" />
        <div class="flex flex-col md:flex-row">
            <ProductSidebar />
            <ProductList class="flex-auto" :products="productsData" @loadMore="handleLoadMore" :loading="status === 'pending' || loading"
                :canFetchMore="canFetchMore" />
        </div>
    </div>
</template>