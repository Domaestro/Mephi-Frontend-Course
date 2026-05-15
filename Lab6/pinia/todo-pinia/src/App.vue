<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <header class="nav">
        <RouterLink to="/">Tasks</RouterLink>
        <RouterLink to="/add">Add</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </header>

    <main class="page">
        <RouterView />
    </main>
</template>

<style>
body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f7f7f7;
}

.nav {
    background: #2c7be5;
    padding: 12px 24px;
    display: flex;
    gap: 16px;
}

.nav a {
    color: white;
    text-decoration: none;
    font-weight: bold;
}

.nav a.router-link-exact-active {
    text-decoration: underline;
}

.page {
    max-width: 600px;
    margin: 24px auto;
    padding: 24px;
    background: white;
    border-radius: 6px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.notice {
    padding: 10px 14px;
    background: #e8f4ff;
    border: 1px solid #b3d4f8;
    border-radius: 4px;
    margin-bottom: 16px;
}
</style>
