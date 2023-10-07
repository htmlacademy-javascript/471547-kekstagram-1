
/*Задание: функция для проверки, является ли строка палиндромом. Если хотите усложнить задание, предусмотрите случай, когда в строке встречаются пробелы. Они не должны учитываться при проверке!*/

function isPalindrome(string) {
  const formattedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = ('');
  for (let i = formattedString.length - 1; i >= 0; --i) {
    reversedString += formattedString[i];
  }
  return formattedString === reversedString;
}

// eslint-disable-next-line no-console
console.log(isPalindrome('а роза упала на лапу Азора'));

/*Задание: функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN. Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число.*/

function getNumberFromString (chekingString) {
  if (typeof chekingString === 'string') {
    const newString = parseInt(chekingString.replace(/\D/g,''), 10);
    return newString;
  }
  if (typeof chekingString === 'number') {
    const newString = chekingString.toString().replace(/\D/g,'', 10);
    return newString;
  }
  return NaN;
}

// eslint-disable-next-line no-console
console.log(getNumberFromString('sdsdsfdsf3122 4/666.5'));

/*Задание: функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.*/

function addPadString(currentString, length, padString) {
  if (currentString.length < length) {
    const res = padString.substr(0, length - currentString.length) + currentString;
    if (res.length < length) {
      return padString.repeat(length - currentString.length) + currentString;
    }
    return res;
  }
  return currentString;
}

// eslint-disable-next-line no-console
console.log(addPadString('1dgsdsddgsg', 0, 19));

/*Задание для проекта «Кекстаграм»: функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.*/

const StringLength = (string, lengthString) => string.length <= lengthString;

// eslint-disable-next-line no-console
console.log(StringLength('d', 5));
