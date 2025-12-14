<script setup>
import TodoListTask from './TodoListTask.vue';
import LogoutButton from "./LogoutButton.vue";
import FooterWithInformation from "./FooterWithInformation.vue";
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
    if (newTodoTask.value.trim() === "") return;

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
    <div class="md:flex md:justify-center md:mt-24 px-4">
        <div class="flex flex-col w-full md:w-1/2">
            <div class="flex flex-col">
                <!-- Card container -->
                <div class="bg-slate-700 text-slate-100 font-bold flex flex-col md:rounded-lg overflow-hidden shadow-md">
                    <div class="flex justify-center py-8 bg-slate-700">
                        <h1 class="text-center text-5xl md:text-4xl max-w-[10ch] md:max-w-[20ch]">
                            {{ userDataStore.user?.username }}'s Tasks
                        </h1>
                    </div>

                    <form class="flex border-t border-slate-600 px-3 sm:px-4 justify-between items-stretch bg-slate-800"
                          @submit.prevent="addTaskOnFormSubmit">
                        <textarea placeholder="Add a task"
                            class="grow outline-none text-2xl px-3 py-4 max-w-task lg:max-w-task-lg resize-none bg-transparent text-slate-100 placeholder-slate-400"
                            rows="2"
                            v-model="newTodoTask"></textarea>

                        <button type="submit" class="ml-3 self-center bg-emerald-500 hover:bg-emerald-600 transition-colors rounded-full p-3 shadow-sm">
                            <img class="w-6 h-6" src="@/assets/plus.svg" alt="Plus"/>
                        </button>
                    </form>

                    <ul class="divide-y divide-slate-700 p-4 bg-slate-800">
                        <TodoListTask
                        v-for="task in tasksStore.tasks"
                        :key="task.id"
                        :task-id="task.id"
                        :description="task.description"
                        :tasks-are-loading="tasksAreLoading"
                        :update-function="sendGetRequestAndUpdateTasks"
                        />
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
