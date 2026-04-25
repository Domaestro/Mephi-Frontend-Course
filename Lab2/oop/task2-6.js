const input = prompt('Введите элементы массива через запятую', '1,2,3,4,5');
const arr = input.split(',');

Array.prototype.reverse = function () {
  const copy = [...this];
  this.length = 0;
  this.push(...copy, ...copy);
  return this;
};


const result = arr.reverse();
alert(result.join(','));
