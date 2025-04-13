
<script setup lang="ts">
import useUserStore from '../stores/user'
const { user } = storeToRefs(useUserStore())
definePageMeta({
    middleware: 'auth',
    name:"Profile",
})
</script>

<template>
    <div class="container mx-auto px-4 py-8 space-y-4 ">
       <BaseTitle title="Profile" />
        <div v-if="user" class="flex flex-col gap-4">
            <nuxt-img :src="user.avatar" class="w-24 h-24 rounded-full" />
            <UIProfileItem label="Name" :value="user.name" />
            <UIProfileItem label="Email" :value="user.email" />
        </div>
    </div>
</template>