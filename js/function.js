
/*Задание: функция для проверки, является ли строка палиндромом. Если хотите усложнить задание, предусмотрите случай, когда в строке встречаются пробелы. Они не должны учитываться при проверке!*/

/*function isPalindrome(string) {
  const formattedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = ('');
  for (let i = formattedString.length - 1; i >= 0; --i) {
    reversedString += formattedString[i];
  }
  return formattedString === reversedString;
}

console.log(isPalindrome('а роза упала на лапу Азора'));*/

/*Задание: функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN. Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число.*/

/*function getNumberFromString (string) {
  if (typeof string === 'string') {
    const newString = parseInt(string.replace(/\D/g,''), 10);
    return newString;
  }
  if (typeof string === 'number') {
    const newString = string.toString().replace(/\D/g,'', 10);
    return newString;
  }
  return NaN;
}

console.log(getNumberFromString('sdsd122 4/666.5'));*/

/*Задание: функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.*/

/*const string = '1dgdgsg';
const addedText = '0';
const lengthString = 19;

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
console.log(addPadString(string, lengthString, addedText));*/

/*Задание для проекта «Кекстаграм»: функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.*/

const currentString = 'd';
const stringLength = 5;

const StringLength = (string, length) => string.length <= length;

console.log(StringLength(currentString, stringLength));
