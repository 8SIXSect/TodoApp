<script setup>


import LoginForm from '../components/user_forms/LoginForm.vue';
import { useUserDataStore } from '../stores/userDataStore';


const store = useUserDataStore();
store.redirectUserIfAlreadyAuthenticated();

</script>

<template>
    <LoginForm />
</template>
