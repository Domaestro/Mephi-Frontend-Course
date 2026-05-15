<script setup>
defineProps({
    open: {
        type: Boolean,
        required: true,
    },
});

defineEmits(['close']);
</script>

<template>
    <Teleport to="#popup-root">
        <div v-if="open" class="overlay" @click.self="$emit('close')">
            <div class="window">
                <slot />
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.window {
    background: white;
    padding: 24px 32px;
    border-radius: 8px;
    min-width: 300px;
    max-width: 480px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
</style>
