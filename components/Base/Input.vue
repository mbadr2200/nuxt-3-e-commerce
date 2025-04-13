<script setup lang="ts">
const props = defineProps({
    label:{
        type: String,
    },
    name:{
        type: String,
        required: true
    },
    inputOnly: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: [String,Number,Array],
        default: ''
    },

})
defineOptions({
    inheritAttrs: false
})

const {value,errorMessage} = useField(() =>props.name,undefined,{
    syncVModel: true,
})
</script>

<template>
    <div class="flex flex-col gap-2 w-full">   
        <label v-if="!inputOnly" :for="label" class="text-sm font-medium text-gray-700">{{ label }}</label>
        <input v-bind="$attrs" :id="label" :name="label" :placeholder="label" v-model="value" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:primary focus:border-primary sm:text-sm" 
        :class="{'!border-danger': errorMessage}"
        />
        <p class="text-danger text-sm">{{ errorMessage }}</p>
    </div>
</template>