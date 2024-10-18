<script setup>

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useUserDataStore } from "@/stores/userDataStore";
import { useRouter } from 'vue-router';
import InputField from './InputField.vue';
import UserForm from './UserForm.vue';
import { inject } from 'vue';


const apiUrl = inject("apiUrl");

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
    const errorMessage = await store.login(apiUrl, formValues.username, formValues.password, router);
    setFieldError("username", errorMessage);
    setFieldError("password", errorMessage);
});

// maybe add a cache system for tasks?

</script>

<template>
    <UserForm title="Login" :on-submit="onSubmit" submit-button-text="Login">
        <InputField type="text" name="username"  />
        <InputField type="password" name="password"  />
    </UserForm>
</template>

