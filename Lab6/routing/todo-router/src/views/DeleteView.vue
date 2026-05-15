<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useTasks } from '../composables/useTasks.js';

const route = useRoute();
const { remove } = useTasks();
const removed = ref(false);

onMounted(() => {
    removed.value = remove(route.params.id);
});
</script>

<template>
    <p class="notice">{{ removed ? 'Task deleted' : 'Задача не найдена' }}</p>
    <RouterLink to="/">К списку</RouterLink>
</template>
