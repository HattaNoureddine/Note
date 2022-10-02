let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store Tasks
let arrayOfTasks = [];
// trigger get data from local storage function 
getDataFromLocalStorage();
// check if theres tasks in local storage
if(localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks")); 
}
//Add Task 
submit.onclick = function (){
    if(input.value !== ""){
        addTaskToArray(input.value); //Add Task To Array Of Tasks
        input.value = ""; // Empty Input Field
    }
};
//click on task element 
tasksDiv.addEventListener("click", (e) => {
    //delete button
    if(e.target.classList.contains("del")){
        //remove task from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        //remove element from page
        e.target.parentElement.remove();
    }
    // task element
    if(e.target.classList.contains("task")){
        //toggle done class
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        //toggle done class
        e.target.classList.toggle("done");
    }
})
function addTaskToArray(taskText) {
     //Task Data 
     const task ={
        id: Date.now(),
        title: taskText,
        completed:false,
     };
     // push Task To Array Of Tasks
     arrayOfTasks.push(task);
     // Add Tasks To Page 
     addElementsToPageFrom(arrayOfTasks);
     // att tasks to page
     addDataToLocalStorageFrom(arrayOfTasks);
    }
    function addElementsToPageFrom(arrayOfTasks){
        //Empty Tasks Div
        tasksDiv.innerHTML = "";
        //Looping On Array Of Tasks
        arrayOfTasks.forEach((task) => {
            // create man div
            let div = document.createElement("div");
            div.className ="task";
            // check if task is done
            if(task.completed){
                div.className ="task-done";
            }
            div.setAttribute("data-id", task.id);
            div.appendChild(document.createTextNode(task.title));
            // create delete button
            let span = document.createElement("span");
            span.className = "del";
            span.appendChild(document.createTextNode("Supprimer"));
            // append button to main div
            div.appendChild(span);
            // add task div to tasks container
            tasksDiv.appendChild(div);

        });
    }
function addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId){
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId){
    for(let i = 0; i < arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}