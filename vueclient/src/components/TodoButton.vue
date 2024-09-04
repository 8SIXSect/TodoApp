<script setup>

const props = defineProps([
    "backgroundColor",
    "imageFileName",
    "action",
    "imageAlt"
]);

const divClasses = `${props.backgroundColor} flex items-center justify-center w-8 h-8`;

const getImageURL = () => {
    return new URL(`../assets/${props.imageFileName}`, import.meta.url);
}

</script>

<template>
    <div :class="divClasses" @click="action">
        <img :src="getImageURL()" :alt="imageAlt" class="invert hover:invert-0"/>
    </div>
</template>
