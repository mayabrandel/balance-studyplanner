const taskform = document.getElementById("taskform");
const button = document.querySelector("#taskform > button");
const submitbutton = document.getElementById("dictionarybutton");

var taskInput = document.getElementById("taskInput");
var tasklist = document.getElementById("tasklist");
var upcomingtasklist = document.getElementById("upcomingtasklist");
var dueDateInput = document.getElementById("dueDateInput");
var completionTimeInput = document.getElementById("completionTimeInput");
var priorityInput = document.getElementById("priorityInput");

var word = document.getElementById("wordInput")
var meaning = document.getElementById("meaning")
var synonyms = document.getElementById("synonyms")

const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");

var kanbanList = document.getElementById("kanbanList");


button.addEventListener("click", function (event) {
    console.log('buttonclicked');
    event.preventDefault();
    let task = taskInput.value;
    let dueDate = dueDateInput.value;
    let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;
    let completionTime = completionTimeInput.value;


    addTask(task, dueDate, priorityRating, completionTime, false);
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
    refreshtasklist();

}

function displayTask(task) {
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
    delButton.addEventListener("click", function (event) {
        event.preventDefault();
        //item.remove();
        var index = taskListArray.indexOf(task);
        if (index !== -1) {
            taskListArray.splice(index, 1);
        }
        refreshtasklist();
    })

    //clear the input form
    taskform.reset();

}

function displayUpcomingTask(task) {
    console.log('displaying task');
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
    delButton.addEventListener("click", function (event) {
        event.preventDefault();
        //item.remove();
        var index = taskListArray.indexOf(task);
        if (index !== -1) {
            taskListArray.splice(index, 1);
        }
        refreshtasklist();
    })

    //clear the input form
    taskform.reset();

}

function refreshtasklist() {

    //reorder by dates
    taskListArray.sort(function (a, b) {
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

    while (kanbanList.firstChild) {
        kanbanList.removeChild(kanbanList.firstChild);
    }

    for (let i = 0; i < taskListArray.length; i++) {
        displayUpcomingTask(taskListArray[i]);
        displayMovableTasks(taskListArray[i]);
        console.log(taskListArray[i]);
        //displayTask(taskListArray[i]);
    }

}


//Timer

let hr = min = sec = "0" + 0;
let startTimer;

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);


function start() {
    startBtn.classList.add("active");
    stopBtn.classList.remove("stopActive");

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

function stop() {
    startBtn.classList.remove("active");
    stopBtn.classList.add("stopActive");
    clearInterval(startTimer);
}

function reset() {
    startBtn.classList.remove("active");
    stopBtn.classList.remove("stopActive");
    clearInterval(startTimer);
    hr = min = sec = "0" + 0;
    putValue();
}

function putValue() {
    document.querySelector(".second").innerText = sec;
    document.querySelector(".minute").innerText = min;
    document.querySelector(".hour").innerText = hr;
}


//Kanban Board

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function displayMovableTasks(task) {
    console.log('displaying moving tasks');
    //create HTML elements
    let item = document.createElement("div");

    item.setAttribute("draggable", "true");
    item.setAttribute("ondragstart", "drag(event)")
    item.setAttribute("class", "task");
    item.setAttribute("id", task.taskDescription);

    item.innerHTML = "<span>" + task.taskDescription + '    ' + task.dueDate + "</span>";
    console.log(kanbanList);
    kanbanList.appendChild(item);


}

//dictionary  

submitbutton.addEventListener("click", function (event) {
    console.log('searchedword');
    event.preventDefault();

    searchdictionary();

})





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

        //if no errors
        if (request.status >= 200 && request.status < 400) {
            word = data[0].word;
            console.log(data);

            while (meaning.firstChild) {
                meaning.removeChild(meaning.firstChild);
            }

            while (synonyms.firstChild) {
                synonyms.removeChild(synonyms.firstChild);
            }

            console.log(data[0].meanings);
            for (let i = 0; i < data[0].meanings.length; i++) {
                var definitions = data[0].meanings[i].definitions;

                console.log(definitions.length);
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
                if (meaning.children.length === 6) {
                    break;
                }



            }

            let textsynonym = document.createElement("ul");
            textsynonym.innerHTML = "<p>" + "Synonyms:" + "</p>";
            meaning.appendChild(textsynonym);

            console.log(data[0].meanings[0].synonyms)
            for (let k = 0; k < data[0].meanings[0].synonyms.length; k++) {
                //create HTML elements
                let item = document.createElement("li");
                item.innerHTML = "<p>" + data[0].meanings[0].synonyms[k] + "</p>";
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








