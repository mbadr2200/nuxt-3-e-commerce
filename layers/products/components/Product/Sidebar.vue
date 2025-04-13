<!-- 
  Product Sidebar Component
  A filter sidebar component for product listings that provides:
  - Title search filter
  - Category filter
  - Price range filter with slider
  - Reset filters functionality
  Features:
  - Responsive design (sticky on large screens)
  - URL query parameter integration
  - Real-time filter updates
-->

<script setup lang="ts">
// Import PrimeVue components for UI elements
import Slider from 'primevue/slider';
import InputText from 'primevue/inputtext';

// Import VueUse router utilities for URL query management
import { useRouteQuery } from '@vueuse/router';

// Initialize query parameters with type safety
const priceQuery = useRouteQuery('price') as unknown as Ref<number[]>;
const titleQuery = useRouteQuery('title') as Ref<string>;
const categoryQuery = useRouteQuery('category') as Ref<string>;

/**
 * Reset all filters to their default values
 * - Clears title search
 * - Clears category selection
 * - Resets price range to [0, 1000]
 */
const resetFilters = () => {
    titleQuery.value = '';
    categoryQuery.value = '';
    priceQuery.value = [0, 1000];
}

// Initialize i18n translation function
const {t} = useI18n();
</script>

<template>
    <!-- 
      Sidebar Container
      - Sticky positioning on large screens
      - Responsive width (20% on large screens)
      - Light background with rounded corners
      - Consistent padding and spacing
    -->
    <div class="bg-light h-max lg:sticky top-10 w-full lg:w-[20%] lg:max-w-[20%] p-3 space-y-3 rounded-md">
        <!-- Sidebar Title -->
        <h2 class="text-lg font-bold">{{t('filterProducts')}}</h2>

        <!-- Title Search Filter -->
        <ProductFilterItem label="Title">
            <BaseInput 
                name="title" 
                v-model="titleQuery" 
                placeholder="Search by title" 
                class="w-full"
                :inputOnly="true" 
            />
        </ProductFilterItem>

        <!-- Category Filter -->
        <ProductFilterItem label="Categories">
            <ProductCategorySelect 
                v-model="categoryQuery" 
                class="w-full" 
            />
        </ProductFilterItem>

        <!-- Price Range Filter -->
        <ProductFilterItem label="Price">
            <!-- Price Range Display -->
            <div class="flex items-center gap-2">
                <span>From: <strong>{{ priceQuery?.[0] }}</strong></span>
                <span>To: <strong>{{ priceQuery?.[1] }}</strong></span>
            </div>
            <!-- Price Range Slider -->
            <Slider 
                v-model="priceQuery" 
                :min="0" 
                :max="1000" 
                range 
                class="w-full" 
            />
        </ProductFilterItem>

        <!-- Reset Filters Button -->
        <BaseButton 
            class="w-full" 
            @click="resetFilters"
        >
            Reset Filters
        </BaseButton>
    </div>
</template>