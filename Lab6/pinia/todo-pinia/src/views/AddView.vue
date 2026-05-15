<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTasksStore } from '../stores/tasks.js';

const router = useRouter();
const tasksStore = useTasksStore();
const title = ref('');

function submit() {
    const task = tasksStore.add(title.value);
    if (task) router.push(`/task/${task.id}`);
}
</script>

<template>
    <h1>Новая задача</h1>

    <form @submit.prevent="submit" class="form">
        <input v-model="title" placeholder="Описание задачи" />
        <button type="submit" :disabled="!title.trim()">Добавить</button>
    </form>
</template>

<style scoped>
.form {
    display: flex;
    gap: 10px;
}

input {
    flex: 1;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    padding: 8px 18px;
    background: #2c7be5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:disabled {
    background: #b4cbef;
    cursor: not-allowed;
}
</style>
