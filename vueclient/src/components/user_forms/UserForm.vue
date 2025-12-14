<script setup>

import SubmitButton from './SubmitButton.vue';

const props = defineProps(["title", "onSubmit", "submitButtonText"])

</script>


<template>
    <div class="h-5/6">
        <form class="flex flex-col items-center gap-y-10 pb-4 border border-solid border-black rounded-lg shadow-xl" @submit="onSubmit">
            <h1 class="text-5xl bg-slate-300 w-full text-center py-2 rounded-t-lg font-light">{{ title }}</h1>
            <slot name="fields"></slot>
            <SubmitButton :text="submitButtonText"/>
        </form>
        <div class="mt-10 text-center">
            <slot name="extraLink"></slot>
        </div>
    </div>
</template>
