import axios from 'axios';

const target = 'https://json.geoiplookup.io/';

try {
    const response = await axios.get(target);
    console.log('Статус ответа:', response.status);
    console.log('Тип ответа:', response.headers['content-type']);
    console.log('CORS-заголовок:', response.headers['access-control-allow-origin'] ?? '— отсутствует');
    console.log('\nДанные:');
    console.log(JSON.stringify(response.data, null, 2));
} catch (error) {
    console.error('Ошибка запроса:', error.message);
}
