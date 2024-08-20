import { defineStore } from "pinia";

export const useTodoTaskStore = defineStore("todoTask", {
    state: () => {
        return {
            tasks: []
        };
    }
});
