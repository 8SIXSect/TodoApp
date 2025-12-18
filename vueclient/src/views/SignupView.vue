<script setup>

import SignupForm from "../components/user_forms/SignupForm.vue";
import FooterWithInformation from '../components/FooterWithInformation.vue';
import { useUserDataStore } from "../stores/userDataStore";
import Container from "@/components/Container.vue";

const store = useUserDataStore();
store.redirectUserIfAlreadyAuthenticated();

</script>
<template>
    <Container>
        <template #centered-main-content>
            <SignupForm/>
        </template>
        <template #footer>
            <FooterWithInformation />
        </template>
    </Container>
</template>

