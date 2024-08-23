<script setup>

import { useRouter } from 'vue-router';
import Dashboard from '../components/Dashboard.vue';
import { useUserDataStore } from '../stores/userDataStore';

const store = useUserDataStore();
const router = useRouter();

if (!store.isAuthenticated) {
    router.push({ name: "login" });
}

</script>

<template>
    <Dashboard />
</template>
