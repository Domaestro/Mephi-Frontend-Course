import axios from 'axios';

const client = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 8000,
});

const userId = 1;

export async function fetchTodos() {
    const { data } = await client.get('/todos', { params: { userId, _limit: 5 } });
    return data;
}

export async function createTodo(title) {
    const { data } = await client.post('/todos', {
        userId,
        title,
        completed: false,
    });
    return data;
}

export async function updateTodo(todo) {
    const { data } = await client.put(`/todos/${todo.id}`, todo);
    return data;
}

export async function deleteTodo(id) {
    await client.delete(`/todos/${id}`);
    return id;
}
