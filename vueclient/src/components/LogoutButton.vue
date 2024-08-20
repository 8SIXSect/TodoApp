<script setup>
import { useUserDataStore } from '../stores/userDataStore';
import { useRouter } from 'vue-router';


const store = useUserDataStore();
const router = useRouter();

const logout = () => {
    store.user = null;
    store.isAuthenticated = false;
    store.saveState();
 
    router.push({ name: "login" });
}

</script>

<template>
    <button @click="logout">Log Out</button>
</template>

