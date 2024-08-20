<script setup>
import TodoList from './TodoList.vue';
import LogoutButton from "./LogoutButton.vue";
import { inject } from 'vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useTodoTaskStore } from '../stores/todoTasksStore';


const API_URL = inject("API_URL");

const tasksStore = useTodoTaskStore();
const inputForCreatingTodo = ref(null);
const tasksAreLoading = ref(true);

onMounted(() => {
    sendGetRequestAndUpdateTasks();
    tasksAreLoading.value = false;
});

const sendGetRequestAndUpdateTasks = async () => {
    let response = await fetch(API_URL, {
        method: "GET",
        credentials: "include",
    });

    response.json().then(jsonData => {
        tasksStore.tasks = jsonData;
    });
};

const addTaskOnFormSubmit = async (event) => {
    event.preventDefault();

    // shouldn't have to worry about this being null
    const jsonPayload = {
        description: inputForCreatingTodo.value
    }

    let response = await fetch(API_URL, {
        "headers": {
            "content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(jsonPayload)
    });

    response.json().then(sendGetRequestAndUpdateTasks);

    inputForCreatingTodo.value = "";
};
</script>

<template>
    <div class="m-h-96 flex justify-center items-center">
        <div class="flex flex-col w-1/2">
            <h1 class="text-5xl bg-slate-700 text-slate-100 font-bold text-center py-12 rounded-t-lg">Daily Todo Lists</h1>
            <form class="flex border">
                <input type="text" placeholder="Add your todo"
                       class="grow p-4 text-2xl outline-none" ref="inputForCreatingTodo" />
                <button class="pr-2" type="submit" @click="addTaskOnFormSubmit">
                    <img class="w-12 h-12" src="@/assets/plus.svg" alt="Plus"/>
                </button>
            </form>
            <TodoList :tasks-are-loading="tasksAreLoading" :update-function="sendGetRequestAndUpdateTasks"/>
        </div>
    </div>
    <LogoutButton />
</template>
