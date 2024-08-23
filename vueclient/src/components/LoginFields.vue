<script setup>

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useUserDataStore } from "../stores/userDataStore";
import { useRouter } from 'vue-router';


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


const { defineField, errors, setFieldError, handleSubmit } = useForm({
    validationSchema: validationSchema 
});

const [username, usernameAttrs] = defineField("username");
const [password, passwordAttrs] = defineField("password");


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


</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <form class="flex flex-col items-center gap-y-10 h-2/3" @submit="onSubmit">
            <div>
                <input type="text" id="username" name="username" v-model="username" v-bind="usernameAttrs" />
                <p id="usernameErrors">{{ errors.username }}</p>
            </div>
            <div>
                <input type="password" id="password" name="password" v-model="password" v-bind="passwordAttrs" />
                <p id="passwordErrors">{{ errors.password }}</p>
            </div>

            <button class="border border-solid border-black rounded-md w-24 hover:bg-gray-200">Submit</button>
        </form>
    </div>
</template>

<style scoped>

input {
    border: 1px solid black;

    /*
        if you add binding, then make it length + 4ch
     */
    width: 20ch;
}

p {
    color: red;

    /*
        Add the binding for this one too
    */
    max-width: 20ch;
}


</style>
