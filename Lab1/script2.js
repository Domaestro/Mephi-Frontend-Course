"use strict";

document.getElementById("run2").addEventListener("click", showMenu2);

function promptLine(message) {
  const s = prompt(message);
  return s === null ? null : s.trim(); // убираем лишние пробелы
}

function parseNaturalList(input) {
  const parts = input.split(/[\s,]+/).filter(Boolean);
  const nums = parts.map(p => Number.parseInt(p, 10));
  if (nums.some(n => !Number.isInteger(n) || n <= 0)) return null;
  return nums;
}

function showMenu2() {
  while (true) {
    const choice = prompt(
      "Задания:\n" +
      "1 — Отсортировать список натуральных чисел по возрастанию\n" +
      "2 — Остатки от деления на 5 (для массива натуральных)\n" +
      "3 — Медиана (произвольное кол-во аргументов) + 2 способа вызова\n" +
      "4 — Проверка правильной скобочной строки (стек)\n" +
      "5 — Глубокое копирование объекта (любой вложенности)\n" +
      "Отмена — выйти"
    );

    if (choice === null) return;

    switch (choice.trim()) {
      case "1": taskSortNaturals(); break;
      case "2": taskRemaindersBy5(); break;
      case "3": taskMedian(); break;
      case "4": taskBracketsStack(); break;
      case "5": taskDeepClone(); break;
      default:
        alert("Нет такого пункта. Введите 1, 2, 3, 4 или 5.");
    }

    if (!confirm("Хотите выполнить ещё одно новое задание?")) return;
  }
}


function taskSortNaturals() {
  const s = promptLine("Введите список натуральных чисел (пример: 5, 1, 10, 2):");
  if (s === null) return;

  const nums = parseNaturalList(s);
  if (!nums) {
    alert("Некорректный ввод: нужны натуральные числа (1, 2, 3, ...).");
    return;
  }

  // В JS sort по умолчанию сортирует как строки, поэтому используем числовой компаратор
  const sorted = [...nums].sort((a, b) => a - b);
  alert(sorted.join(" "));
}


function remaindersBy5(arr) {
  return arr.map(x => x % 5);
}

function taskRemaindersBy5() {
  const s = promptLine("Введите массив натуральных чисел (пример: 6 7 8 9 10):");
  if (s === null) return;

  const nums = parseNaturalList(s);
  if (!nums) {
    alert("Некорректный ввод: нужны натуральные числа.");
    return;
  }

  alert(remaindersBy5(nums).join(" "));
}


function median(...values) {
  if (values.length === 0) return null;

  const nums = values.map(Number);
  if (nums.some(n => !Number.isFinite(n))) return null;

  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  // если кол-во нечётное , центральный. если чётное, то среднее двух центральных
  return sorted.length % 2 === 1
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

function taskMedian() {
  const s1 = promptLine("Введите числа через запятую для медианы (пример: 1, 10, 5, 2):");
  if (s1 === null) return;

  const parts = s1.split(",").map(x => x.trim()).filter(Boolean);
  const nums1 = parts.map(x => Number(x));

  const m1 = median(...nums1); // ну типа с таким же успехом сюда может бахнуть 1, 3, 4, 2
  if (m1 === null) {
    alert("Некорректный ввод: должны быть числа.");
    return;
  }

  const preparedArray = nums1; // заранее созданный массив
  const m2 = median(...preparedArray);

  alert(
    "Медиана (вызов 1: median(a, b, c, ...)) = " + m1 + "\n" +
    "Медиана (вызов 2: median(...arr)) = " + m2
  );
}


function isCorrectBracketString(str) {
  const stack = [];
  for (const ch of str) {
    if (ch === "(") {
      stack.push(ch);
    } else if (ch === ")") {
      if (stack.length === 0) return false; // закрывающая без пары
      stack.pop();
    } else return false;
  }
  return stack.length === 0; // все открывающие закрыты
}

function taskBracketsStack() {
  const s = promptLine('Введите строку из "(" и ")" (пример: (())()() ):');
  if (s === null) return;
  alert(isCorrectBracketString(s) ? "Правильная" : "Неправильная");
}


function deepClone(value) {
  // Примитивы (number/string/boolean/null/undefined/symbol/bigint) вернем как есть
  if (value === null || typeof value !== "object") return value;

  // если это массив объектов то рекурсивно вызовим на каждый объект по отдельности
  if (Array.isArray(value)) {
    return value.map(deepClone);
  }

  // Обычный объект (без методов по условию, но даже если есть, мы их как значения скопируем)
  const copy = {};
  for (const key of Object.keys(value)) {
    copy[key] = deepClone(value[key]);
  }
  return copy;
}

function taskDeepClone() {
  alert(
    "Введите объект в формате JSON.\n" +
    'Пример: {"a":1,"b":[2,3],"c":{"d":4}}\n' +
    "Методов быть не должно."
  );

  const s = promptLine("Вставьте JSON объекта:");
  if (s === null) return;

  let obj;
  try {
    obj = JSON.parse(s);
  } catch {
    alert("Некорректный JSON.");
    return;
  }

  const cloned = deepClone(obj);

  // проверка, что это другое место в памяти
  const sameRef = (obj === cloned);

  alert(
    "Копия создана.\n" +
    "obj === copy ? " + (sameRef ? " - Да" : "- Нет") + "\n\n" +
    "Копия (JSON):\n" + JSON.stringify(cloned)
  );
}