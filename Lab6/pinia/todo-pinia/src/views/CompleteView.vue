<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useTasksStore } from '../stores/tasks.js';

const route = useRoute();
const tasksStore = useTasksStore();
const changed = ref(false);

onMounted(() => {
    changed.value = tasksStore.toggle(route.params.id);
});
</script>

<template>
    <p class="notice">{{ changed ? 'Task status has been changed' : 'Задача не найдена' }}</p>
    <RouterLink :to="`/task/${$route.params.id}`">К задаче</RouterLink>
    <span> · </span>
    <RouterLink to="/">К списку</RouterLink>
</template>
