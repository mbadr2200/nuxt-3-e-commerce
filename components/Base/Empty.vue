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
 
  image: {
    type: String,
    default: '/images/get-lost-somewhere.png',
  },
});
</script>

<template>
  <div class="text-xl mx-auto text-center my-14">
    <Icon name="heroicons:inbox-stack" class="text-9xl text-gray-400 mx-auto my-5" />
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
