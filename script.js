document.addEventListener('DOMContentLoaded', () => {
    // Get references to the add task button, task input field, and task list
    const addButton = document.getElementById('add-task-btn')
    const taskInput = document.getElementById('task-input')
    const taskList = document.getElementById('task-list')

    // Load tasks from Local Storage
    let tasks = loadTasksFromLocalStorage()

    // Define a function to add a new task to the list
    function addTask() {
        // Get the text entered by the user, trimming any whitespace
        const taskText = taskInput.value.trim()

        // Check if the user entered a task (i.e., the text is not empty)
        if (taskText === "") {
            // If no task was entered, alert the user
            alert("Please enter a task");
        } else {
            // Create a new list item for the task
            const taskListItem = document.createElement('li');
            taskListItem.textContent = taskText;

            // Create a remove button for the task
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.className = 'remove-btn'

            // Define the behavior for when the remove button is clicked
            removeButton.onclick = function () {
                // Remove the task list item from the task list
                taskList.removeChild(taskListItem);

                // Remove the task from the tasks array
                const taskIndex = tasks.indexOf(taskText);
                if (taskIndex !== -1) {
                    tasks.splice(taskIndex, 1);
                }

                // Save the updated tasks array to Local Storage
                saveTasksToLocalStorage(tasks);
            };

            // Add the remove button to the task list item
            taskListItem.appendChild(removeButton);

            // Add the task list item to the task list
            taskList.appendChild(taskListItem);

            // Add the task to the tasks array
            tasks.push(taskText);

            // Save the updated tasks array to Local Storage
            saveTasksToLocalStorage(tasks);

            // Clear the task input field
            taskInput.value = '';
        }
    }

    // Add an event listener to the add task button to call addTask when clicked
    addButton.addEventListener('click', addTask);

    //Invoke the addTask function on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', addTask)

    // Add an event listener to the task input field to call addTask when Enter is pressed
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Function to load tasks from Local Storage
    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            return JSON.parse(storedTasks);
        } else {
            return [];
        }
    }

    // Function to save tasks to Local Storage
    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Populate the task list with tasks from Local Storage
    tasks.forEach((task) => {
        const taskListItem = document.createElement('li');
        taskListItem.textContent = task;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn'

        removeButton.onclick = function () {
            taskList.removeChild(taskListItem);

            const taskIndex = tasks.indexOf(task);
            if (taskIndex !== -1) {
                tasks.splice(taskIndex, 1);
            }

            saveTasksToLocalStorage(tasks);
        };

        taskListItem.appendChild(removeButton);
        taskList.appendChild(taskListItem);
    });
});