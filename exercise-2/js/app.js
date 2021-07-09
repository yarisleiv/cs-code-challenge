var defaultTasks = [
  {
    task: 'Pay Bills',
    completed: false,
    edit: false
  },
  {
    task: 'Go Shopping',
    completed: false,
    edit: true
  },
  {
    task: 'See The Doctor',
    completed: true,
    edit: false
  },
];

var tasks = getCachedTasks() || defaultTasks;

function clickHandler(e) {
  switch (e.target.id) {
    case 'delete':
      deleteTask(e);
      break;
    case 'edit':
      editTask(e);
      break;
    case 'add':
      addTask(e);
      break;
    case 'status':
      setTaskAsCompleteOrNot(e);
      break;
  }
}

function createNewTaskElement(newTask) {
  var edit = newTask.edit ? ' ' + 'list__item-editable' : '';
  var checked = newTask.completed ? 'checked' : '';
  var completed = newTask.completed ? 'task__label-completed' : '';
  var editButton = newTask.edit ? 'Save' : 'Edit';

  return '<li class="list__item ' + edit + '">' +
            '<input type="checkbox" id="status"' + checked + '>' +
            '<label class="task__label ' + completed + '" id="show-status">' + newTask.task + '</label>' +
            '<input type="text" class="task input-text" value="' + newTask.task +'">' +
            '<button class="button button-edit" id="edit">' + editButton + '</button>' +
            '<button class="button button-delete" id="delete">Delete</button>' +
          '</li>'
}

function addTask(e) {
  e.preventDefault();
  var taskInput = document.getElementById('new-task');

  if (!taskInput.value.trim()) return;

  tasks.unshift({
    task: taskInput.value,
    completed: false,
    edit: false
  })

  var taskToAdd = tasks.find(function(newTask) {
    return newTask.task === taskInput.value
  });

  var listItem = createNewTaskElement(taskToAdd);
  var incompleteTaskHolder = document.getElementsByClassName('list-incompleted')[0];
  incompleteTaskHolder.insertAdjacentHTML('beforeend', listItem);
  taskInput.value = '';
}

function editTask(e) {
  var listItem = e.target.parentNode;
  var status = listItem.firstElementChild;
  var label = status.nextElementSibling;
  var editInput = label.nextElementSibling;
  var editBtn = editInput.nextElementSibling;
  var containsClass = listItem.classList.contains('list__item-editable');
  var allTasks = tasks;
  var currentTask = tasks.find(function(task){
    return task.task === label.innerText
  });

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
    allWithoutEdited = allTasks.filter(function(oneTask){
        return oneTask.task !== currentTask.task
      });
    currentTask.task = label.innerText;
    currentTask.edit = false;
    allWithoutEdited.push(currentTask);
    tasks = allWithoutEdited;
  } else {
    currentTask.edit = true;
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('list__item-editable');
}

function deleteTask(e) {
  var listItem = e.target.parentNode;
  var ul = listItem.parentNode;

  if (ul) ul.removeChild(listItem);

  if (listItem.children[1].id === 'show-status') {
    deleteTaskInCache(listItem.children[1].innerText);
  }

}

function setTaskAsCompleteOrNot(e) {
  var incomplete = document.getElementsByClassName('list-incompleted')[0];
  var completed = document.getElementsByClassName('list-completed')[0];
  var listItem = e.target.parentNode;
  var status = new Array(...listItem.children).find(filterStatus);
  var currentTask = tasks.find(function(chosenTask) {
      return chosenTask.task === status.innerText
    });

  status.classList.toggle('task__label-completed');

  if (status.classList.contains('task__label-completed')) {
    currentTask.completed = true;
    updateTaskInCache(currentTask);
  } else {
    currentTask.completed = false;
    updateTaskInCache(currentTask);
  }

  currentTask.completed
    ? completed.appendChild(listItem)
    : incomplete.appendChild(listItem);
}

function updateTaskInCache(currentTask) {
  var updated = tasks.filter(function(task) {
    return task.task !== currentTask.task
  });
  updated.push(currentTask);
  tasks = updated;
}

function filterStatus(status) {
  return status.id === 'show-status';
}

function showSavedTasks() {
  if (!tasks.length) {
    tasks = defaultTasks;
    return tasks.forEach(appendSavedTask);
  }

  if (tasks) {tasks.forEach(appendSavedTask)};
}

function appendSavedTask(task) {
  var taskToAdd = createNewTaskElement(task);
  var incomplete = document.getElementsByClassName('list-incompleted')[0];
  var completed = document.getElementsByClassName('list-completed')[0];
  task.completed
    ? completed.insertAdjacentHTML('afterbegin', taskToAdd)
    : incomplete.insertAdjacentHTML('afterbegin', taskToAdd);
}

function getCachedTasks() {
  return JSON.parse(localStorage.getItem('tasks'));
}

function deleteTaskInCache(task) {
  var withoutDeleted = tasks.filter(function(currentTask) {
    return currentTask.task !== task;
  });
  tasks = withoutDeleted;
}

function keypressHandler(e) {
  if (e.keyCode === 13) addTask(e);
}

function cacheAllTasks() {
  if (tasks) localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.getElementById('main').addEventListener('click', clickHandler);
document.addEventListener('DOMContentLoaded', showSavedTasks);
document.addEventListener('keypress', keypressHandler);
window.addEventListener('beforeunload', cacheAllTasks);
