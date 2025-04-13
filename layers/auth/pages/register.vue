<script setup lang="ts">
const {register} = useAuth()
const loading = ref(false);
const onSubmit = async(values: any) => {
    console.log(values)
    loading.value = true;
    await register({
      avatar:values.avatar,
      email:values.email,
      name:values.name,
      password:values.password
    })
    loading.value = false;
}

</script>
<template>
  <div class="container mx-auto px-4 py-8 space-y-4">
    <BaseTitle title="Register Page" />
    <FormsAuth @submit="onSubmit" :loading="loading" isRegister/>
  </div>
</template>
