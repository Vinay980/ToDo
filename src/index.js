document.addEventListener("DOMContentLoaded", () => {
  let todoInput = document.getElementById("todo-input");
  let addTaskBtn = document.getElementById("add-task-btn");
  let todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  addTaskBtn.addEventListener("click", () => {
    let taskText = todoInput.value.trim();
    if (taskText === "") return;
    let newTask = {
      id: Date.now(),
      text: taskText,
      complete: false,
    };
    tasks.push(newTask);
    saveTask();
    renderTask(newTask)
    todoInput.value = "";
    console.log(tasks);
  });

  function renderTask(task) {
    // console.log(task.text)
    let li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `<span>${task.text}</span>
                <button class="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md">Delete</button>`;
    li.style.cssText =
      " background:#374151; padding:8px; border-radius: 6px; margin-top:8px; display:flex; justify-content:space-between;";

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });

    li.querySelector("button").addEventListener("click",(e)=>{
        e.stopPropagation();
        tasks=tasks.filter((t)=>t.id===task.id)
        li.remove()
        saveTask()
    })

    todoList.appendChild(li);
  }

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
