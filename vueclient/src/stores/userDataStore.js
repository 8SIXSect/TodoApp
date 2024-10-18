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
        async setCsrfToken(apiUrl) {
            await fetch(apiUrl('api/set-csrf-token'), {
                method: 'GET',
                credentials: 'include'
            });
        },
        async login(apiUrl, username, password, router) {
            console.log(document.cookie)

            const response = await fetch(apiUrl("login"), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': getCSRFToken()
                },
                body: JSON.stringify({ username, password }),
                mode: "cors",
                credentials: "include"
            });

            const responseData = await response.json();

            // This returns an error msg
            if (!response.ok) {
                return responseData;
            }

            this.user = responseData;
            this.isAuthenticated = true;
            this.saveState()

            router.push({ name: "dashboard" });
        },
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


export function getCSRFToken() {
    /*
    We get the CSRF token from the cookie to include in our requests.
    This is necessary for CSRF protection in Django.
     */
    const name = 'csrftoken';
    let cookieValue = null;

    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    if (cookieValue === null) {
        throw 'Missing CSRF cookie.'
    }
    return cookieValue;
}

