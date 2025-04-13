<!-- 
  AuthForm Component
  A reusable form component for both login and registration functionality.
  Features:
  - Dynamic form fields based on mode (login/register)
  - Form validation using Zod schemas
  - Loading state handling
  - Error message display
  - Form submission handling
-->

<script setup lang="ts">
// Import validation schemas and type conversion utility
import { toTypedSchema } from '@vee-validate/zod'
import { loginSchema, registerSchema } from '~/layers/auth/validation'

// Component props definition
const props = defineProps({
    // Loading state indicator
    loading: {
        type: Boolean,
        default: false
    },
    // Toggle between login and register modes
    isRegister: {
        type: Boolean,
        default: false
    }
})

// Define component events
const emit = defineEmits<{
    // Form submission event with form values
    (e: 'submit', values: any): void
}>()

// Computed validation schema based on form mode
const validationSchema = computed(() => {
    return props.isRegister ? registerSchema : loginSchema
})

// Initialize form handling with validation
const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(validationSchema.value),
})

// Form submission handler
const onSubmit = handleSubmit((values) => {
    console.log(values)
    emit('submit', values)
})
</script>

<template>
    <div>
        <!-- Form container with submission handler -->
        <form @submit.prevent="onSubmit">
            <!-- Name field (only shown in register mode) -->
            <BaseInput 
                v-if="isRegister" 
                name="name" 
                label="Name" 
            />
            
            <!-- Email field (required for both modes) -->
            <BaseInput 
                name="email" 
                label="Email" 
                type="email"
            />
            
            <!-- Password field (required for both modes) -->
            <BaseInput 
                name="password" 
                label="Password" 
                type="password"
            />
            
            <!-- Avatar field (only shown in register mode) -->
            <BaseInput 
                v-if="isRegister" 
                name="avatar" 
                label="Avatar" 
                type="url"
            />
            
            <!-- Submit button with dynamic text and loading state -->
            <BaseButton 
                variant="outline" 
                type="submit" 
                :loading="loading"
            >
                {{ isRegister ? 'Register' : 'Login' }}
            </BaseButton>
        </form>
    </div>
</template>
