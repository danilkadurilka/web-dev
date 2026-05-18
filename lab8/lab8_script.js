currentIntervalId = null

//---ЗДЕСЬ НАЧАЛО ЗАДАНИЯ 1.1---//
function counterTask11(n) 
{
    if (currentIntervalId !== null) 
    {
        clearInterval(currentIntervalId);
        currentIntervalId = null;
    }
    let current = n;
    document.getElementById("outTask11").innerHTML = `Начинаем отсчет с ${n}...`;
    currentIntervalId = setInterval(() => {
        current--;
        if (current === 0) 
        {
            clearInterval(currentIntervalId);
            currentIntervalId = null;
            document.getElementById("outTask11").innerHTML = "Отсчет завершен. Если потребуется начать заново, введите число n и нажмите клавишу `Посчитать`";
            return;
        }
        document.getElementById("outTask11").innerHTML = `Мы в процессе отсчета... Кстати, осталось ${current}`;
    }, 1000);
}

function task11()
{
    const input11 = document.getElementById("inputNumber11");
    const n = parseInt(input11.value, 10);
    if (isNaN(n) || n < 1) 
    {
        document.getElementById("outTask11").innerHTML = 'Введите натуральное число';
        return;
    }
    counterTask11(n);
}
//---ЗДЕСЬ КОНЕЦ ЗАДАНИЯ 1.1---//

//---ЗДЕСЬ НАЧАЛО ЗАДАНИЯ 1.2---//
function createCounterTask12()
{
    let count = 0;
    let intervalId = null;
    let isPaused = false;
    return {
        start(){
            if (intervalId) 
                return;
            if (!isPaused) 
            {
                const input12 = document.getElementById("inputNumber12");
                count = parseInt(input12.value, 10);
                if (isNaN(count) || count < 0)
                {
                    document.getElementById("outTask12").innerHTML = `Введите натуральное число`;
                    return;
                }
                document.getElementById("outTask12").innerHTML = `Начинаем отсчет с ${count}...`;
            } 
            else 
            {
                document.getElementById("outTask12").innerHTML = `Продолжаем отсчет... Осталось ${count}`;
                isPaused = false;
            }
            intervalId = setInterval(() => {
                if (count > 1)
                {
                    count--;
                    document.getElementById("outTask12").innerHTML = `Мы в процессе отсчета... Кстати, осталось ${count}`;
                } 
                else 
                {
                    this.pause();
                    document.getElementById("outTask12").innerHTML = "Отсчет завершен. Если потребуется начать заново, введите число n и нажмите клавишу `Запуск`";
                    isPaused = false;
                }
            }, 1000);
        },
        pause(){
            if (intervalId)
            {
                clearInterval(intervalId);
                intervalId = null;
                isPaused = true;
                document.getElementById("outTask12").innerHTML = `Пауза... Осталось ${count}. Нажмите клавишу "Запуск", чтобы продолжить`;
            }
        },
        stop(){
            this.pause();
            isPaused = false;
            const input12 = document.getElementById("inputNumber12");
            count = parseInt(input12.value, 10);
            document.getElementById("outTask12").innerHTML = "Счетчик сброшен. Если потребуется начать заново, введите число n и нажмите клавишу `Запуск`";
        }
    }
}

counterTask12Status = null;

function buttonStartTask12Click()
{
    if (!counterTask12Status)
        counterTask12Status = createCounterTask12();
    counterTask12Status.start();
}

function buttonPauseTask12Click()
{
    if (counterTask12Status) 
        counterTask12Status.pause();
}

function buttonStopTask12Click()
{
    if (counterTask12Status) 
        counterTask12Status.stop();
}
//---ЗДЕСЬ КОНЕЦ ЗАДАНИЯ 1.2---//

//---ЗДЕСЬ НАЧАЛО ЗАДАНИЯ 2.1---//
function delayTask21(N)
{
    return new Promise((resolve) => {
        setTimeout(resolve, N * 1000);
    });
}

async function task21()
{
    const input21 = document.getElementById("inputNumber21");
    const n = parseInt(input21.value, 10);
    if (isNaN(n) || n < 1) 
    {
        document.getElementById("outTask21").innerHTML = 'Введите натуральное число';
        return;
    }
    document.getElementById("outTask21").innerHTML = `Ждём ${n} секунд...`;
    await delayTask21(n);
    document.getElementById("outTask21").innerHTML = `delay сработал!`;
}
//---ЗДЕСЬ КОНЕЦ ЗАДАНИЯ 2.1---//

//---ЗДЕСЬ НАЧАЛО ЗАДАНИЯ 2.2---//
let isCountTask22 = false;

async function startDelayCountTask22() 
{
    if (isCountTask22)
    {
        document.getElementById("outTask22").innerHTML = "Счетчик уже работает!";
        return;
    }
    const input22 = document.getElementById("inputNumber22");
    let n = parseInt(input22.value, 10);
    if (isNaN(n) || n < 0)
    {
        document.getElementById("outTask22").innerHTML = 'Введите натуральное число';
        return;
    }
    isCountTask22 = true;
    for (let i = n; i >= 0; i--) 
    {
        document.getElementById("outTask22").innerHTML = `Мы в процессе отсчета... Кстати, осталось ${i}`;
        if (i === 0) 
        {
            document.getElementById("outTask22").innerHTML = "Отсчет завершен. Если потребуется начать заново, введите число n и нажмите клавишу `Запуск`";
            break;
        }
        await delayTask21(1);
    }
    isCountTask22 = false;
}
//---ЗДЕСЬ КОНЕЦ ЗАДАНИЯ 2.2---//

//---ЗДЕСЬ НАЧАЛО ЗАДАНИЯ 2.3---//
async function getFirstRepositoryTask23(username) 
{
    try 
    {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) 
            throw new Error(`Пользователь ${username} не найден`);
        const userData = await userResponse.json();
        const repositoriesResponse = await fetch(userData.repos_url);
        if (!repositoriesResponse.ok) 
            throw new Error(`Не удалось получить репозитории`);
        const repository = await repositoriesResponse.json();
        if (repository.length === 0)
            throw new Error(`У пользователя ${username} нет репозиториев`);
        return repository[0].name;
    } 
    catch (error) 
    {
        console.error('Ошибка:', error.message);
        throw error;
    }
}

function task23()
{
    const gitHubUsername = document.getElementById("inputName23").value;
    getFirstRepositoryTask23(gitHubUsername).then(repName => {
            document.getElementById("outTask23").innerHTML = `Первый репозиторий пользователя ${gitHubUsername}: ${repName}`;
        })
        .catch(error => {
            document.getElementById("outTask23").innerHTML = `Ошибка: ${error.message}`;
        });
}
//---ЗДЕСЬ КОНЕЦ ЗАДАНИЯ 2.3---//

//---ЗДЕСЬ НАЧАЛО ЗАДАНИЯ 3---//
function task3()
{
    class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
        }
    }

    async function loadJson(url) {
    const response = await fetch(url);
    if (response.status == 200) {
        return await response.json();
    } else {
        throw new HttpError(response);
        }
    }

    async function getGithubUser() {
    while (true) {
        let name = prompt("Введите логин?", "iliakan");
        try {
        const user = await loadJson(`https://api.github.com/users/${name}`);
        alert(`Полное имя: ${user.name}.`);
        return user;
        } catch (err) {
        if (err instanceof HttpError && err.response.status == 404) {
            alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
        } else {
            throw err;
                }
            }
        }
    }
    getGithubUser();
}

//---ЗДЕСЬ КОНЕЦ ЗАДАНИЯ 3---//

document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById("buttonTask11").addEventListener("click", task11);
    document.getElementById("buttonStartTask12").addEventListener("click", buttonStartTask12Click);
    document.getElementById("buttonPauseTask12").addEventListener("click", buttonPauseTask12Click);
    document.getElementById("buttonStopTask12").addEventListener("click", buttonStopTask12Click);
    document.getElementById("buttonTask21").addEventListener("click", task21);
    document.getElementById("buttonTask22").addEventListener("click", startDelayCountTask22);
    document.getElementById("buttonTask23").addEventListener("click", task23);
    document.getElementById("buttonTask3").addEventListener("click", task3);
});
    /*document.getElementById("buttonTask12").addEventListener("click", task12);
    document.getElementById("buttonTask13").addEventListener("click", task13);
    document.getElementById("buttonTask21").addEventListener("click", task21);
    document.getElementById("buttonTask22").addEventListener("click", task22);
    document.getElementById("buttonTask31").addEventListener("click", task31);
    document.getElementById("buttonTask32").addEventListener("click", task32);
    document.getElementById("buttonTaskA1").addEventListener("click", taskA1);
    document.getElementById("buttonTaskA2").addEventListener("click", taskA2);
    document.getElementById("buttonTaskA3").addEventListener("click", taskA3);
    document.getElementById("buttonTaskB1").addEventListener("click", taskB1);
    document.getElementById("buttonTaskB2").addEventListener("click", taskB2);*/