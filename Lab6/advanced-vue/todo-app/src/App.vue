<script setup>
import { onMounted, ref, watch } from 'vue';
import Popup from './components/Popup.vue';
import {
    createTodo,
    deleteTodo,
    fetchTodos,
    updateTodo,
} from './api.js';

const STORAGE_KEY = 'lab5-todos';

const tasks = ref(loadFromStorage());
const newTitle = ref('');
const loading = ref(false);
const errorMessage = ref('');
const pendingDelete = ref(null);

function loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

watch(
    tasks,
    (next) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    },
    { deep: true }
);

onMounted(async () => {
    if (tasks.value.length > 0) return;
    loading.value = true;
    try {
        tasks.value = await fetchTodos();
    } catch (error) {
        errorMessage.value = `Не удалось загрузить с сервера: ${error.message}`;
    } finally {
        loading.value = false;
    }
});

async function addTask() {
    const title = newTitle.value.trim();
    if (!title) return;
    loading.value = true;
    errorMessage.value = '';
    try {
        const created = await createTodo(title);
        tasks.value.push({ ...created, id: created.id ?? Date.now() });
        newTitle.value = '';
    } catch (error) {
        errorMessage.value = `Сервер не принял задачу: ${error.message}`;
    } finally {
        loading.value = false;
    }
}

async function toggleTask(task) {
    const updated = { ...task, completed: !task.completed };
    loading.value = true;
    errorMessage.value = '';
    try {
        await updateTodo(updated);
        const index = tasks.value.findIndex((item) => item.id === task.id);
        if (index !== -1) {
            tasks.value[index] = updated;
        }
    } catch (error) {
        errorMessage.value = `Сервер не подтвердил изменение: ${error.message}`;
    } finally {
        loading.value = false;
    }
}

function askDelete(task) {
    pendingDelete.value = task;
}

function cancelDelete() {
    pendingDelete.value = null;
}

async function confirmDelete() {
    const target = pendingDelete.value;
    if (!target) return;
    loading.value = true;
    errorMessage.value = '';
    try {
        await deleteTodo(target.id);
        tasks.value = tasks.value.filter((item) => item.id !== target.id);
        pendingDelete.value = null;
    } catch (error) {
        errorMessage.value = `Сервер отказал в удалении: ${error.message}`;
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <main class="page">
        <h1>ToDo List</h1>

        <form class="add" @submit.prevent="addTask">
            <input
                v-model="newTitle"
                type="text"
                placeholder="New Task"
                :disabled="loading"
            />
            <button type="submit" :disabled="loading || !newTitle.trim()">Add</button>
        </form>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <ul class="list">
            <li v-for="task in tasks" :key="task.id" :class="{ done: task.completed }">
                <label class="row">
                    <input
                        type="checkbox"
                        :checked="task.completed"
                        :disabled="loading"
                        @change="toggleTask(task)"
                    />
                    <span class="title">{{ task.title }}</span>
                </label>
                <button class="trash" :disabled="loading" @click="askDelete(task)">🗑</button>
            </li>
        </ul>

        <Popup :open="!!pendingDelete" @close="cancelDelete">
            <h2>Delete?</h2>
            <p>Please ensure and then confirm!</p>
            <p class="task-name" v-if="pendingDelete">«{{ pendingDelete.title }}»</p>
            <div class="buttons">
                <button class="cancel" @click="cancelDelete">No, cancel!</button>
                <button class="confirm" :disabled="loading" @click="confirmDelete">
                    Yes, delete it!
                </button>
            </div>
        </Popup>
    </main>
</template>

<style scoped>
.page {
    font-family: Arial, sans-serif;
    max-width: 560px;
    margin: 0 auto;
    padding: 24px;
}

.add {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
}

.add input {
    flex: 1;
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.add button {
    padding: 8px 18px;
    background: #2c7be5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.add button:disabled {
    background: #aac4f0;
    cursor: not-allowed;
}

.error {
    color: #b13030;
    background: #fde6e6;
    padding: 8px 12px;
    border-radius: 4px;
}

.list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    border-bottom: 1px solid #eee;
}

.row {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    flex: 1;
}

.list li.done .title {
    text-decoration: line-through;
    color: #999;
}

.trash {
    background: none;
    border: none;
    cursor: pointer;
    color: #d04444;
    font-size: 18px;
}

.buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 18px;
}

.buttons button {
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
}

.cancel {
    background: #d0d0d0;
}

.confirm {
    background: #2c7be5;
    color: white;
}

.task-name {
    color: #666;
    font-style: italic;
}
</style>
