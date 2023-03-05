/* Функция для проверки длины строки.
Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине,
и false, если строка длиннее. */

const verifyLength = (string, maxLength) => string.length <= maxLength;

/* Функция для проверки, является ли строка палиндромом.
Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево. */

const isPalindrome = (string) => {
  string = string.toLowerCase().replace(/[^а-яa-z1-9]/gi, '');
  const reverse = string.split('').reverse().join('');
  return string === reverse;
};

/* Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
Если в строке нет ни одной цифры, функция должна вернуть NaN */

const getNumber = (string) => {
  if (typeof string === "number") {
    return string;
  }

  if (string.match(/[1-9]/g)) {
    return string.replace(/[^0-9]/g, '');
  }

  return NaN;
};

/* Функция, которая принимает три параметра:
-исходную строку
-минимальную длину
-строку с добавочными символами
и возвращает исходную строку, дополненную указанными символами до заданной длины.
Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться.
Если «добивка» слишком длинная, она обрезается с конца. */

const fillStrLength = (originStr, minLength, extraStr) => originStr.padStart(minLength, extraStr);

const myPadStart = (originStr, minLength, extraStr) => {
  const actualLength = minLength - originStr.length;
  if (actualLength <= 0) {
    return originStr;
  }

  return extraStr.slice(0, actualLength % extraStr.length) + extraStr.repeat(actualLength / extraStr.length) + originStr;
};
