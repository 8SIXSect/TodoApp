<script setup>

const props = defineProps([
    "backgroundColor",
    "imageFileName",
    "action",
    "imageAlt"
]);

const divClasses = `${props.backgroundColor} w-16 h-16 flex items-center justify-center`;

const getImageURL = () => {
    return new URL(`../assets/${props.imageFileName}`, import.meta.url);
}

</script>

<template>
    <div :class="divClasses" @click="action">
        <img :src="getImageURL()" :alt="imageAlt" class="h-8 w-8 invert hover:invert-0"/>
    </div>
</template>
