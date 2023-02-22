/* Функция для проверки длины строки.
Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине,
и false, если строка длиннее. */

function verifyLength (string, maxLength) {
  if (string.length > maxLength) {
    return false;
  }

  return true;
}

/* Функция для проверки, является ли строка палиндромом.
Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево. */

function isPalindrome(string) {
  string = string.toLowerCase().replace(/[^а-яa-z1-9]/gi, '');
  const reverse = string.split('').reverse().join('');
  if (string === reverse) {
    return true;
  }

  return false;
}

/* Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
Если в строке нет ни одной цифры, функция должна вернуть NaN */

function getNumber (string) {
  if (string.match(/[1-9]/g)) {
    string = string.replace(/[^0-9]/g, '');
    return string;
  }

  return NaN;
}

/* Функция, которая принимает три параметра:
-исходную строку
-минимальную длину
-строку с добавочными символами
и возвращает исходную строку, дополненную указанными символами до заданной длины.
Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться.
Если «добивка» слишком длинная, она обрезается с конца. */

function fillStrLength (originStr, minLength, extraStr) {
  return originStr.padStart(minLength, extraStr);
}
