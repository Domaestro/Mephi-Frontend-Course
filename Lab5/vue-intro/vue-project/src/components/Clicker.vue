<script setup>
import { ref } from 'vue';

const props = defineProps({
    amount: {
        type: Number,
        default: 1,
    },
});

const emit = defineEmits(['button-clicked']);

const count = ref(0);

function handleClick() {
    count.value += props.amount;
    emit('button-clicked', count.value);
}
</script>

<template>
    <div class="clicker">
        <span class="count">{{ count }}</span>
        <span class="trigger" @click="handleClick">
            <slot>
                <button type="button">+{{ amount }}</button>
            </slot>
        </span>
    </div>
</template>

<style scoped>
.clicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: #fafafa;
    font-family: Arial, sans-serif;
}

.count {
    min-width: 32px;
    text-align: right;
    font-weight: bold;
    color: #336;
}

.trigger {
    cursor: pointer;
    user-select: none;
}
</style>
