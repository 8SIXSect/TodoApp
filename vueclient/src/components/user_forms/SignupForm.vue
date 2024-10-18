<script setup>

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useRouter } from 'vue-router';
import InputField from "./InputField.vue";
import UserForm from '@/components/user_forms/UserForm.vue';
import { inject } from 'vue';


const apiUrl = inject("apiUrl");
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
    email: z.string().min(1).max(32).email(),
    username: z.string().min(3).max(16).regex(alphaCharsPattern, {
        message: "Username may only contain alphabetic characters"
    }),
    password: z.string().min(8).regex(keyboardCharsPattern, {
        message: "Password may only contain keyboard printable characters"
    })
}));

const { setFieldError, handleSubmit } = useForm({
    validationSchema: validationSchema 
});

/**
    * Handles signup form submission & API calls

    * @param {Object} formValues User's validated input
    * @param {string} formValues.email User's Email
    * @param {string} formValues.username User's Username
    * @param {string} formValues.password User's Password

    * @return {void}
*/
const onSubmit = handleSubmit(async formValues => {
    
    const response = await fetch(apiUrl("register"), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
        mode: "cors",
        
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

});

</script>

<template>
    <UserForm title="Sign Up" :on-submit="onSubmit" submit-button-text="Sign Up">
        <InputField type="text" name="email" />
        <InputField type="text" name="username"  />
        <InputField type="password" name="password"  />
    </UserForm>
</template>

