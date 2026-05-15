<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useTasksStore } from '../stores/tasks.js';

const route = useRoute();
const tasksStore = useTasksStore();
const removed = ref(false);

onMounted(() => {
    removed.value = tasksStore.remove(route.params.id);
});
</script>

<template>
    <p class="notice">{{ removed ? 'Task deleted' : 'Задача не найдена' }}</p>
    <RouterLink to="/">К списку</RouterLink>
</template>
