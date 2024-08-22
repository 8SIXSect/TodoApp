<script setup>

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useRouter } from 'vue-router';

const router = useRouter();


/**
    * Regex pattern that matches only alphabetic characters
*/
const alphaCharsPattern = /^[A-Za-z]+$/;


/**
    * Regex pattern that matches only ASCII characters that can be printed/typed
    * from the keyboard
*/
const keyboardCharsPattern = /^[ -~]+$/;


/**
    * Zod validation schema for the signup form
*/
const validationSchema = toTypedSchema(z.object({
    email: z.string().min(1).email(),
    username: z.string().min(3).regex(alphaCharsPattern, {
        message: "Username may only contain alphabetic characters"
    }),
    password: z.string().min(8).regex(keyboardCharsPattern, {
        message: "Password may only contain keyboard printable characters"
    })
}));

const { defineField, errors, setFieldError, handleSubmit } = useForm({
    validationSchema: validationSchema 
});

const [email, emailAttrs] = defineField("email");
const [username, usernameAttrs] = defineField("username");
const [password, passwordAttrs] = defineField("password");


/**
    * Handles signup form submission & API calls

    * @param {Object} formValues User's validated input
    * @param {string} formValues.email User's Email
    * @param {string} formValues.username User's Username
    * @param {string} formValues.password User's Password

    * @return {void}
*/
const onSubmit = handleSubmit(async formValues => {
    try {
        const response = await fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValues),
            mode: "cors"
        });

        if (response.ok) {
            router.push({ name: "login" });
            return;
        }

        const data = await response.json();
       
        if (data.username !== undefined) {
            setFieldError("username", data.username);
        }

        if (data.email !== undefined) {
            setFieldError("email", data.email);
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <div class="h-2/3 w-1/2">
            <form class="flex flex-col" @submit="onSubmit">
                <input type="text" id="email" name="email" v-model="email" v-bind="emailAttrs" />
                <p id="emailErrors">{{ errors.email }}</p>

                <input type="text" id="username" name="username" v-model="username" v-bind="usernameAttrs" />
                <p id="usernameErrors">{{ errors.username }}</p>

                <input type="password" id="password" name="password" v-model="password" v-bind="passwordAttrs" />
                <p id="passwordErrors">{{ errors.password }}</p>

                <button>Submit</button>
            </form>
        </div>
    </div>
</template>

<style scoped>

input {
    border: 1px solid black;
}

p {
    color: red;
}

</style>

