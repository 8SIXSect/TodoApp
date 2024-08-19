<script setup>
import { useUserDataStore } from '../stores/userDataStore';


const store = useUserDataStore();

const logout = () => {
    store.user = null;
    store.isAuthenticated = false;
    store.saveState();
}

</script>

<template>
    <button @click="logout">Log Out</button>
</template>

