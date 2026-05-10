import axios from 'axios';

const target = 'https://vk.com';

try {
    const response = await axios.get(target);
    console.log('Статус ответа:', response.status);
    console.log('Заголовки ответа:');
    console.log(response.headers);
    console.log('\nДлина тела ответа:', response.data.length, 'символов');
    console.log('Первые 200 символов:\n', response.data.slice(0, 200));
} catch (error) {
    console.error('Ошибка запроса:', error.message);
}
