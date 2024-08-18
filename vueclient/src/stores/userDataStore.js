import { defineStore } from 'pinia'
import { ref } from 'vue';

/**
 * @typedef {Object} User
 * @property {string} username - The user's username.
 * @property {string} email - The user's email address.
 * @property {string} first_name - The user's first name.
 * @property {string} last_name - The user's last name.
 */

export const useUserDataStore = defineStore("userData", () => {

    /**
        * @type {null | User}
    */ 
    const user = ref(null);
    const isAuthenticated = ref(false);

    return { user, isAuthenticated };
});

