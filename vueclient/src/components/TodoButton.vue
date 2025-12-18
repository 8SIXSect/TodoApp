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
    <div
        class="first:bg-emerald-600 last:bg-red-600 rounded-md px-3 py-2 min-w-[44px] min-h-[40px] flex justify-center items-center cursor-pointer transition-transform duration-150 hover:scale-105 hover:shadow-sm"
        @click="action"
    >
        <img :src="getImageURL()" :alt="imageAlt" class="invert hover:invert-0 w-5 h-5"/>
    </div>
</template>
