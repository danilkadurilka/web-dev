let tasks = [];
let currentFilter = "all";
let isSortedByName = false;

function saveTasksToStorage() 
{
    localStorage.setItem("todo_tasks", JSON.stringify(tasks));
}

function loadTasksFromStorage() 
{
    const stored = localStorage.getItem("todo_tasks");
    if (stored) 
    {
        tasks = JSON.parse(stored);
        tasks.forEach(t => t.createdAt = t.createdAt || Date.now());
    }
}

function formatDate(timestamp) 
{
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `создана ${day}.${month}.${date.getFullYear()}`;
}

function addTask(text)
{
    if (!text || text.trim() === "") 
        return alert("Пожалуйста, введите текст задачи!");
    tasks.push({
        id: `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        text: text.trim(),
        completed: false,
        createdAt: Date.now()
    });
    saveTasksToStorage();
    renderTodoList();
}

function deleteTaskById(id) 
{
    tasks = tasks.filter(task => task.id !== id);
    saveTasksToStorage();
    renderTodoList();
}

function toggleTaskCompletion(id) 
{
    const task = tasks.find(t => t.id === id);
    if (task)
    {
        task.completed = !task.completed;
        saveTasksToStorage();
        renderTodoList();
    }
}

function clearAllTasks() 
{
    if (confirm("⚠️ Вы уверены, что хотите удалить ВСЕ задачи?")) 
    {
        tasks = [];
        saveTasksToStorage();
        renderTodoList();
    }
}

function renderTodoList() 
{
    const container = document.getElementById("todoListContainer");
    if (!container) 
        return;
    let list = [...tasks];
    if (currentFilter === "completed") 
        list = tasks.filter(t => t.completed);
    if (currentFilter === "active") 
        list = tasks.filter(t => !t.completed);
    if (isSortedByName)
        list.sort((a, b) => a.text.localeCompare(b.text, 'ru', { sensitivity: 'base' }));
    else 
        list.sort((a, b) => a.createdAt - b.createdAt);
    if (list.length === 0) 
    {
        const messages = 
        {
            all: "✨ Список дел пуст. Добавьте первую задачу!",
            completed: "🏆 Нет выполненных задач. Выполнили работу? Поставьте галочку!",
            active: "📌 Нет активных задач. Отдыхайте или добавьте новую."
        };
        container.innerHTML = `<li class="empty-message">${messages[currentFilter]}</li>`;
        return;
    }
    let html = "";
    for (let task of list) 
    {
        html += `
            <li class="todo-item ${task.completed ? 'completed' : ''}">
                <div class="li-todo">
                    <label class="todo-label">
                        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                               onchange="toggleTaskCompletion('${task.id}')">
                        <div class="text-content">
                            <div class="task-text">${task.text}</div>
                            <div class="task-date">${formatDate(task.createdAt)}</div>
                        </div>
                    </label>
                    <button class="delete-btn" aria-label="Удалить" onclick="deleteTaskById('${task.id}')">✕</button>
                </div>
            </li>
        `;
    }
    container.innerHTML = html;
}

function setActiveFilter(filterValue) 
{
    currentFilter = filterValue;
    document.querySelectorAll('.filter-link').forEach(btn => {
        if (btn.getAttribute('data-filter') === filterValue)
            btn.classList.add('active');
        else
            btn.classList.remove('active');
    });
    renderTodoList();
}

function toggleSorting() 
{
    isSortedByName = !isSortedByName;
    const sortBtn = document.getElementById('sortByNameBtn');
    if (isSortedByName) 
    {
        sortBtn.innerHTML = '🔀 Сортировка по имени (А→Я)';
        sortBtn.style.background = '#7c5e3a';
    }   
    else 
    {
        sortBtn.innerHTML = '🔀 Сортировка по дате';
        sortBtn.style.background = '#4b6a6a';
    }
    renderTodoList();
}

function initApp() 
{
    loadTasksFromStorage();
    const taskInputField = document.getElementById('taskInput');
    
    document.getElementById('createBtn').addEventListener('click', () => {
        addTask(taskInputField.value);
        taskInputField.value = '';
        taskInputField.focus();
    });
    document.getElementById('clearAllBtn').addEventListener('click', clearAllTasks);
    document.getElementById('sortByNameBtn').addEventListener('click', toggleSorting);
    document.querySelectorAll('.filter-link').forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveFilter(btn.getAttribute('data-filter'));
        });
    });
    setActiveFilter('all');
}
document.addEventListener('DOMContentLoaded', initApp);