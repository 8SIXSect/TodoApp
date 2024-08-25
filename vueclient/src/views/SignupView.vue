<script setup>

import SignupForm from "../components/SignupForm.vue";
import { useUserDataStore } from "../stores/userDataStore";

const store = useUserDataStore();
store.redirectUserIfAlreadyAuthenticated();

</script>
<template>
    <SignupForm />
</template>

