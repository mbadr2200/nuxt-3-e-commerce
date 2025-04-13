<script setup lang="ts">
import { Toaster } from 'vue-sonner'

const { localeProperties } = useI18n()
</script>

<template>
  <Html :lang="localeProperties.code" :dir="localeProperties.direction as string">
    <Body>
      <Toaster richColors/>
      <NuxtLoadingIndicator color="rgb(var(--secondary-color))" />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>
