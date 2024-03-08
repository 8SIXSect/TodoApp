<script>


export default {
    props: ["tasks", "updateFunction"],
    inject: ["API_URL"],
    data() {
        return {
            tasksAreLoading: true,
        }
    },
    watch: {
        tasks() {
            this.tasksAreLoading = false;
        }
    },
    methods: {
        async deleteTask(taskId) {
            const jsonPayload = {
                id: taskId
            };


            await fetch(this.API_URL, {
                "headers": {
                    "content-type": "application/json"
                },
                method: "DELETE",
                body: JSON.stringify(jsonPayload)
            });
            
            this.updateFunction();
        },
        async editTask(taskId) {
            const taskInput = document.getElementById(`task-${taskId}`);

            if (taskInput.readOnly) {
                taskInput.readOnly = false;

                const taskContainer = taskInput.parentElement;
                taskContainer.classList.remove("bg-emerald-500");
                taskContainer.classList.add("bg-emerald-700");
                return;
            }

            // When readOnly is already false, confirm changes
            this.revertEditedTask(taskId);
        },
        async revertEditedTask(taskId) {
            const taskInput = document.getElementById(`task-${taskId}`);
            if (!taskInput.readOnly) {

                taskInput.readOnly = true;

                const taskContainer = taskInput.parentElement;
                taskContainer.classList.remove("bg-emerald-700");
                taskContainer.classList.add("bg-emerald-500");

                const jsonPayload = {
                    id: taskId,
                    new_description: taskInput.value
                };

                await fetch(this.API_URL, {
                    headers: {
                        "content-type": "application/json"
                    },
                    method: "PATCH",
                    body: JSON.stringify(jsonPayload)
                });

            }
        }
    }
}

</script>

<template>
    <template v-if="tasksAreLoading">
        <h1>loading...</h1>
    </template>
    <template v-else>
        <ul>
            <li class="p-8 bg-emerald-500 flex items-center text-white" v-for="task in tasks" :key="task.id">
                <input class="border-0 bg-transparent outline-none text-4xl font-semibold grow" readonly :value="task.description"
                       :id="`task-${task.id}`" v-on:keydown.enter="revertEditedTask(task.id)"/>
                <span class="flex">
                    <div class="bg-green-600 w-16 h-16 flex items-center justify-center" @click="editTask(task.id)">
                        <img src="@/assets/edit.png" alt="Edit" class="h-8 w-8 invert hover:invert-0"/>
                    </div>
                    <div class="bg-red-600 w-16 h-16 flex items-center justify-center" @click="deleteTask(task.id)">
                        <img src="@/assets/delete.png" alt="Delete" class="h-8 w-8 invert hover:invert-0"/>
                    </div>
                </span>
            </li>
        </ul>
    </template>
</template>
