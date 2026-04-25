class User {
  #age = 1;

  constructor(name, age, tel) {
    this.name = name;
    this._tel = '';
    this.age = age;
    this.tel = tel;
  }

  get tel() {
    return this._tel;
  }

  set tel(value) {
    const phonePattern = /^\+7\d{10}$/;

    if (phonePattern.test(value)) {
      this._tel = value;
    } else {
      alert('Телефон должен быть в формате +7xxxxxxxxxx');
    }
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    if (Number.isInteger(value) && value >= 1 && value <= 100) {
      this.#age = value;
    } else {
      alert('Возраст должен быть целым числом от 1 до 100');
    }
  }

  hello() {
    console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
  }
}

const name = prompt('Введите имя');
const age = Number(prompt('Введите возраст'));
const tel = prompt('Введите телефон в формате +7xxxxxxxxxx');
const user = new User(name, age, tel);
user.hello();
alert('Возраст: ' + user.age + '\nТелефон: ' + user.tel + '\nСообщение hello() выведено в консоль.');
