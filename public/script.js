//variables for task feature
const taskform = document.getElementById("taskform");
const button = document.querySelector("#taskform > button");
const submitbutton = document.getElementById("dictionarybutton");

//variables for task list
var taskInput = document.getElementById("taskInput");
var tasklist = document.getElementById("tasklist");
var upcomingtasklist = document.getElementById("upcomingtasklist");
var dueDateInput = document.getElementById("dueDateInput");
var completionTimeInput = document.getElementById("completionTimeInput");
var priorityInput = document.getElementById("priorityInput");

//variables for dictionary
var word = document.getElementById("wordInput")
var meaning = document.getElementById("meaning")
var synonyms = document.getElementById("synonyms")

//variable for timer buttons
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");

//variables for Kanban board
var kanbanList = document.getElementById("kanbanList");
var kanbanList1 = document.getElementById("kanbanList1");
var kanbanList2 = document.getElementById("kanbanList2");

//button task form function - calls addTask function to create task
button.addEventListener("click", function (event) {
    console.log('buttonclicked');
    event.preventDefault();
    let task = taskInput.value;
    let dueDate = dueDateInput.value;
    let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;
    let completionTime = completionTimeInput.value;

    addTask(task, dueDate, priorityRating, completionTime, false);
})

//variable for task List array
var taskListArray = [];

//addTask function with all inputs - same as form to add task
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
    refreshtasklist();

}

//function to display tasks
function displayUpcomingTask(task) {

    console.log('displaying task');
    //create HTML elements
    let item = document.createElement("li");
    item.innerHTML = "<p>" + task.taskDescription + '    ' + task.dueDate + "</p>";

    //add item into list
    upcomingtasklist.appendChild(item);

    //user interactive displayed delete button to remove task
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("Delete Task");
    delButton.appendChild(delButtonText);
    item.appendChild(delButton);

    //event listeners for DOM elements
    delButton.addEventListener("click", function (event) {
        event.preventDefault();
        //item.remove();
        var index = taskListArray.indexOf(task);
        if (index !== -1) {
            taskListArray.splice(index, 1);
        }
        //runs refreshtasklist function
        refreshtasklist();
    })

    //clear the input form
    taskform.reset();

}

//Refreshes all used task lists
function refreshtasklist() {

    //checking all lists and clears their tasks
    while (upcomingtasklist.firstChild) {
        upcomingtasklist.removeChild(upcomingtasklist.firstChild);
    }

    while (tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
    }

    while (kanbanList.firstChild) {
        kanbanList.removeChild(kanbanList.firstChild);
    }

    while (kanbanList1.firstChild) {
        kanbanList1.removeChild(kanbanList1.firstChild);
    }

    while (kanbanList2.firstChild) {
        kanbanList2.removeChild(kanbanList2.firstChild);
    }

    //Adds all current tasks and runs display functions to display current list
    for (let i = 0; i < taskListArray.length; i++) {
        displayUpcomingTask(taskListArray[i]);
        displayMovableTasks(taskListArray[i]);
        //displayTask(taskListArray[i]);
    }

}


//Timer

//Tutorial was followed from: https://www.youtube.com/watch?v=tREjO_eAPL0 , for basic functionality but adapted to suit needs
let hr = min = sec = "0" + 0;
let startTimer;

//Button interaction
startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);

//Counting up function
function start() {
    //Activating and disactivating the start and stop buttons
    startBtn.classList.add("active");
    stopBtn.classList.remove("stopActive");

    //Giving the startTimer variable loops to begin counting up and displaying through putValue function
    startTimer = setInterval(() => {
        sec++
        sec = sec < 10 ? "0" + sec : sec;

        if (sec == 60) {
            min++;
            min = min < 10 ? "0" + min : min;
            sec = "0" + 0;
        }
        if (sec == 60) {
            min++;
            min = min < 10 ? "0" + min : min;
            sec = "0" + 0;
        }
        if (min == 60) {
            hr++;
            hr = hr < 10 ? "0" + hr : hr;
            min = "0" + 0;
        }

        putValue();
    }, 1000);
}

//Timer stop function
function stop() {
    //Disactivates the start button and activates the stop button and stops the startTimer
    startBtn.classList.remove("active");
    stopBtn.classList.add("stopActive");
    clearInterval(startTimer);
}

//Timer reset function
function reset() {
    //Disactivates the start button and stop button, stops the startTimer and runs putValue to change number values to 0
    startBtn.classList.remove("active");
    stopBtn.classList.remove("stopActive");
    clearInterval(startTimer);
    hr = min = sec = "0" + 0;
    putValue();
}

//Re-writes hr, min, sec values to the HTML
function putValue() {
    document.querySelector(".second").innerText = sec;
    document.querySelector(".minute").innerText = min;
    document.querySelector(".hour").innerText = hr;
}


//Kanban Board

//Functions taken from online tutorial: https://karthikdevarticles.com/creating-a-kanban-board-with-html-css-and-javascript , 
//but adapted to display and move tasks from the task list

//Drag function
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

//Allows to be drop
function allowDrop(ev) {
    ev.preventDefault();
}

//Drop function
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

//New display function for movable tasks
function displayMovableTasks(task) {
    console.log('displaying moving tasks');
    //create HTML elements
    let item = document.createElement("div");

    //setting moveable attributes
    item.setAttribute("draggable", "true");
    item.setAttribute("ondragstart", "drag(event)")
    item.setAttribute("class", "task");
    item.setAttribute("id", task.taskDescription);

    //displaying item onto kanbanList
    item.innerHTML = "<span>" + task.taskDescription + '    ' + task.dueDate + "</span>";
    console.log(kanbanList);
    kanbanList.appendChild(item);

}

//Dictionary, Online API: https://dictionaryapi.dev/  

//New disctionary submit button that runs searchdictionary function
submitbutton.addEventListener("click", function (event) {
    console.log('searchedword');
    event.preventDefault();

    searchdictionary();

})

//Searches inputted word in online API and displays response
function searchdictionary() {

    console.log('searching dictionary');

    //requesting word from the api
    var searchWord = document.getElementById('searchWord');
    console.log(searchWord.value);
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/' + searchWord.value, true);

    //function that runs when response comes from api
    request.onload = function () {
        var data = JSON.parse(this.response);

        //if no errors loops through API response of meanings and synonyms and clears then displays new
        if (request.status >= 200 && request.status < 400) {
            word = data[0].word;
            console.log(data);

            while (meaning.firstChild) {
                meaning.removeChild(meaning.firstChild);
            }

            while (synonyms.firstChild) {
                synonyms.removeChild(synonyms.firstChild);
            }

            //loops through meanings list in API response
            console.log(data[0].meanings);
            for (let i = 0; i < data[0].meanings.length; i++) {
                var definitions = data[0].meanings[i].definitions;

                console.log(definitions.length);
                //loops through definitions list inside meanings and appends HTML element to list 
                for (let j = 0; j < definitions.length; j++) {
                    //create HTML elements
                    let item = document.createElement("li");
                    item.innerHTML = "<p>" + definitions[j].definition + "</p>";
                    meaning.appendChild(item);
                    if (j === 4) {
                        break;
                    }

                }
                console.log(meaning.children.length);
                //breaks out if list is longer than 6
                if (meaning.children.length === 6) {
                    break;
                }
            }

            //HTML element "Synonyms:" appended to list
            let textsynonym = document.createElement("ul");
            textsynonym.innerHTML = "<p>" + "Synonyms:" + "</p>";
            meaning.appendChild(textsynonym);

            console.log(data[0].meanings[0].synonyms)
            //Loops through synonym list inside meanings list in the response
            for (let k = 0; k < data[0].meanings[0].synonyms.length; k++) {
                //create HTML elements
                let item = document.createElement("li");
                item.innerHTML = "<p>" + data[0].meanings[0].synonyms[k] + "</p>";
                //Synonym item appended to the list
                meaning.appendChild(item);
                if (k === 6) {
                    break;
                }

            }

        } else {
            word.innerHTML = "Error";
            meaning.innerHTML = "Error";
            synonyms.innerHTML = "Error";
        }
    }
    request.send();
}








