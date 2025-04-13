<script setup lang="ts">
import Popover from 'primevue/popover';
import useUserStore from '~/layers/auth/stores/user'
const localeRoute = useLocaleRoute()
const { user } = storeToRefs(useUserStore())
const { logout } = useAuth()
const popover = ref<any>(null)
const togglePopover = (event:any) => {
    popover.value.toggle(event)
}
</script>

<template>
   <div>
    <div class="flex items-center gap-4" v-if="!user">
        <NuxtLink :to="localeRoute('/login')">Login</NuxtLink>
        <NuxtLink :to="localeRoute('/register')">Register</NuxtLink>
    </div>
    <div class="flex items-center gap-4" v-else>
        <p @click="togglePopover" class="cursor-pointer flex items-center gap-2 text-white"> <Icon name="heroicons:user" class="w-5 h-5" />{{ user.name }}</p>
        <Popover ref="popover">
           <div class="flex flex-col gap-2">
            <NuxtLink class="hover:bg-gray-100 p-2 rounded-md cursor-pointer" :to="localeRoute('/profile')">Profile</NuxtLink>
            <NuxtLink class="hover:bg-gray-100 p-2 rounded-md cursor-pointer" @click="logout">Logout</NuxtLink>
           </div>
        </Popover>
    </div>
    
   </div>
</template>