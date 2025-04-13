<script setup lang='ts'>
const { locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div class="text-white">
    <template
      v-for="locale in locales"
      :key="locale.code"
    >
      <NuxtLink
        v-if="locale.code !== $i18n.locale"
        :to="switchLocalePath(locale.code)"
        class="mr-2 px-2 hover:bg-white hover:text-black transition-all border border-white center gap-3 capitalize"
      >
        <Icon name="hugeicons:translation" />
        {{ locale.code }}
      </NuxtLink>
    </template>
  </div>
</template>

<style></style>
