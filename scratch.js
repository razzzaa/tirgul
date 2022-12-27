flatpickr("#dueDate", {
    dateFormat: 'd/m/Y H:i',
    enableTime: true,
    time_24hr: true
});

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
};

function reloadTasks() {
    document.getElementById('tasks').innerHTML = '';

    let isDone = false;
    let count = 0;
    for (task of tasks) {
        let isDone = ''
        if (task.isDone === true) {
            isDone = 'done';
        }
        document.getElementById('tasks').innerHTML += `
    <tr class=${isDone}>
        <th scope="row">${count + 1}</th>
        <td>${task.title}</td>
        <td>${task.due}</td>
        <td>${task.status}</td>
        <td>
                <button type="button" class="btn btn-danger btn-delete " data-id=${count}>Delete</button>
                <button type="button" class="btn btn-success ms-1 btn-done " data-id=${count}>Done</button>
                <button type="button" class="btn btn btn-light ms-1 btn-restore " data-id=${count}>Restore</button>
            </td>
    </tr>
    `
        count++
    }
};

document.getElementById('addTodo').addEventListener('click', function () {
    tasks.push({
        title: document.getElementById('writeTodo').value,
        due: document.getElementById('dueDate').value,
        status: 'In progress'
    });
    localStorage.setItem('tasks', JSON.stringify(tasks))
    reloadTasks()
});

document.getElementById('tasks').addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-delete')) {
        const myId = event.target.getAttribute('data-id')
        tasks.splice(myId, 1)
    }

    if (event.target.classList.contains('btn-done')) {
        const myId = event.target.getAttribute('data-id');
        tasks[myId].status = 'Done';
        tasks[myId].isDone = true;
    }

    if (event.target.classList.contains('btn-restore')) {
        const myId = event.target.getAttribute('data-id');
        tasks[myId].status = 'In progress';
        tasks[myId].isDone = false;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks))
    reloadTasks()


});

reloadTasks()




