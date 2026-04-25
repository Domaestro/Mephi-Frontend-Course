export {};

class CelsiusSensor {
    read(): number {
        return 25;
    }
}

interface FahrenheitSensor {
    readF(): number;
}

class CelsiusToFahrenheitAdapter implements FahrenheitSensor {
    private readonly source: CelsiusSensor;

    constructor(source: CelsiusSensor) {
        this.source = source;
    }

    readF(): number {
        return (this.source.read() * 9) / 5 + 32;
    }
}

const celsius = new CelsiusSensor();
const fahrenheit: FahrenheitSensor = new CelsiusToFahrenheitAdapter(celsius);
console.log('=== Adapter ===');
console.log(`По цельсию: ${celsius.read()} °C`);
console.log(`По фаренгейту: ${fahrenheit.readF()} °F`);


interface PriceStrategy {
    calculate(base: number): number;
}

class RegularPrice implements PriceStrategy {
    calculate(base: number): number {
        return base;
    }
}

class HolidayDiscount implements PriceStrategy {
    calculate(base: number): number {
        return base * 0.8;
    }
}

class VipDiscount implements PriceStrategy {
    calculate(base: number): number {
        return base * 0.5;
    }
}

class Cart {
    private strategy: PriceStrategy;

    constructor(strategy: PriceStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: PriceStrategy): void {
        this.strategy = strategy;
    }

    total(items: number[]): number {
        const sum = items.reduce((acc, value) => acc + value, 0);
        return this.strategy.calculate(sum);
    }
}

console.log('\n=== Strategy ===');
const cart = new Cart(new RegularPrice());
const goods = [100, 200, 300];
console.log(`Обычная цена: ${cart.total(goods)}`);
cart.setStrategy(new HolidayDiscount());
console.log(`Праздничная скидка: ${cart.total(goods)}`);
cart.setStrategy(new VipDiscount());
console.log(`VIP-скидка: ${cart.total(goods)}`);


interface Subscriber {
    receive(message: string): void;
}

class Newsletter {
    private subscribers: Subscriber[] = [];

    subscribe(subscriber: Subscriber): void {
        this.subscribers.push(subscriber);
    }

    unsubscribe(subscriber: Subscriber): void {
        const index = this.subscribers.indexOf(subscriber);
        if (index !== -1) {
            this.subscribers.splice(index, 1);
        }
    }

    publish(message: string): void {
        for (const subscriber of this.subscribers) {
            subscriber.receive(message);
        }
    }
}

class EmailReader implements Subscriber {
    private readonly email: string;

    constructor(email: string) {
        this.email = email;
    }

    receive(message: string): void {
        console.log(`Email на ${this.email}: ${message}`);
    }
}

class SmsReader implements Subscriber {
    private readonly phone: string;

    constructor(phone: string) {
        this.phone = phone;
    }

    receive(message: string): void {
        console.log(`SMS на ${this.phone}: ${message}`);
    }
}

console.log('\n=== Observer ===');
const news = new Newsletter();
const emailUser = new EmailReader('alice@example.com');
const smsUser = new SmsReader('+7-900-000-00-00');
news.subscribe(emailUser);
news.subscribe(smsUser);
news.publish('Опубликована новая статья');
news.unsubscribe(emailUser);
news.publish('Большие скидки на этой неделе');
