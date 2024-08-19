<script setup>

import SignupButton from "../components/SignupButton.vue";
import { useUserDataStore } from "../stores/userDataStore";

const store = useUserDataStore();
store.redirectUserIfAlreadyAuthenticated();

</script>
<template>
    <SignupButton />
</template>

