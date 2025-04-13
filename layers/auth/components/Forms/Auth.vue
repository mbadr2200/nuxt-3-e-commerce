<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { loginSchema,registerSchema } from '~/layers/auth/validation'

const props = defineProps({
    loading:{
        type: Boolean,
        default: false
    },
    isRegister:{
        type: Boolean,
        default: false
    }
})
const emit = defineEmits<{
    (e: 'submit', values: any): void
}>()
const validationSchema = computed(() => {
    return props.isRegister ? registerSchema : loginSchema
})
const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(validationSchema.value),
})
const onSubmit = handleSubmit((values) => {
    console.log(values)
    emit('submit', values)
})
</script>
<template>
    <div>
        <form @submit.prevent="onSubmit">
            <BaseInput v-if="isRegister" name="name" label="Name" />
            <BaseInput name="email" label="Email" type="email"/>
            <BaseInput name="password" label="Password" type="password"/>
            <BaseInput v-if="isRegister" name="avatar" label="Avatar" type="url"/>
            <BaseButton variant="outline" type="submit" :loading="loading">{{ isRegister ? 'Register' : 'Login' }}</BaseButton>

        </form>
    </div>
</template>
