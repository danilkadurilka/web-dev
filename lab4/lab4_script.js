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
    alert('${a} + ${b} = ${sum}');
}