<script setup>
import Clicker from './components/Clicker.vue';

const clickerCount = 100;

function handleButtonClicked(index) {
    alert(`Clicker ${index} clicked!`);
}
</script>

<template>
    <main class="page">
        <h1>100 кликеров</h1>
        <p class="hint">
            У каждого свой счётчик и независимое состояние. По клику
            родительский компонент показывает alert с номером кликера.
        </p>

        <div class="grid">
            <Clicker
                v-for="n in clickerCount"
                :key="n"
                :amount="n"
                @button-clicked="handleButtonClicked(n)"
            >
                <button type="button" class="custom-button">
                    Кликер {{ n }} (+{{ n }})
                </button>
            </Clicker>
        </div>
    </main>
</template>

<style scoped>
.page {
    font-family: Arial, sans-serif;
    max-width: 1100px;
    margin: 0 auto;
    padding: 24px;
}

.hint {
    color: #555;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 12px;
    margin-top: 16px;
}

.custom-button {
    padding: 6px 12px;
    border: 1px solid #336;
    background: #336;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}

.custom-button:hover {
    background: #224;
}
</style>
