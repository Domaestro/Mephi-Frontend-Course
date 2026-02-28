"use strict";

document.getElementById("run").addEventListener("click", showMenu);

function promptInt(message) {
  const s = prompt(message);
  if (s === null) return null;
  const n = Number.parseInt(s.trim(), 10);
  return Number.isFinite(n) ? n : NaN;
}

function showMenu() {
  while (true) {
    const choice = prompt(
      "Выберите задание:\n" +
      "1 — Название месяца по номеру\n" +
      "2 — n простых чисел\n" +
      "3 — Counter (add/sub)\n" +
      "4 — Слова через запятые -> через точки\n" +
      "5 — Проверка палиндрома\n" +
      "Отмена — выйти"
    );

    if (choice === null) return;

    switch (choice.trim()) {
      case "1": taskMonthName(); break;
      case "2": taskPrimes(); break;
      case "3": taskCounter(); break;
      case "4": taskReplaceSeparators(); break;
      case "5": taskPalindrome(); break;
      default:
        alert("Нет такого пункта меню. Введите 1, 2, 3, 4 или 5.");
    }

    const again = confirm("Хотите выполнить ещё одно задание?");
    if (!again) return;
  }
}


function taskMonthName() {
  const month = promptInt("Введите номер месяца (1–12):");
  if (month === null) return;
  const months = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];
  const result = (Number.isInteger(month) && month >= 1 && month <= 12) ? months[month - 1] : "Некорректный номер месяца";
  alert(result);
}


function taskPrimes() {
  const n = promptInt("Введите натуральное число n (сколько простых чисел вывести):");
  if (n === null) return;

  if (!Number.isInteger(n) || n <= 0) {
    alert("Некорректный ввод: нужно натуральное число (1, 2, 3, ...).");
    return;
  }

  const primes = [];
  let candidate = 2;

  while (primes.length < n) {
    if (isPrime(candidate, primes)) primes.push(candidate);
    candidate++;
  }

  alert(primes.join(" "));
}

function isPrime(x, primesSoFar) {
  if (x < 2) return false;
  const limit = Math.floor(Math.sqrt(x));
  for (const p of primesSoFar) {
    if (p > limit) break;
    if (x % p === 0) return false;
  }
  return true;
}


class Counter {
  constructor(initial = 0) {
    this.count = initial;
  }
  add(value) {
    this.count += value;
  }
  sub(value) {
    this.count -= value;
  }
}

function taskCounter() {
  const c = new Counter(0);

  alert("Counter создан. count = 0\nВведите команды вида: +5, -3, +10.\nОтмена — выход.");

  while (true) {
    const cmd = prompt(`Текущее значение count = ${c.count}\nВведите команду (+N или -N):`);
    if (cmd === null) return;

    const s = cmd.trim();
    const match = s.match(/^([+-])\s*(\d+)$/);

    if (!match) {
      alert("Неверный формат. Пример: +5 или -3 (только целые и натуральные N).");
      continue;
    }

    const sign = match[1];
    const value = Number.parseInt(match[2], 10);

    if (sign === "+") c.add(value);
    else c.sub(value);
  }
}


function taskReplaceSeparators() {
  const input = prompt("Введите слова, разделённые запятыми (например: кот, пёс, лиса):");
  if (input === null) return;

  const words = input.split(",").map(w => w.trim()).filter(w => w.length > 0);
  alert(words.join(". "));
}


function taskPalindrome() {
  const input = prompt("Введите строку для проверки на палиндром:");
  if (input === null) return;

  // приводим к нижнему регистру и убираем всё, кроме букв и цифр
  const normalized = input.toLowerCase().replace(/[^a-zа-яё0-9]/gi, "");
  const reversed = normalized.split("").reverse().join("");

  alert(normalized.length > 0 && normalized === reversed ? "Да" : "Нет");
}