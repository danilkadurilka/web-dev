function getMaxDifferenceTask11(arr) 
{
    if (arr.length < 2) 
        return 0;
    let minValue = Math.min(...arr);
    let maxValue = Math.max(...arr);
    return maxValue - minValue;
}

function task11() 
{
    let input = document.getElementById("inputArray11").value;
    let arr = input.split(',').map(item => parseFloat(item.trim())).filter(n => !isNaN(n));
    if (arr.length < 2) 
        {
        document.getElementById("outTask11").innerHTML = "Ошибка! Введите массив минимум из 2 чисел!";
        return;
    }
    let result = getMaxDifferenceTask11(arr);
    let message = `Максимальная разница: ${result}<br>`;
    message += `(max: ${Math.max(...arr)}, min: ${Math.min(...arr)})`;
    document.getElementById("outTask11").innerHTML = message;
}

function removeDuplicateElementsTask12(arr)
{
    return [...new Set(arr)];
}

function task12()
{
    let input = document.getElementById("inputArray12").value;
    let arr = input.split(',').map(item => parseFloat(item.trim())).filter(n => !isNaN(n));
    let result = removeDuplicateElementsTask12(arr);
    let message = `Массив без дубликатов: [${result.join(', ')}]`;
    document.getElementById("outTask12").innerHTML = message;
}

function filterTrueItemsTask13(arr) 
{
    return arr.filter(item => item.isDone === true);
}

function task13()
{
    const trueFalseArray = 
    [
    {id: 1, isDone: true}, 
    {id: 2, isDone: false},
    {id: 3, isDone: true},
    {id: 4, isDone: false}
    ];
    let result = filterTrueItemsTask13(trueFalseArray);
    let resultText = "";
    for (let i = 0; i < result.length; i++) 
    {
        resultText += `{id: ${result[i].id}, isDone: ${result[i].isDone}}<br>`;
    }
    let message = `Отфильтрованные элементы (isDone: true):<br> ${resultText}`;
    document.getElementById("outTask13").innerHTML = message;   
}

function getGreaterThanNumberTask21(arr, num) 
{
    return arr.filter(item => item > num);
}

function task21()
{
    let inputArr = document.getElementById("inputArray21").value;
    let inputNum = document.getElementById("inputNumber21").value;
    let arr = inputArr.split(',').map(item => parseFloat(item.trim())).filter(n => !isNaN(n));
    if (isNaN(inputNum)) 
    {
        document.getElementById("outTask21").innerHTML = "Ошибка! Введите корректное число!";
        return;
    }
    let result = getGreaterThanNumberTask21(arr, inputNum);
    let message = `Элементы массива, которые больше ${inputNum}: ${result}<br>`;
    document.getElementById("outTask21").innerHTML = message;
}

function getArrays22(arr) 
{
    let result = [];
    for (let item of arr) 
    {
        if (Array.isArray(item)) 
            result = result.concat(getArrays22(item)); 
        else
            result.push(item);
    }
    return result;
}

function task22()
{
    let inputStr = document.getElementById("inputArray22").value;
    let inputArr = JSON.parse(inputStr);
    if (!Array.isArray(inputArr)) 
    {
        document.getElementById("outTask22").innerHTML = "Ошибка: введите корректный массив! Пример: [1, 4, [34, 1, 20]]";
        return;
    }
    let result = getArrays22(inputArr);
    document.getElementById("outTask22").innerHTML = `Плоский массив:<br>[${result.join(', ')}]`;
}

function countSumPairsTask31(arr) 
{
    let count = 0;
    for (let i = 0; i < arr.length; i++) 
    {
        for (let j = i + 1; j < arr.length; j++) 
        {
            if (arr[i] + arr[j] === 0) 
                count++;
        }
    }
    return count;
}

function task31()
{
    let input = document.getElementById("inputArray31").value;
    let arr = input.split(',').map(item => parseFloat(item.trim())).filter(n => !isNaN(n));
    let result = countSumPairsTask31(arr);
    let message = `Количество пар с суммой 0: ${result}`;
    document.getElementById("outTask31").innerHTML = message;
}

function countSumTriplesTask32(arr) 
{
    let count = 0;
    for (let x = 0; x < arr.length-2; x++) 
    {
        for (let y = x + 1; y < arr.length-1; y++) 
        {
            for (let z = y + 1; z < arr.length; z++) 
            {
                if (arr[x] + arr[y] + arr[z] === 0) 
                    count++;
            }
        }
    }
    return count;
}

function task32()
{
    let input = document.getElementById("inputArray32").value;
    let arr = input.split(',').map(item => parseFloat(item.trim())).filter(n => !isNaN(n));
    let result = countSumTriplesTask32(arr);
    let message = `Количество троек чисел с суммой 0: ${result}`;
    document.getElementById("outTask32").innerHTML = message;
}

document.addEventListener("DOMContentLoaded", () =>
{
    document.getElementById("buttonTask11").addEventListener("click", task11);
    document.getElementById("buttonTask12").addEventListener("click", task12);
    document.getElementById("buttonTask13").addEventListener("click", task13);
    document.getElementById("buttonTask21").addEventListener("click", task21);
    document.getElementById("buttonTask22").addEventListener("click", task22);
    document.getElementById("buttonTask31").addEventListener("click", task31);
    document.getElementById("buttonTask32").addEventListener("click", task32);
});