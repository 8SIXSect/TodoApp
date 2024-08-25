<script setup>
import { useField } from 'vee-validate';
import { computed } from 'vue';



const props = defineProps({
    type: String,
    name: String,
});

const { value, errorMessage } = useField(() => props.name);


/**
    * A computed ref containing the `name` prop with its first letter is capitalized.
*/
const capitalizedName = computed(() => props.name[0].toUpperCase() + props.name.slice(1));

</script>

<template>
    <div class="mx-6">
        <h3 class="text-md">{{ capitalizedName }}</h3>
        <input
            :type="type"
            :name="name"
            :id="name"
            v-model="value"
            class="p-2 rounded-md outline-none"
            />
        <p>{{ errorMessage }}</p>
    </div>
</template>

<style scoped>

input {
    border: 1px solid black;

    /*
        if you add binding, then make it length + 4ch
     */
    width: 30ch;
}

p {
    color: red;

    /*
        Add the binding for this one too
    */
    max-width: 20ch;
}


</style>
