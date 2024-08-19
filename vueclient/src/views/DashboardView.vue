<script setup>

import { useRouter } from 'vue-router';
import TodoListContainer from '../components/TodoListContainer.vue';
import { useUserDataStore } from '../stores/userDataStore';

const store = useUserDataStore();

if (!store.isAuthenticated) {
    const router = useRouter();
    router.push({ name: "login" });
}

</script>

<template>
    <TodoListContainer />
</template>
