class User {
  constructor(name, age, tel) {
    this.name = name;
    this.age = age;
    this._tel = '';
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

  hello() {
    console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
  }
}

const user_name = prompt('Введите имя');
const age = Number(prompt('Введите возраст'));
const tel = prompt('Введите телефон в формате +7xxxxxxxxxx');
const user = new User(user_name, age, tel);
user.hello();
alert('Телефон пользователя: ' + user.tel + '\nСообщение hello() выведено в консоль.');
