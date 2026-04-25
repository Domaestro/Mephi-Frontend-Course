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

class Student extends User {
  #knowledge = 0;

  constructor(name, age, tel) {
    super(name, age, tel);
  }

  get knowledge() {
    return this.#knowledge;
  }

  learn() {
    this.#knowledge += 1;
  }

  hello() {
    console.log(`Hi! My name is ${this.name}. I am ${this.age} years old. And I am a student!`);
  }
}

const user_name = prompt('Введите имя студента');
const age = Number(prompt('Введите возраст студента'));
const tel = prompt('Введите телефон студента в формате +7xxxxxxxxxx');
const student = new Student(user_name, age, tel);
student.hello();

const count = Number(prompt('Сколько раз вызвать learn()?'));

if (Number.isInteger(count) && count > 0) {
  for (let i = 0; i < count; i++) {
    student.learn();
  }
}

alert('Knowledge: ' + student.knowledge + '\nСообщение hello() выведено в консоль.');
