<script setup>

import SignupForm from "../components/user_forms/SignupForm.vue";
import FooterWithInformation from '../components/FooterWithInformation.vue';
import { useUserDataStore } from "../stores/userDataStore";

const store = useUserDataStore();
store.redirectUserIfAlreadyAuthenticated();

</script>
<template>
    <SignupForm />
    <FooterWithInformation />
</template>

