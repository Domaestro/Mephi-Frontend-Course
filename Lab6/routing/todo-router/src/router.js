import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
import AddView from './views/AddView.vue';
import TaskView from './views/TaskView.vue';
import DeleteView from './views/DeleteView.vue';
import CompleteView from './views/CompleteView.vue';
import AboutView from './views/AboutView.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/add', component: AddView },
    { path: '/task/:id(\\d+)', component: TaskView },
    { path: '/task/:id(\\d+)/delete', component: DeleteView },
    { path: '/task/:id(\\d+)/complete', component: CompleteView },
    { path: '/about', component: AboutView },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
