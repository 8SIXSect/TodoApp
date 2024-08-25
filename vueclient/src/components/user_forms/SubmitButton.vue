<script setup>

const props = defineProps({
    text: String
});

</script>

<template>
    <button
        type="submit"
        class="border border-solid border-black rounded-md w-24 hover:bg-gray-200"
        >{{ text }}</button>
</template>
