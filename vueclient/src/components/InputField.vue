<script setup>

const props = defineProps({
    modelValue: String,
    type: String,
    name: String
})


defineEmits(["update:modelValue"])

</script>

<template>
    <input
        :type="type"
        :name="name"
        :id="name"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        />
</template>

<style scoped>

input {
    border: 1px solid black;
}

</style>
