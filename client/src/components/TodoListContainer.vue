<script>
import TodoList from './TodoList.vue';

export default {
    inject: ["API_URL"],

    components: {
        TodoList
    },

    data() {
        return {
            tasks: [],
        }
    },

    mounted() {
        this.sendGetRequestAndUpdateTasks();
    },
    methods: {
        async sendGetRequestAndUpdateTasks() {
            let response = await fetch(this.API_URL)
            response.json().then(jsonData => {
                this.tasks = jsonData;
            });
        },
        async addTaskOnFormSubmit(event) {
            event.preventDefault();

            const inputForCreatingTodo = document.querySelector("#input-for-creating-todo");
            const jsonPayload = {
                description: inputForCreatingTodo.value
            }

            let response = await fetch(this.API_URL, {
                "headers": {
                    "content-type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(jsonPayload)
            });

            response.json().then(this.sendGetRequestAndUpdateTasks);

            inputForCreatingTodo.value = "";
        }
    }
}

</script>

<template>
    <div class="m-h-96 flex justify-center items-center">
        <div class="flex flex-col w-1/2">
            <h1 class="text-5xl bg-slate-700 text-slate-100 font-bold text-center py-12 rounded-t-lg">Daily Todo Lists</h1>
            <form class="flex border">
                <input type="text" placeholder="Add your todo"
                       class="grow p-4 text-2xl outline-none" id="input-for-creating-todo"/>
                <button class="pr-2" type="submit" @click="addTaskOnFormSubmit">
                    <img class="w-12 h-12" src="@/assets/plus.svg" alt="Plus"/>
                </button>
            </form>
            <TodoList :tasks="tasks" :update-function="sendGetRequestAndUpdateTasks"/>
        </div>
    </div>
</template>
