<script setup>
import TodoListTask from './TodoListTask.vue';
import LogoutButton from "./LogoutButton.vue";
import { inject } from 'vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useTodoTaskStore } from '../stores/todoTasksStore';
import { getCSRFToken, useUserDataStore } from '../stores/userDataStore';


const apiUrl = inject("apiUrl");
const urlToTasks = apiUrl("tasks/");

const userDataStore = useUserDataStore();
const tasksStore = useTodoTaskStore();

const newTodoTask = ref("");
const tasksAreLoading = ref(true);

onMounted(() => {
    sendGetRequestAndUpdateTasks();
    tasksAreLoading.value = false;
});


const sendGetRequestAndUpdateTasks = async () => {
    let response = await fetch(urlToTasks, {
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

    await fetch(urlToTasks, {
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
    <div class="flex flex-col w-full">
        <div class="flex flex-col">
            <div class="bg-slate-700 text-slate-100 font-bold flex justify-center py-8">
                <h1 class="text-center text-6xl max-w-[10ch]">
                    {{ userDataStore.user?.username }}'s Tasks
                </h1>
            </div>
            <form class="flex border" @submit.prevent="addTaskOnFormSubmit">
                <textarea placeholder="Add a task"
                       class="grow outline-none text-3xl px-3 py-6 max-w-task resize-none"
                       rows="2"
                       v-model="newTodoTask"></textarea>
                <button class="" type="submit">
                    <img class="w-12 h-12" src="@/assets/plus.svg" alt="Plus"/>
                </button>
            </form>
            <ul>
                <TodoListTask
                    v-for="task in tasksStore.tasks"
                    :task-id="task.id"
                    :description="task.description"
                    :tasks-are-loading="tasksAreLoading"
                    :update-function="sendGetRequestAndUpdateTasks"
                    />
            </ul>
        </div>
    </div>
    <LogoutButton />
</template>

