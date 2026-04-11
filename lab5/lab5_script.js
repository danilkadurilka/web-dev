function getReversedNumbertask11(num)
{
    let result = 0;
    let tempNum = Math.abs(Math.floor(num));
    while (tempNum !== 0)
    {
        result = result * 10 + tempNum % 10;
        tempNum = Math.floor(tempNum / 10);
    }
    return result;
}

function task11()
{
    let numInput = document.getElementById("inputNumber11");
    let num = parseFloat(numInput.value);
    if (isNaN(num))
    {
        document.getElementById("outTask11").innerHTML = "Ошибка: введите корректное число!";
        return;
    }
    let funcResult = getReversedNumbertask11(num);
    let message = `Перевернутое число: ${funcResult}`;
    document.getElementById("outTask11").innerHTML = message;
}

function removeDuplicateDigitsTask12(num)
{
    let numStr = num.toString();
    let result = '';
    for (let i = 0; i < numStr.length; i++)
    {
        if (result.indexOf(numStr[i]) === -1)
            result += numStr[i];
    }
    return parseInt(result, 10);
}

function task12()
{
    let numInput = document.getElementById("inputNumber12");
    let num = parseFloat(numInput.value);
    if (isNaN(num))
    {
        document.getElementById("outTask12").innerHTML = "Ошибка: введите корректное число!";
        return;
    }
    let funcResult = removeDuplicateDigitsTask12(num);
    let message = `Число без дублирующихся цифр: ${funcResult}`;
    document.getElementById("outTask12").innerHTML = message;
}

function countDigitInNumberTask13(num, digit)
{
    let numStr = Math.abs(Math.floor(num)).toString();
    let count = 0;
    for (let i = 0; i < numStr.length; i++)
    {
        if (numStr[i] === digit.toString())
            count++;
    }
    return count;
}

function task13()
{
    let numInput = document.getElementById("inputNumber13");
    let digitInput = document.getElementById("inputDigit13");
    let numValue = parseFloat(numInput.value);
    let digitString = digitInput.value.trim();
    let digitValue = parseInt(digitString, 10);
    if (isNaN(numValue))
    {
        document.getElementById("outTask13").innerHTML = "Ошибка: введите корректное число!";
        return;
    }
    if (digitString.length !== 1 || isNaN(digitValue) || digitValue < 0 || digitValue > 9)
    {
        document.getElementById("outTask13").innerHTML = "Ошибка: введите корректную цифру от 0 до 9!";
        return;
    }
    let funcResult = countDigitInNumberTask13(numValue, digitValue);
    let message = `В числе ${numValue} цифра ${digitValue} встречается ${funcResult} раз(а)`;
    document.getElementById("outTask13").innerHTML = message;   
}

function findLongestSequencesInBinaryTask14(num)
{
    let binaryStr = Math.abs(Math.floor(num)).toString(2);
    let max0 = 0;
    let max1 = 0;
    let current0 = 0;
    let current1 = 0;
    for (let i = 0; i < binaryStr.length; i++)
    {
        if (binaryStr[i] === '1')
        {
            current1++;
            current0 = 0;
            if (current1 > max1)
                max1 = current1;
        }
        else
        {
            current0++;
            current1 = 0;
            if (current0 > max0)
                max0 = current0;
        }
    }
    let message = "Двоичная запись: " + binaryStr + "\n";
    message += "Самая длинная последовательность нулей: " + max0 + "\n";
    message += "Самая длинная последовательность единиц: " + max1;
    return message;
}

function task14()
{
    let numInput = document.getElementById("inputNumber14");
    let num = parseFloat(numInput.value);
    if (isNaN(num))
    {
        document.getElementById("outTask14").innerHTML = "Ошибка: введите корректное число!";
        return;
    }
    let result = findLongestSequencesInBinaryTask14(num);
    document.getElementById("outTask14").innerHTML = result.replace(/\n/g, "<br>"); //g заменяет все вхождения, а не только первое
}

function firstUniqueSymbolTask21(str)
{
    for (let i = 0; i < str.length; i++)
    {
        let unique = true;
        for (let j = 0; j < str.length; j++)
        {
            if (i !== j && str[i] === str[j])
            {
                unique = false;
                break;
            }
        }
        if (unique)
        {
            return str[i];
        }
    }
    return null;
}

function task21()
{
    let input = document.getElementById("inputString21").value;
    let result = firstUniqueSymbolTask21(input);
    if (result === null)
        document.getElementById("outTask21").innerHTML = "Нет неповторяющихся символов";
    else
        document.getElementById("outTask21").innerHTML = "Первый неповторяющийся символ: '" + result + "'";
}

function generateStringTask22(length)
{
    let symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++)
    {
        let randomIndex = Math.floor(Math.random() * symbols.length);
        result += symbols[randomIndex];
    }
    return result;
}

function task22()
{
    let input = document.getElementById("strLength22").value;
    let length = parseInt(input, 10);
    if (isNaN(length) || length <= 0)
    {
        document.getElementById("outTask22").innerHTML = "Ошибка: введите положительное число!";
        return;
    }
    let result = generateStringTask22(length);
    document.getElementById("outTask22").innerHTML = "Случайная строка: '" + result + "'";
}

function removeDuplicateSymbolsTask23(str)
{
    let result = '';
    for (let i = 0; i < str.length; i++)
    {
        if (result.indexOf(str[i]) === -1)
            result += str[i];
    }
    return result;
}

function task23()
{
    let strInput = document.getElementById("inputString23").value;
    if (strInput.length === 0)
    {
        document.getElementById("outTask23").innerHTML = "Ошибка: введите строку!";
        return;
    }
    let funcResult = removeDuplicateSymbolsTask23(strInput);
    let message = `Строка без дублирующихся символов: ${funcResult}`;
    document.getElementById("outTask23").innerHTML = message;
}

document.addEventListener("DOMContentLoaded", () =>
{
    document.getElementById("buttonTask11").addEventListener("click", task11);
    document.getElementById("buttonTask12").addEventListener("click", task12);
    document.getElementById("buttonTask13").addEventListener("click", task13);
    document.getElementById("buttonTask14").addEventListener("click", task14);
    document.getElementById("buttonTask21").addEventListener("click", task21);
    document.getElementById("buttonTask22").addEventListener("click", task22);
    document.getElementById("buttonTask23").addEventListener("click", task23);
});