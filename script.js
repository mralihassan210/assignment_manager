// Student Task Manager - add and display tasks
const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-desc");
const list = document.getElementById("task-list");
const emptyMsg = document.getElementById("empty-msg");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task";

    const info = document.createElement("div");
    info.className = "task-info";

    const title = document.createElement("h3");
    title.textContent = task.title;

    const desc = document.createElement("p");
    desc.textContent = task.description;

    info.append(title, desc);
    li.appendChild(info);
    list.appendChild(li);
  });
  emptyMsg.style.display = tasks.length ? "none" : "block";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;

  tasks.push({
    id: Date.now(),
    title: title,
    description: descInput.value.trim(),
    completed: false,
  });
  saveTasks();
  renderTasks();
  form.reset();
  titleInput.focus();
});

renderTasks();