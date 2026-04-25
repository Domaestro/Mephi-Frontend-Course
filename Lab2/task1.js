const STORAGE_KEY = 'task1PageLoadCount';
const oldValue = localStorage.getItem(STORAGE_KEY);
const oldCount = Number(oldValue || 0);
const newCount = oldCount + 1;

localStorage.setItem(STORAGE_KEY, newCount);
alert('Вы открывали эту страницу ' + newCount + ' раз(а).');
