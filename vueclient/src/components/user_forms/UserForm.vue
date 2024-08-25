<script setup>

import SubmitButton from './SubmitButton.vue';

const props = defineProps(["title", "onSubmit", "submitButtonText"])

</script>


<template>
    <div class="flex flex-col justify-center items-center h-screen">
        <div class="h-5/6">
            <form class="flex flex-col items-center gap-y-10 pb-4 border border-solid border-black rounded-lg shadow-xl" @submit="onSubmit">
                <h1 class="text-5xl bg-slate-300 w-full text-center py-2 rounded-t-lg">{{ title }}</h1>

                <slot></slot>

                <SubmitButton :text="submitButtonText"/>
            </form>
        </div>
    </div>
</template>
