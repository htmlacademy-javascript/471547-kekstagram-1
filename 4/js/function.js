
/*Задание: функция для проверки, является ли строка палиндромом. Если хотите усложнить задание, предусмотрите случай, когда в строке встречаются пробелы. Они не должны учитываться при проверке!*/

/*let text = 'кубик';
let chekingText = text.replaceAll(' ', '');

function isPalindrome(string) {
    let pattern = string.toLowerCase();
    let check = ('');
    for (let i = pattern.length - 1; i >= 0; --i) {
      check += pattern[i];
    }
    return pattern == check;
  }

  console.log(isPalindrome(chekingText));
*/

/*Задание: функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN. Если хотите усложнить задание, предусмотрите случай, когда вместо строки приходит число.*/

/*let data = ' dfsfffs10 agga 12';

function cheking (text) {
    if (typeof text === "string") {
      return newText = parseInt(text.replace(/\D/g,''), 10);
    }
    if (typeof text === "number") {
        notNumber = text.toString();
        return newText = notNumber.replace(/\D/g,'');
    }
    return NaN;
  }

console.log(cheking(data));*/

/*Задание: функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.*/

/*let string1 = '1';
let string2 = '0';
let num = 9;

function text(string1, num, string2) {
    if (string1.length < num) {
        let res = string2.substr(0, num - string1.length) + string1;
            if (res.length < num) {
            return string2.repeat(num - string1.length) + string1;
        };
        return res;
    };
    return string1;
}
console.log(text(string1, num, string2));*/

/*Задание для проекта «Кекстаграм»: функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее.*/

/*let string = 'sss';
let num = 5;

function chekingString(data,num) {
  if (data.length <= num) {
    return true;
  }
  return false;
}

console.log(chekingString(string,num));*/
