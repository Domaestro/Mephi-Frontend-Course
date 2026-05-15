import { ref, watch } from 'vue';

const STORAGE_KEY = 'lab6-routing-tasks';
const NEXT_ID_KEY = 'lab6-routing-next-id';

function loadTasks() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
        return [];
    }
}

function loadNextId() {
    const stored = Number(localStorage.getItem(NEXT_ID_KEY));
    return Number.isFinite(stored) && stored > 0 ? stored : 1;
}

const tasks = ref(loadTasks());
const nextId = ref(loadNextId());

watch(tasks, (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}, { deep: true });

watch(nextId, (value) => {
    localStorage.setItem(NEXT_ID_KEY, String(value));
});

export function useTasks() {
    function add(title) {
        const trimmed = title.trim();
        if (!trimmed) return null;
        const task = { id: nextId.value, title: trimmed, completed: false };
        tasks.value.push(task);
        nextId.value += 1;
        return task;
    }

    function findById(id) {
        return tasks.value.find((task) => task.id === Number(id));
    }

    function toggle(id) {
        const task = findById(id);
        if (!task) return false;
        task.completed = !task.completed;
        return true;
    }

    function remove(id) {
        const index = tasks.value.findIndex((task) => task.id === Number(id));
        if (index === -1) return false;
        tasks.value.splice(index, 1);
        return true;
    }

    return { tasks, add, findById, toggle, remove };
}
