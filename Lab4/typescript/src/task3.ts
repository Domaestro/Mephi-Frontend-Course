export {};

type TUser = {
    name: string;
    age: number;
    hello(): void;
};

class UserAlias implements TUser {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    hello(): void {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`);
    }
}

const bob: TUser = new UserAlias('Bob', 30);
bob.hello();
