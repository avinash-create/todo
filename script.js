// script.js
document.addEventListener("DOMContentLoaded", () => {
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];

    function renderTasks() {
        const today = new Date().toISOString().split("T")[0];
        const todayTasks = todoList.filter(task => task.date === today);
        const futureTasks = todoList.filter(task => task.date > today);
        const completedTasks = todoList.filter(task => task.completed);

        document.getElementById("todayTasks").innerHTML = renderTaskCards(todayTasks);
        document.getElementById("futureTasks").innerHTML = renderTaskCards(futureTasks);
        document.getElementById("completedTasks").innerHTML = renderTaskCards(completedTasks);
    }

    function renderTaskCards(tasks) {
        return tasks.map(task => `
            <div class="task-card ${task.completed ? "completed" : ""}">
                <span>${task.name} (Deadline: ${task.date}, Priority: ${task.priority})</span>
                <button onclick="deleteItem(${task.id})">Delete</button>
                <button onclick="toggleCompletion(${task.id})">Tick</button>
            </div>
        `).join("");
    }

    function addItem() {
        const itemName = document.getElementById("itemName").value;
        const itemDate = document.getElementById("itemDate").value;
        const priority = document.getElementById("priority").value;

        const newItem = {
            id: Date.now(),
            name: itemName,
            date: itemDate,
            priority,
            completed: false
        };

        todoList.push(newItem);
        localStorage.setItem("todoList", JSON.stringify(todoList));
        renderTasks();
    }

    function deleteItem(id) {
        todoList.splice(todoList.findIndex(task => task.id === id), 1);
        localStorage.setItem("todoList", JSON.stringify(todoList));
        renderTasks();
    }

    function toggleCompletion(id) {
        const task = todoList.find(task => task.id === id);
        task.completed = !task.completed;
        localStorage.setItem("todoList", JSON.stringify(todoList));
        renderTasks();
    }

    renderTasks();
});
