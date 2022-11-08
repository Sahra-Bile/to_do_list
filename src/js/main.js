 
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


      deleteButton.addEventListener("click", removeLocalTodos);
       
    }
  console.log(myList);
}
  
 //! skapa en ny todolist

 function AddNewTodo(event){
  event.preventDefault(); //! avbryter händelsen om den är avbrytbar
  
    let addedTask = new Task (taskInput.value, Math.random(), 
    Task.value, Date.now()); //! metoden ger mig en rondom id 
  
      //! om taskInput är tomt 
      if (taskInput.value ==="") {
       alert("OBS: fyll en task i fältet");
          return false;
      } else{
  
        myList.push(addedTask);
        addToLocalStorage();
        taskInput.value = ""; //! rensar inputfältet så att man kan lägga till en ny task
        createHTML();
      } 
  }

   let addTaskButton = document.createElement('button');
   addTaskButton.innerHTML = 'Add task';
   addTaskButton.classList.add("form__addButton");
   taskForm.appendChild(addTaskButton);


  addTaskButton.addEventListener("click", AddNewTodo);  //! lyssna addTask knappen 


  //! funktion för att spara min array i localStorage 

  const  addToLocalStorage = () => {

    let todoItems = JSON.stringify(myList);
    localStorage.setItem("myList", todoItems);
   }


//! funktion getFromLocalStorage
 window.addEventListener("DOMContentLoaded", () => {
  myList = JSON.parse(localStorage.getItem("myList")).map((addedTask) =>{
      return new Task(addedTask.taskName, addedTask.taskId, addedTask.checked);
  });

  createHTML();
});

//! funktion ta bort en task från localStorage 
function removeLocalTodos(myList) {
  let todos;
  if (localStorage.getItem("myList") === null) {
    myList = [];
  } else {
    todos = JSON.parse(localStorage.getItem("myList"));
  }
   myList.children[0].innerText;
  todos.splice(todos.indexOf(myList), 1);
  localStorage.setItem("myList", JSON.stringify(myList));
}

 
  function deleteTask (event){ 
    let task = event.target; 
    
      if(task.classList[0] === 'top-container__container__taskList__todo__deletBtn'){
        let todo =  task.parentElement;
        removeLocalTodos(todo);
          todo.remove();
       
      }
      
      else if(task.classList[0] === 'top-container__container__taskList__todo__doneBtn'){
        let todo = task.parentElement;
      
        todo.classList.toggle('done'); //! kanske behövs stylas med sass
      }

    }

    taskList.addEventListener("click",deleteTask);  //! lyssna delete knappen 


    //! denna funtion är till för  ta bort allt som finns i todo listan  och även rensa localStorage

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
     

 //!returnerade värdet används för att ordna min arrays värden i alfabetiskt:

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

        topContainer.appendChild(sortAlphabeticalButton); //! placerar den i html 
      
        sortAlphabeticalButton.addEventListener("click",sortMyTaskInAlphabetically); 


//! skapa en funtion som sorterar undone och done todo listorna 
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

// select.addEventListener("click", filterTodo);



    

