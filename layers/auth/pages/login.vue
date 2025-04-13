<script setup lang="ts">
const {login} = useAuth()
const loading = ref(false);
const onSubmit = async(values: any) => {
    console.log(values)
    loading.value = true;
    await login({
      email:values.email,
      password:values.password
    })
    loading.value = false;
}

</script>
<template>
  <div class="container mx-auto px-4 py-8 space-y-4">
    <BaseTitle title="Login Page" />
    <FormsAuth @submit="onSubmit" :loading="loading"/>
  </div>
</template>
