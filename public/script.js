const form = document.getElementById("taskform");
const button = document.querySelector("#taskform > button");

var taskInput = document.getElementById("taskInput");
var tasklist = document.getElementById("tasklist");
var upcomingtasklist = document.getElementById("upcomingtasklist");
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
    //displayTask(task);
    displayUpcomingTask(task);
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
        //item.remove();
        var index = taskListArray.indexOf(task);
        if (index !== -1) {
            taskListArray.splice(index, 1);
        }
        refreshtasklist();
    })

    //clear the input form
    form.reset();

}

function displayUpcomingTask(task){
    //create HTML elements
    let item = document.createElement("li");
    item.innerHTML = "<p>" + task.taskDescription + '    ' + task.dueDate + "</p>"; 

    upcomingtasklist.appendChild(item);

    //user interaction extra task DOM elements
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("Delete Task");
    delButton.appendChild(delButtonText);
    item.appendChild(delButton);

    //event listeners for DOM elements
    delButton.addEventListener("click", function(event){
        event.preventDefault();
        //item.remove();
        var index = taskListArray.indexOf(task);
        if (index !== -1) {
            taskListArray.splice(index, 1);
        }
        refreshtasklist();
    })

    //clear the input form
    form.reset();

}

function refreshtasklist(){

    //reorder by dates
    taskListArray.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.dueDate) - new Date(a.dueDate);
      });

    while (upcomingtasklist.firstChild) {
        upcomingtasklist.removeChild(upcomingtasklist.firstChild);
    }

    while (tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
    }

    for (let i = 0; i < taskListArray.length; i++) {
        displayUpcomingTask(taskListArray[i]);
        displayTask(taskListArray[i]);
      }

}