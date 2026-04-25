class User {
  constructor(user_name, age) {
    this.user_name = user_name;
    this.age = age;
  }

  hello() {
    console.log(`Hi! My name is ${this.user_name}. And I am ${this.age} years old.`);
  }
}

const user_name = prompt('Введите имя');
const age = Number(prompt('Введите возраст'));
const user = new User(user_name, age);
user.hello();
alert('Сообщение выведено в консоль. Открой консоль браузера (F12).');
