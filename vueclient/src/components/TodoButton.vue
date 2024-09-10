<script setup>

const props = defineProps([
    "imageFileName",
    "action",
    "imageAlt"
]);


const getImageURL = () => {
    return new URL(`../assets/${props.imageFileName}`, import.meta.url);
}

</script>

<template>
    <div class="first:bg-green-600 last:bg-red-600 rounded-md  w-14 flex justify-center items-center" @click="action">
        <img :src="getImageURL()" :alt="imageAlt" class="invert hover:invert-0 w-8 h-8"/>
    </div>
</template>

