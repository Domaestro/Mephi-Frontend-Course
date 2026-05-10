import { fileURLToPath } from 'node:url';
import path from 'node:path';
import dotenv from 'dotenv';

const here = path.dirname(fileURLToPath(import.meta.url));
const profile = process.env.APP_ENV ?? 'local';
const envFile = path.join(here, `.env.${profile}`);

const result = dotenv.config({ path: envFile });
if (result.error) {
    console.error(`Не удалось прочитать ${envFile}:`, result.error.message);
    process.exit(1);
}

console.log(`Активный профиль: ${profile}`);
console.log(`Файл: ${envFile}`);
console.log('Переменные окружения:');
console.log({
    API_URL: process.env.API_URL,
    LOG_LEVEL: process.env.LOG_LEVEL,
    FEATURE_FLAG: process.env.FEATURE_FLAG,
});
