function loadTodos() {
  return JSON.parse(localStorage.getItem('todos')) || [];
}

function storeTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodoFromStorage(todoObj) {
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todoObj.completed;
  checkbox.addEventListener('change', function() {
      todoObj.completed = !todoObj.completed;
      span.classList.toggle('completed');
      updateLocalStorage();
  });
  li.appendChild(checkbox);

  const span = document.createElement('span');
  span.textContent = todoObj.text;
  span.className = 'todo-text';
  if (todoObj.completed) {
      span.classList.add('completed');
  }
  li.appendChild(span);

  const editButton = document.createElement('button');
const editImg = document.createElement('img');
editImg.src = 'images/edit.png'; 
editImg.alt = '편집';
editButton.appendChild(editImg);
editButton.className = 'edit';
editButton.addEventListener('click', function() {
    const newValue = prompt("할 일을 수정하세요.", span.textContent);
    if (newValue) {
        span.textContent = newValue;
    }
});
li.appendChild(editButton);

const deleteButton = document.createElement('button');
const deleteImg = document.createElement('img');
deleteImg.src = 'images/delete.png'; 
deleteImg.alt = '삭제';
deleteButton.appendChild(deleteImg);
deleteButton.className = 'delete';
deleteButton.addEventListener('click', function() {
    li.parentNode.removeChild(li);
});
li.appendChild(deleteButton);


  document.getElementById('todoList').appendChild(li);
}

function updateLocalStorage() {
  storeTodos(todos);
}

let todos = loadTodos();
todos.forEach(todo => renderTodoFromStorage(todo));


document.getElementById('addTodo').addEventListener('click', function() {
  const newTodo = prompt("새로운 할 일을 입력하세요.");

  if (newTodo) {
      todos.push({
          text: newTodo,
          completed: false
      });
      updateLocalStorage();
      renderTodoFromStorage(todos[todos.length - 1]);
  } else {
      alert('할 일을 입력해주세요.');
  }
  
});
