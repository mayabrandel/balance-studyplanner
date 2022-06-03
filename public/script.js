const form = document.getElementById("taskform");
const button = document.querySelector("#taskform > button");

var taskInput = document.getElementById("taskInput");
var tasklist = document.getElementById("tasklist");
var dueDateInput = document.getElementById("dueDateInput");
var completionTimeInput = document.getElementById("completionTimeInput");
var priorityInput = document.getElementById("priorityInput");

button.addEventListener("click", function(event){
    event.preventDefault();
    let task = taskInput.value;
    let dueDate = dueDateInput.value;
    let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;
    let completionTime = completionTimeInput.value;
    

    addTask(task, dueDate, priorityRating, completionTime, false);
    console.log(taskList);
})


var taskListArray = [];

function addTask(taskDescription, dueDate, priorityRating, completionTime, completionStatus) {

    let d = new Date();
    let dateCreated = d.getFullYear();
    let task = {
        taskDescription,
        dueDate,
        dateCreated,
        priorityRating,
        completionTime,
        completionStatus
    };
    taskListArray.push(task);
    displayTask(task);
}

function displayTask(task){
    //create HTML elements
    let item = document.createElement("li");
    item.innerHTML = "<p>" + task.taskDescription + "</p>"; 

    tasklist.appendChild(item);

    //user interaction extra task DOM elements
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("Delete Task");
    delButton.appendChild(delButtonText);
    item.appendChild(delButton);

    //event listeners for DOM elements
    delButton.addEventListener("click", function(event){
        event.preventDefault();
        item.remove();
    })


    //clear the input form
    form.reset();

}