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


button.addEventListener("click", function(event){
    console.log('buttonclicked');
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
    taskform.reset();

}

function displayUpcomingTask(task){
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
    taskform.reset();

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


//Timer

let hr = min = sec = "0" + 0;
let startTimer;

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);


function start() {
    startBtn.classList.add("active");
    stopBtn.classList.remove("stopActive");

    startTimer = setInterval(()=>{
        sec++
        sec = sec < 10 ? "0" + sec : sec;

        if(sec == 60){
            min++;
            min = min < 10 ? "0" + min : min;
            sec = "0" + 0;
        }
        if(sec == 60){
            min++;
            min = min < 10 ? "0" + min : min;
            sec = "0" + 0;
        }
        if(min == 60){
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

//dictionary try1 - 

    submitbutton.addEventListener("click", function(event){
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
    request.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en/'+searchWord.value, true);

    //function that runs when response comes from api
    request.onload = function() {
        var data = JSON.parse(this.response);

        //if no errors
        if (request.status >= 200 && request.status < 400) {
          word = data.word;

            while (meaning.firstChild) {
            meaning.removeChild(meaning.firstChild);
             }
             console.log(data.meanings);
            for (let i = 0; i < data["meanings"].length; i++) {
                var definitions = data.meanings[i].definitions;
                for (let j = 0; j < definitions.length; j++) {
                    //create HTML elements
                    let item = document.createElement("li");
                    item.innerHTML = "<p>" + definitions[j].definition + "</p>"; 
                    meaning.appendChild(item);

                     }
            
                }

          //meaning.innerHTML = data.text;
          //synonyms.innerHTML = data.text;  
        }else{
          word.innerHTML = "Error";
          meaning.innerHTML = "Error";  
          
          //synonyms.innerHTML = "Error";  
        }
      }
      request.send();

}








