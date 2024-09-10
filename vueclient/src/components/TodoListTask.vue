<script setup>

import { ref, inject } from 'vue';
import { getCSRFToken } from '../stores/userDataStore';
import TodoButton from "@/components/TodoButton.vue";


const apiUrl = inject("apiUrl");
const props = defineProps(["tasksAreLoading", "taskId", "description", "updateFunction"]);

const taskInput = ref(props.description);
const valueBeforeEditing = ref("");
const readOnly = ref(true);
const taskContainerClasses = ref([
    "py-8",
    "bg-emerald-500",
    "flex",
    "justify-evenly",
    "items-center",
    "text-white",
]);

const deleteTask = async () => {

    await fetch(apiUrl("tasks/"), {
        "headers": {
            "content-type": "application/json",
            "X-CSRFToken": getCSRFToken()
        },
        method: "DELETE",
        body: JSON.stringify({ id: props.taskId }),
        credentials: "include"
    });
    
    props.updateFunction();
};


/**
    * If the input is editable, then this will make the input background darker
    * Also, this function flips the value of readonly ()
*/
const flipContainerClasses = () => {
    const lighterColor = "bg-emerald-500";
    const darkerColor = "bg-emerald-700";
    const removeColor = (color) => {
        taskContainerClasses.value = taskContainerClasses.value
            .filter(cls => cls != color);
    }

    if (readOnly.value) {
        readOnly.value = false;

        removeColor(lighterColor);
        taskContainerClasses.value.push(darkerColor);
        return;
    }

    readOnly.value = true;
    removeColor(darkerColor);
    taskContainerClasses.value.push(lighterColor);
}


const editTask = async () => {
    if (readOnly.value) {
        flipContainerClasses();
        valueBeforeEditing.value = taskInput.value.slice(0);
        return;
    }

    // When readOnly is already false, confirm changes
    revertEditedTask();
};


const revertEditedTask = async () => {
    if (!readOnly.value) {

        flipContainerClasses();

        // Prevents sending unnecessary requests if value is unchanged
        if (valueBeforeEditing.value === taskInput.value) return;

        await fetch(apiUrl("tasks/"), {
            headers: {
                "content-type": "application/json",
                "X-CSRFToken": getCSRFToken()
            },
            method: "PATCH",
            body: JSON.stringify({
                id: props.taskId,
                new_description: taskInput.value
            }),
            credentials: "include"
        });

        props.updateFunction();
    }
}

</script>

<template>
    <li :class="taskContainerClasses.join(' ')">
        <textarea
            class="border-0 bg-transparent outline-none font-semibold max-w-task text-2xl"
            v-model="taskInput"
            v-on:keydown.enter="revertEditedTask"
            :readonly="readOnly"
            ></textarea>
        <span class="flex h-20 gap-1">
            <TodoButton image-file-name="edit.png" :action="editTask" image-alt="Edit" />
            <TodoButton image-file-name="delete.png" :action="deleteTask" image-alt="Delete" />
        </span>
    </li>
</template>
