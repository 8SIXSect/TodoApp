<script setup>
import { useField } from 'vee-validate';



const props = defineProps({
    type: String,
    name: String,
});

const { value, errorMessage } = useField(() => props.name);

</script>

<template>
    <div>
        <input
            :type="type"
            :name="name"
            :id="name"
            v-model="value"
            />
        <p>{{ errorMessage }}</p>
    </div>
</template>

<style scoped>

input {
    border: 1px solid black;
}

p {
    color: red;
}


</style>
