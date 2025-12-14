<script setup>


import LoginForm from '../components/user_forms/LoginForm.vue';
import FooterWithInformation from '../components/FooterWithInformation.vue';
import { useUserDataStore } from '../stores/userDataStore';
import Container from "@/components/Container.vue";


const store = useUserDataStore();
store.redirectUserIfAlreadyAuthenticated();

</script>

<template>
    <Container>
        <template #centered-main-content>
            <LoginForm/>
        </template>
        <template #footer>
            <FooterWithInformation/>
        </template>
    </Container>
</template>
