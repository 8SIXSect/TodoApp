import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';

/**
 * @typedef {Object} User
 * @property {string} username - The user's username.
 * @property {string} email - The user's email address.
 * @property {string} first_name - The user's first name.
 * @property {string} last_name - The user's last name.
 */

export const useUserDataStore = defineStore("userData", {

    state: () => {
        const storedState = localStorage.getItem("useDataState");

        return storedState !== null ? JSON.parse(storedState) : {
            user: null,
            isAuthenticated: false
        }
    },
    actions: {
        saveState() {
            localStorage.setItem("useDataState", JSON.stringify({
                user: this.user,
                isAuthenticated: this.isAuthenticated
            }));
        },
        redirectUserIfAlreadyAuthenticated() {
            if (this.isAuthenticated) {
                const router = useRouter();
                router.push({ name: "dashboard" });
            }
        }
    }
});

