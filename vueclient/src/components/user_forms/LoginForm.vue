<script setup>

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useUserDataStore } from "@/stores/userDataStore";
import { useRouter } from 'vue-router';
import InputField from './InputField.vue';
import SubmitButton from "@/components/user_forms/SubmitButton.vue";


const store = useUserDataStore();
const router = useRouter();


/**
    * Regex pattern that matches only alphabetic characters
*/
const alphaCharsPattern = /^[A-Za-z]+$/;


/**
    * Zod validation schema for the login fields
*/
const validationSchema = toTypedSchema(z.object({
    username: z.string().min(3).max(16).regex(alphaCharsPattern, {
        message: "Username may only contain alphabetic characters"
    }),
    password: z.string().min(8)
}));


const { setFieldError, handleSubmit } = useForm({
    validationSchema: validationSchema 
});


/**
    * Handles login form submission & API calls

    * @param {Object} formValues User's validated input
    * @param {string} formValues.username User's Username 
    * @param {string} formValues.password User's Password

    * @return {void}
*/
const onSubmit = handleSubmit(async formValues => {
    const errorMessage = await store.login(formValues.username, formValues.password, router);
    setFieldError("username", errorMessage);
    setFieldError("password", errorMessage);
});

// maybe add a cache system for tasks?

</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen">
        <div class="h-5/6">
            <form class="flex flex-col items-center gap-y-10 pb-4 border border-solid border-black rounded-lg shadow-xl" @submit="onSubmit">
                <h1 class="text-5xl bg-slate-300 w-full text-center py-2 rounded-t-lg">Login</h1>
                <InputField type="text" name="username"  />
                <InputField type="password" name="password"  />

                <SubmitButton text="Login"/>
            </form>
        </div>
    </div>
</template>

