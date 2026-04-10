function task1 ()
{
    let name;
    let admin;
    name = "Джон";
    admin = name;
    alert(admin);
}

function task2()
{
    let a = prompt("Введите первое число", "1");
    let b = prompt("Введите второе число", "2");
    let sum = Number(a) + Number(b);
    alert(`${a} + ${b} = ${sum}`);
}

function task3()
{
    for (let i = 2; i <= 10; i++)
    {
        if (i % 2 === 0)
            alert(`Выведено число ${i}`);
    }
}

function task4()
{
    let i = 0;
    while (i < 3)
    {
        alert(`number ${i}!`);
        i++;
    }
}

function task5()
{
    let userInput;
    let isCancel = true;
    let final = null;
    while (true)
    {
        userInput = prompt("Введите число больше 100. Отмена для выхода", "");
        if (userInput === null)
        {
            isCancel = true;
            final = "Отмена";
            break;
        }
        let number = Number(userInput);
        if (!isNaN(number) && number > 100)
        {
            final = number;
            alert(`Введено число ${number}. Оно больше 100`);
            break;
        }
        else
            alert(`Введено число ${number}. Оно не больше 100. Повторите ввод!`);
    }
}

function isPrimeTask6(num)
{
    let primes = []
    if (num<2)
        return false;
    for (let i = 2; i <= num; i++)
    {
        let count_divider = 0;
        for (let j = 1; j <= i; j++)
        {
            if (i % j === 0)
                count_divider++;
        }
        if (count_divider === 2)
            primes.push(i);
    }
    alert(`${primes}`);
}

function task6()
{
    let numInput = document.getElementById("primeN");
    let n = parseInt(numInput.value, 10);
    if (isNaN(n) || n<2)
    {
        alert(`Ошибка! Введите число больше 2. Повторите ввод!`);
        return;
    }
    isPrimeTask6(n);
}

document.addEventListener("DOMContentLoaded", () =>
{
    document.getElementById("buttonTask1").addEventListener("click", task1);
    document.getElementById("buttonTask2").addEventListener("click", task2);
    document.getElementById("buttonTask3").addEventListener("click", task3);
    document.getElementById("buttonTask4").addEventListener("click", task4);
    document.getElementById("buttonTask5").addEventListener("click", task5);
    document.getElementById("buttonTask6").addEventListener("click", task6);
});