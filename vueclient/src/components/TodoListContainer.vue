<script setup>
import TodoList from './TodoList.vue';
import LogoutButton from "./LogoutButton.vue";
import { inject } from 'vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useTodoTaskStore } from '../stores/todoTasksStore';
import { getCSRFToken } from '../stores/userDataStore';


const API_URL = inject("API_URL");

const tasksStore = useTodoTaskStore();

const newTodoTask = ref("");
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


const addTaskOnFormSubmit = async () => {

    const jsonPayload = {
        description: newTodoTask.value
    }

    await fetch(API_URL, {
        "headers": {
            "content-type": "application/json",
            "X-CSRFToken": getCSRFToken()
        },
        method: "POST",
        body: JSON.stringify(jsonPayload),
        credentials: "include"
    }).then(sendGetRequestAndUpdateTasks);

    newTodoTask.value = "";
};
</script>

<template>
    <div class="m-h-96 flex justify-center items-center">
        <div class="flex flex-col w-1/2">
            <h1 class="text-5xl bg-slate-700 text-slate-100 font-bold text-center py-12 rounded-t-lg">Daily Todo Lists</h1>
            <form class="flex border" @submit.prevent="addTaskOnFormSubmit">
                <input type="text" placeholder="Add your todo"
                       class="grow p-4 text-2xl outline-none" v-model="newTodoTask" />
                <button class="pr-2" type="submit">
                    <img class="w-12 h-12" src="@/assets/plus.svg" alt="Plus"/>
                </button>
            </form>
            <TodoList :tasks-are-loading="tasksAreLoading" :update-function="sendGetRequestAndUpdateTasks"/>
        </div>
    </div>
    <LogoutButton />
</template>
