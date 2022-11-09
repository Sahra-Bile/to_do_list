 
import{Task} from "../module/task";

//! alla todo skall placera denna array
let myList = [];
 
 //! hitta alla elements i index.html byId och className
 let taskForm = document.getElementById('new-task-form'); //! formen 
 let taskInput = document.getElementById('new-task-input'); //! input fältet
 let taskList = document.getElementById('task-list'); //! ul
 let topContainer = document.querySelector('.top-container'); //! secktion
 let container = document.getElementById('todo-container');


const createHTML = () =>{
  taskList.innerHTML = "";
    for(i = 0; i < myList.length; i++){

 let todoTaskDiv = document.createElement('div'); //! skapar en div
 todoTaskDiv.classList.add('top-container__container__taskList__todo'); //! className
 //! placerar diven inne i min ul som finns i html
   taskList.appendChild(todoTaskDiv); 

   let todoTaskList = document.createElement('li'); //! skapar en li tag
     todoTaskList.classList.add('top-container__container__taskList__todo__item')
      todoTaskList.innerText= myList[i].taskName; //!display task Name i skärmen 
     todoTaskDiv.appendChild(todoTaskList);

   let doneTaskButton = document.createElement('button'); //!  skapar en completed task button
         doneTaskButton.innerHTML = `<i class="fas fa-check"></i>`;
       doneTaskButton.classList.add('top-container__container__taskList__todo__doneBtn'); //! className 
       todoTaskDiv.appendChild(doneTaskButton);
     

     let deleteButton = document.createElement('button'); //! skapar en delete button för en task
        deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
       deleteButton.classList.add('top-container__container__taskList__todo__deletBtn');  
       todoTaskDiv.appendChild(deleteButton); 

      deleteButton.addEventListener("click", ()=>{
        removeLocalTodos(i)
      });
    
    }
  console.log(myList);
}
  
function AddNewTodo(event){
    event.preventDefault(); //! Avbryter händelsen om den är avbrytbar, vilket innebär att standardåtgärden som hör till händelsen inte kommer att inträffa
    
      let addedTask = new Task (taskInput.value, Math.random()); //! metoden ger mig en rondom id 
    
        //! om taskInput är tomt 
        if (taskInput.value ==="") {
         alert("OBS: fyll en task i fältet");
            return false;
        } else{
    
          myList.push(addedTask);
          addToLocalStorage();
          createHTML();
          taskInput.value = ""; //! rensar inputfältet så att man kan lägga till en ny task
         
      } 
    }

   let addTaskButton = document.createElement('button');
   addTaskButton.innerHTML = 'Add task';
   addTaskButton.classList.add("form__addButton");
   taskForm.appendChild(addTaskButton);
  addTaskButton.addEventListener("click", AddNewTodo);  //! lyssna addTask knappen 

 

  const  addToLocalStorage = () => {
   let todoItems = JSON.stringify(myList);
    localStorage.setItem("myList", todoItems);
   }


//! funktion getFromLocalStorage
function getTodosFromls() {

    if (localStorage.getItem("myList") === null) {
      myList = [];
    } else {
      myList = JSON.parse(localStorage.getItem("myList"));
    }
    createHTML();
  }

  document.addEventListener("DOMContentLoaded", getTodosFromls);


  const  clearAllTask = () =>{
 
    localStorage.clear(); //! rensar localStorage 
    window.location.reload(); //! rensar skärmen 
    }
      //! ta bort alla task som finns i todolistan 
    let deleteAllButton = document.createElement('button');
    deleteAllButton.innerHTML ="delete all";
    deleteAllButton.classList.add("top-container__deleteAll_Btn");
    topContainer.appendChild(deleteAllButton);
 deleteAllButton.addEventListener("click", clearAllTask);  //! lyssna rensa allt knappen


//! ta bort en sak åt gången 
function removeLocalTodos(index) {
   myList.splice(index,1)
   addToLocalStorage();

  }

  const completedTsk = (event) =>{
    let task = event.target; 
    if(task.classList[0] === 'top-container__container__taskList__todo__doneBtn'){
      let todo = task.parentElement;
      todo.classList.toggle('done'); 
     
    } 
  }
  taskList.addEventListener("click",completedTsk);
           

function deleteTask (event){ 
    let task = event.target; 
      if(task.classList[0] === 'top-container__container__taskList__todo__deletBtn'){
        let todo =  task.parentElement;
        removeLocalTodos(); //! ta bort från localstorage
          todo.remove(); //! ta bort från skärmen 
      }
    }

    taskList.addEventListener("click",deleteTask);  //! lyssna delete knappen 


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
      addToLocalStorage();  
     }
  
     sortAlphabeticalButton = document.createElement('button'); //! skapar en sort button
     sortAlphabeticalButton.innerHTML = " Alphabetize";   //! namger
     sortAlphabeticalButton.classList.add('top-container__sortButton'); //! ger className 

     topContainer.appendChild(sortAlphabeticalButton); //! placerar den i top-container div 
   
     sortAlphabeticalButton.addEventListener("click",sortMyTaskInAlphabetically); 
 
 
   


//! skapa en funtion som filter undone och done todo listorna 
const selectDiv = document.createElement('div');
selectDiv.classList.add("top-container__filter")
topContainer.appendChild(selectDiv);

const select = document.createElement('select');
select.classList.add("top-container__filter__todoFilter")
selectDiv.appendChild(select);


const option1 = document.createElement('option');
option1.value = "all";
option1.innerText = "all";
option1.classList.add("top-container__filter__todoFilter__option")
select.appendChild(option1);

const option2 = document.createElement('option');
option2.value = "completed";
option2.innerText = "completed";
option2.classList.add("top-container__filter__todoFilter__option")
select.appendChild(option2)

const option3 = document.createElement('option');
option3.value = "uncompleted";
option3.innerText = "uncompleted";
option3.classList.add("top-container__filter__todoFilter__option")
select.appendChild(option3)



