<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useTasks } from '../composables/useTasks.js';

const route = useRoute();
const { findById } = useTasks();
const task = computed(() => findById(route.params.id));
</script>

<template>
    <template v-if="task">
        <h1>Задача #{{ task.id }}</h1>
        <p class="title" :class="{ done: task.completed }">{{ task.title }}</p>
        <p>Статус: {{ task.completed ? 'выполнена' : 'в работе' }}</p>

        <div class="actions">
            <RouterLink :to="`/task/${task.id}/complete`">Переключить статус</RouterLink>
            <RouterLink :to="`/task/${task.id}/delete`">Удалить</RouterLink>
            <RouterLink to="/">К списку</RouterLink>
        </div>
    </template>

    <p v-else>Задача не найдена. <RouterLink to="/">К списку</RouterLink></p>
</template>

<style scoped>
.title {
    font-size: 18px;
    margin: 16px 0;
}

.title.done {
    text-decoration: line-through;
    color: #888;
}

.actions {
    display: flex;
    gap: 12px;
    margin-top: 16px;
}
</style>
