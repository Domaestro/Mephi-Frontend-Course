import { defineStore } from 'pinia';

const STORAGE_KEY = 'lab6-pinia-tasks';
const NEXT_ID_KEY = 'lab6-pinia-next-id';

function loadList() {
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

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        list: loadList(),
        nextId: loadNextId(),
    }),

    getters: {
        findById: (state) => (id) => state.list.find((task) => task.id === Number(id)),
    },

    actions: {
        persist() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.list));
            localStorage.setItem(NEXT_ID_KEY, String(this.nextId));
        },

        add(title) {
            const trimmed = title.trim();
            if (!trimmed) return null;
            const task = { id: this.nextId, title: trimmed, completed: false };
            this.list.push(task);
            this.nextId += 1;
            this.persist();
            return task;
        },

        toggle(id) {
            const task = this.findById(id);
            if (!task) return false;
            task.completed = !task.completed;
            this.persist();
            return true;
        },

        remove(id) {
            const index = this.list.findIndex((task) => task.id === Number(id));
            if (index === -1) return false;
            this.list.splice(index, 1);
            this.persist();
            return true;
        },
    },
});
