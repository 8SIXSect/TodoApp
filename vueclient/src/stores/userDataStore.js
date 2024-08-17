import { defineStore } from 'pinia'


export const useUserDataStore = defineStore("userData", {
    state: () => {
        return {
            user: null,
            isAuthenticated: false
        }
    }
});

