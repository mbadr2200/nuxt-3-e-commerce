<script setup lang='ts' generic="T">
defineProps({
  title: {
    type: String,
    default: 'No Results',
  },
  subTitle: {
    type: String,
    default: 'Please refine your search and try again',
  },
  data: {
    type: Array as PropType<T[]>,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: 'There is no ',
  },
  renderEmpty: {
    type: Boolean,
    default: false,
  },
  backSteps: {
    type: Number,
    default: 2,
  },
  image: {
    type: String,
    default: '/images/get-lost-somewhere.png',
  },
});
</script>

<template>
  <slot v-if="loading" name="loading" />
  <slot v-else-if="data?.length || renderEmpty" />
  <div v-else-if="!loading" class="text-xl mx-auto text-center my-14">
    <NuxtImg :src="image" alt="Get lost" height="330px" width="330px" class="mx-auto my-5 mt-20" />
    <h4 class="text-3xl font-noto">
      {{ title }}
    </h4>
    <p class="text-base my-2">
      {{ subTitle }}
    </p>
    <slot name="empty" />
  </div>
</template>

<style></style>
