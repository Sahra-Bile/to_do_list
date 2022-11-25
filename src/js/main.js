 
import{Task} from "../module/task";

let myList =  [];
 
 let taskForm = document.getElementById('new-task-form'); 
 let taskInput = document.getElementById('new-task-input'); 
 let taskList = document.getElementById('task-list'); 
 let topContainer = document.querySelector('.top-container');

const createHTML = () =>{
  taskList.innerHTML = "";

    for(let i = 0; i < myList.length; i++){

 let todoTaskDiv = document.createElement('div'); 
 todoTaskDiv.classList.add('top-container__container__taskList__todo'); 

   taskList.appendChild(todoTaskDiv); 
   let doneTaskButton = document.createElement('button'); //!  skapar en completed task button
   let todoTaskList = document.createElement('li'); 
   if (myList[i].checked) {
    todoTaskList.classList.add('top-container--checked')
  }

  todoTaskList.classList.add('top-container__container__taskList__todo__item')
      todoTaskList.innerText = myList[i].taskName; 
      
      doneTaskButton.addEventListener("click", () =>{
        completedTsk(myList[i]); //! funktionen completedTask 
        
      });
     todoTaskDiv.appendChild(todoTaskList);

 
         doneTaskButton.innerHTML = `<i class="fas fa-check"></i>`;
       doneTaskButton.classList.add('top-container__container__taskList__todo__doneBtn'); //! className 
       todoTaskDiv.appendChild(doneTaskButton);
  
     
     let deleteButton = document.createElement('button'); //! skapar en delete button för en task
        deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
       deleteButton.classList.add('top-container__container__taskList__todo__deletBtn');  
       todoTaskDiv.appendChild(deleteButton); 

       deleteButton.addEventListener("click", ()=>{
        removeLocalTodos([i])
      });
    }

}
  
function AddNewTodo(event){
    event.preventDefault();
    const id = Math.round(Math.random() * 100 + 1);//! metoden ger mig en rondom id  upp till 100
      let addedTask = new Task (taskInput.value, id, false); 
    
        //! om taskInput är tomt 
        if (taskInput.value ==="" || taskInput.value === null) {
         alert("OBS: fyll en task i fältet");
        } else{
    
          console.log("Todas har skapat", myList);
          myList.push(addedTask);
          addToLocalStorage();
          createHTML();
          taskInput.value = ""; 
         
      } 
    }

  
   let addTaskButton = document.createElement('button');
   addTaskButton.innerHTML = 'Add task';
   addTaskButton.classList.add("form__addButton");
   taskForm.appendChild(addTaskButton);
  addTaskButton.addEventListener("click", AddNewTodo);


//! ta bort en sak åt gången från listan
function removeLocalTodos(index) { //! index = i
  myList.splice(index ,1)
  addToLocalStorage();
 }

//! sparar i localStrage
  const addToLocalStorage = () => {
   let todoItems = JSON.stringify(myList);
    localStorage.setItem("myList", todoItems);
   }

// //! funktion getFromLocalStorage
function getTodosFromls() {

    if (localStorage.getItem("myList") === null) {
      myList = [];
    } else {
      myList = JSON.parse(localStorage.getItem("myList")).map((addedTask)=>{
        return new Task(addedTask.taskName, addedTask.taskId,addedTask.checked);
    });
    }
    createHTML();
  }

  document.addEventListener("DOMContentLoaded", getTodosFromls);


  const  clearAllTask = () =>{
 
    localStorage.clear(); 
    window.location.reload(); 
    }
    
    let deleteAllButton = document.createElement('button');
    deleteAllButton.innerHTML ="delete all";
    deleteAllButton.classList.add("top-container__deleteAll_Btn");
    topContainer.appendChild(deleteAllButton);
  deleteAllButton.addEventListener("click", clearAllTask);  


  const completedTsk = (todo) =>{
    todo.checked = !todo.checked;
    createHTML(myList);
    addToLocalStorage();
    console.log("todos checked yeah!!!", myList)
    } 

  function deleteTask (event){ 
    let task = event.target; 
      if(task.classList[0] === 'top-container__container__taskList__todo__deletBtn'){
        let todo = task.parentElement;
          todo.remove(); //! ta bort från skärmen 
      }
    }

    taskList.addEventListener("click",deleteTask);  //! kopplar addEventListener min ul stället


 function sortMyTaskInAlphabetically() {
    myList.sort(function (a, b) {
      if (a.taskName < b.taskName) {
       return -1;
        }
        else  if (a.taskName > b.taskName) {
           return 1;
         }
         return 0;
       });

       createHTML();
      addToLocalStorage();  //! efter sortering spara i localStorage dvs byt ut indexof platsten 
     }
  
     sortAlphabeticalButton = document.createElement('button'); //! skapar en sort button
     sortAlphabeticalButton.innerHTML = " Alphabetize";   //! namger
     sortAlphabeticalButton.classList.add('top-container__sortButton'); //! ger className 

     topContainer.appendChild(sortAlphabeticalButton); //! placerar den i top-container div 
   
     sortAlphabeticalButton.addEventListener("click",sortMyTaskInAlphabetically);

console.log(myList);