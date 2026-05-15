<script setup>
import { computed } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const passwordRules = [
    { label: 'Длина не менее 8', test: (v) => v.length >= 8 },
    { label: 'Цифры', test: (v) => /\d/.test(v) },
    { label: 'Буквы нижнего регистра', test: (v) => /[a-zа-я]/.test(v) },
    { label: 'Буквы верхнего регистра', test: (v) => /[A-ZА-Я]/.test(v) },
    { label: 'Спецсимволы', test: (v) => /[^\w\s]/.test(v) },
];

function isStrongPassword(value) {
    return passwordRules.every((rule) => rule.test(value ?? ''));
}

const schema = yup.object({
    email: yup.string().required().email(),
    password: yup
        .string()
        .required()
        .test('strength', 'Пароль не удовлетворяет всем критериям', isStrongPassword),
    agree: yup.boolean().oneOf([true], 'Согласие обязательно'),
});

const { defineField, errors, meta, handleSubmit, values } = useForm({
    validationSchema: schema,
    initialValues: { email: '', password: '', agree: false },
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [agree, agreeAttrs] = defineField('agree');

function fieldClass(name) {
    if (!values[name]) return '';
    return errors.value[name] ? 'invalid' : 'valid';
}

const passwordChecks = computed(() =>
    passwordRules.map((rule) => ({
        label: rule.label,
        passed: rule.test(password.value ?? ''),
    })),
);

const onSubmit = handleSubmit((submitted) => {
    alert(`Регистрация: ${submitted.email}`);
});
</script>

<template>
    <main class="page">
        <h1>Регистрация</h1>

        <form @submit="onSubmit" novalidate>
            <label>
                <span>Email</span>
                <input
                    v-model="email"
                    v-bind="emailAttrs"
                    type="email"
                    :class="fieldClass('email')"
                />
            </label>

            <div class="password-row">
                <label class="password-field">
                    <span>Password</span>
                    <input
                        v-model="password"
                        v-bind="passwordAttrs"
                        type="password"
                        :class="fieldClass('password')"
                    />
                </label>

                <ul class="rules">
                    <li
                        v-for="rule in passwordChecks"
                        :key="rule.label"
                        :class="rule.passed ? 'ok' : 'fail'"
                    >
                        {{ rule.label }}
                    </li>
                </ul>
            </div>

            <label class="agree">
                <input
                    v-model="agree"
                    v-bind="agreeAttrs"
                    type="checkbox"
                />
                I agree with license agreement
            </label>

            <button type="submit" :disabled="!meta.valid">Register</button>
        </form>
    </main>
</template>

<style scoped>
.page {
    font-family: Arial, sans-serif;
    max-width: 560px;
    margin: 40px auto;
    padding: 24px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

label {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

input[type='email'],
input[type='password'] {
    padding: 8px 10px;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

input.valid {
    border-color: #2bb673;
}

input.invalid {
    border-color: #d04444;
}

.password-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    align-items: start;
}

.rules {
    list-style: none;
    padding: 0;
    margin: 22px 0 0;
    font-size: 14px;
}

.rules li {
    padding: 2px 0;
}

.rules .ok {
    color: #2bb673;
}

.rules .fail {
    color: #d04444;
}

.agree {
    flex-direction: row;
    align-items: center;
    gap: 8px;
}

button {
    padding: 10px 16px;
    background: #2c7be5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;
}

button:disabled {
    background: #b4cbef;
    cursor: not-allowed;
}
</style>
