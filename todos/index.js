const toDoFormEl = document.querySelector('.new-todoForm');
const toDoInputEl = toDoFormEl.querySelector('.new-todo');
const toDoCountEl = document.querySelector('.todo-count strong');
const mainEl = document.querySelector('.main');
const footerEl = document.querySelector('.footer');
const toggleAllEl = document.querySelector('.toggle-all');
const activeUlEl = document.querySelector('.todo-list');
const TODOS_LS = "toDos";
let toDos = [];


function init() {
  loadToDos();
  isToDosArr_In_Value();

  toDoFormEl.addEventListener('submit', handleSubmit);
  toggleAllEl.addEventListener('click', toggleAll);
}

init();

// localStorage Load function
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);

  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    toDoCountEl.textContent =  parsedToDos.length;
    parsedToDos.forEach((toDo) => paintTodos(toDo.text)); 
  }
 }

// toDos 목록 에 값이 없으면 display = none 상태
function isToDosArr_In_Value() {
  if (toDos.length === 0) {
    mainEl.style.display = 'none';
    footerEl.style.display = 'none';    
  }
}

// Submit Function
function handleSubmit(e) {
  e.preventDefault();
  const currentValue = toDoInputEl.value;
  if (currentValue.length === 0) {
    return 0;
  }
  paintTodos(currentValue);  
  toDoInputEl.value = '';
}

//  Paint function
function paintTodos(text) {
  mainEl.style.display = 'block';
  footerEl.style.display = 'block';
  
  const newId = toDos.length + 1;
  const li = document.createElement('li');
  const div = document.createElement('div');
  const input = document.createElement('input');
  const label = document.createElement('label');
  const button = document.createElement('button');

  input.addEventListener('click', checkedToDo);
  button.addEventListener('click', deleteToDo);

  li.id = newId;
  div.classList.add('view');
  input.classList.add('toggle');
  input.setAttribute('type', 'checkbox');
  label.textContent = text;
  button.classList.add('destroy');

  div.appendChild(input);
  div.appendChild(label);
  div.appendChild(button);

  li.appendChild(div);
  activeUlEl.appendChild(li);
  
  const toDoObj = {
    text: text, 
    id: newId
};

toDos.push(toDoObj);
toDoCountEl.textContent = toDos.length;
  saveTodos();
}

// Delete function
function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode.parentNode;
  activeUlEl.removeChild(li);  

  const cleanToDos = toDos.filter(function(toDo) {            
    return toDo.id !== parseInt(li.id);
});   

toDos = cleanToDos;
isToDosArr_In_Value();
saveTodos();

  if (li.classList.contains('completed')) {
    return 0;
  }
  toDoCountEl.textContent = todoCount() - 1;
}

// Check function
function checkedToDo(event) {
  const checked = event.target;
  const toDoList = checked.parentNode.parentNode;
  const isCompleted = toDoList.classList;

  isCompleted.toggle('completed');
    if (isCompleted.contains('completed')) {
      toDoCountEl.textContent = todoCount() - 1;
    } else {
      toDoCountEl.textContent = todoCount() + 1;
    }
}

// toDo Count 
function todoCount() {
  return Number(toDoCountEl.textContent);
}

// All Check function
function toggleAll() {
  const list = activeUlEl.querySelectorAll('li');
  const isAllCheck = document.querySelectorAll('.todo-list  .toggle');

  // 전체 선택되면 체크상태 해제
  if (todoCount() === 0) {
    list.forEach((item, i) => {
      isAllCheck[i].checked = false;
      item.classList.remove('completed');
    });
    toDoCountEl.textContent = list.length;

    return 0;
  }

  // 체크 상태가 아니라면 체크상태로 만든다.
  list.forEach((item, i) => {    
    if (isAllCheck[i].checked === false) {
      isAllCheck[i].checked = true;
      item.classList.add('completed');
      toDoCountEl.textContent = todoCount() - 1;
    }
  });
}

 // localStorage Save function
function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}