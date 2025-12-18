<script setup>

import { useRouter } from 'vue-router';
import Dashboard from '../components/Dashboard.vue';
import { useUserDataStore } from '../stores/userDataStore';
import Container from "@/components/Container.vue";
import FooterWithInformation from "@/components/FooterWithInformation.vue";
import LogoutButton from "@/components/LogoutButton.vue";

const store = useUserDataStore();
const router = useRouter();

if (!store.isAuthenticated) {
    router.push({ name: "login" });
}

</script>

<template>
    <Container>
        <template #uncentered-main-content>
            <Dashboard/>
        </template>

        <template #footer>
            <LogoutButton/>
            <FooterWithInformation/>
        </template>
        <Dashboard/>
    </Container>
</template>
