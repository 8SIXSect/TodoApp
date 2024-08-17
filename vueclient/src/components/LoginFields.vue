<script setup>

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useUserDataStore } from "../stores/userDataStore";


const store = useUserDataStore();


/**
    * Regex pattern that matches only alphabetic characters
*/
const alphaCharsPattern = /^[A-Za-z]+$/;


/**
    * Zod validation schema for the login fields
*/
const validationSchema = toTypedSchema(z.object({
    username: z.string().min(3).regex(alphaCharsPattern, {
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
    * @param {string} formValues.email User's Email
    * @param {string} formValues.password User's Password

    * @return {void}
*/
const onSubmit = handleSubmit(async formValues => {
    try {

        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
            mode: "cors"
        });

        const data = await response.json();

        if (!response.ok) {
            setFieldError("username", data);
            setFieldError("password", data);
            return;
        }

        // Add a redirct here
        console.log(data, store.user, store.isAuthenticated);
        alert("Welcome! " + data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});


</script>

<template>
    <form class="flex flex-col" @submit="onSubmit">
        <input type="text" name="username" v-model="username" v-bind="usernameAttrs" />
        <p>{{ errors.username }}</p>

        <input type="password" name="password" v-model="password" v-bind="passwordAttrs" />
        <p>{{ errors.password }}</p>

        <button>Submit</button>
    </form>
</template>

<style scoped>

input {
    border: 1px solid black;
}

p {
    color: red;
}


</style>
