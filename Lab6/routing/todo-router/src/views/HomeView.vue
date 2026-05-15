<script setup>
import { RouterLink } from 'vue-router';
import { useTasks } from '../composables/useTasks.js';

const { tasks } = useTasks();
</script>

<template>
    <h1>Список задач</h1>

    <p v-if="tasks.length === 0">Задач пока нет. <RouterLink to="/add">Добавить</RouterLink></p>

    <ul class="list">
        <li v-for="task in tasks" :key="task.id" :class="{ done: task.completed }">
            <RouterLink :to="`/task/${task.id}`" class="title">
                #{{ task.id }} — {{ task.title }}
            </RouterLink>
            <span class="actions">
                <RouterLink :to="`/task/${task.id}/complete`">✓</RouterLink>
                <RouterLink :to="`/task/${task.id}/delete`">🗑</RouterLink>
            </span>
        </li>
    </ul>
</template>

<style scoped>
.list {
    list-style: none;
    padding: 0;
}

.list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
}

.list li.done .title {
    text-decoration: line-through;
    color: #888;
}

.title {
    color: #222;
    text-decoration: none;
}

.actions {
    display: flex;
    gap: 10px;
}

.actions a {
    text-decoration: none;
    font-size: 18px;
}
</style>
