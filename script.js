//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
//Event listners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
//Functions

function addTodo(event) {
  event.preventDefault();
  if (todoInput.value != "") {
    //To cancel the refresh of the page when submitting the button.
    //todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //adding to local storage
    saveLocalStorage(todoInput.value);
    //completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<li class="fas fa-check"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<li class="fas fa-trash"></li>';
    deleteButton.classList.add("trash-btn");
    todoDiv.appendChild(deleteButton);
    //append to ul
    todoList.appendChild(todoDiv);
    //Clearing the input
    todoInput.value = "";
  }
}

function deleteCheck(e) {
  const item = e.target;
  //delete
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    removeTodo(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  //check
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//function for storing to local storage

function saveLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<li class="fas fa-check"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<li class="fas fa-trash"></li>';
    deleteButton.classList.add("trash-btn");
    todoDiv.appendChild(deleteButton);
    //append to ul
    todoList.appendChild(todoDiv);
  });
}

function removeTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
