<script setup>


import LoginFields from '../components/LoginFields.vue';
import { useUserDataStore } from '../stores/userDataStore';


const store = useUserDataStore();
store.redirectUserIfAlreadyAuthenticated();

</script>

<template>
    <LoginFields />
</template>
