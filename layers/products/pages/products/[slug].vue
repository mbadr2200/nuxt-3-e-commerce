<script setup lang="ts">
import Badge from 'primevue/badge';
const {slug} = useRoute().params;
const {getProductBySlug} = useProducts();
const {data:product,status} = await useAsyncData('product', async () => {
    const res = await getProductBySlug(slug as string);
    return res;
})

const selectedImage = ref(product.value?.images?.[0]);
const handleImageClick = (image:string) => {
    selectedImage.value = image;
}
</script>

<template>
   <div class="grid grid-cols-1 md:grid-cols-2 gap-4" v-if="product">
    <div class="w-full space-y-2 ">
        <nuxt-img :src="selectedImage" alt="product image"  class=" object-cover w-full h-[500px]"/>
        <div class="flex flex-wrap gap-2  justify-between w-full">
            <nuxt-img v-for="image in product?.images" :key="image" :src="image" alt="product image"  class="cursor-pointer productImage" @click="handleImageClick(image)"/>
        </div>
    </div>
    <div class="space-y-6">
       <div class="space-y-3">
        <Badge :value="product?.category.name" />
        <BaseTitle :title="product?.title" />
       </div>
        <p class="text-3xl font-bold">{{ product?.price }}$</p>
        <p class="text-sm">{{ product?.description }}</p>
       
    </div>
   </div>
</template>
<style scoped>
.productImage {
    /* set the base width of the item to 200px and prevent overflowing more than the 200px */
    width:150px;
    flex-grow: 1;
    height: 200px;
    object-fit: cover;
}
</style>