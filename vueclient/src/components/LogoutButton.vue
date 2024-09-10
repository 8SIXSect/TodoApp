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
    <div class="flex justify-center py-8 mt-24 bg-slate-200 hover:bg-slate-300" @click="logout" role="button">
        <button class="text-2xl font-bold" @click="logout">Log Out</button>
    </div>
</template>

