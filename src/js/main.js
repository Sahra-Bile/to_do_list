 
import{Task} from "../module/task";

//! fråga Sebastian om varför pausas din window.load när du refreshar hemsidan när du är i devtools?
window.addEventListener("load", () => {
  myList = JSON.parse(localStorage.getItem("myList")).map((addedTask)=>{
      return new Task(addedTask.taskName, addedTask.taskId, addedTask.checked);
  });

  createHTML();
})

 //! hitta alla elements i index.html byId
 let taskForm = document.getElementById('"new-task-form'); //! formen 
 let taskInput = document.getElementById('new-task-input'); //! input fältet
 let addTaskButton = document.getElementById('new-task-submit');//!lägg till button
 let taskList = document.getElementById('task-list'); //! ul
 let deleteAllButton = document.getElementById('deleteAll')//! rensa allt button



//! alla todo skall placera denna array
 let myList = [];
 

  const createHTML = () => {
    taskList.innerHTML = "";
    for(i = 0; i < myList.length; i++){


       let todoTaskDiv = document.createElement('div'); //! skapar en div
       todoTaskDiv.classList.add('top-container__container__taskList__todo'); //! className


       let todoTaskList = document.createElement('li'); //! skapar en li tag
       todoTaskList.classList.add('top-container__container__taskList__todo__item')
       todoTaskList.innerText= myList[i].taskName; //!display task Name i skärmen 
      


       let doneTaskButton = document.createElement('button'); //!  skapar en completed task button
       doneTaskButton.innerHTML = "done";
       doneTaskButton.classList.add('top-container__container__taskList__todo__doneBtn'); //! className 
     



      let deleteButton = document.createElement('button'); //! skapar en delete button för en task
      deleteButton.innerHTML = 'delete';
      deleteButton.classList.add('top-container__container__taskList__todo__deletBtn');        //! className 
    
       //! placerar li tagen i diven 
       todoTaskDiv.appendChild(todoTaskList); 
       todoTaskDiv.appendChild(doneTaskButton);
       todoTaskDiv.appendChild(deleteButton);


     //! placerar diven inne i min ul som finns i html
       taskList.appendChild(todoTaskDiv); 

       deleteButton.addEventListener("click", () => {
        myList.splice([i],1);
        localStorage.setItem("myList", JSON.stringify(myList));
       
    });
    }

    console.log(myList);

  }
  //! funktion för att lägga min array i localStorage 

  const  addToLocalStorage = () => {

    let todoItems = JSON.stringify(myList);
    localStorage.setItem("myList", todoItems);
  
   }


 //! skapa en ny todolist

   function AddNewTask(event){
    event.preventDefault(); //! avbryter händelsen om den är avbrytbar
    
  let addedTask = new Task (taskInput.value, Math.random(), Task.value, Date.now()); //! metoden ger mig en rondom id 
    
        //! om taskInput är tomt 
        if (taskInput.value ==="") {
         alert("OBS: fyll en task i fältet");
            return false;
        } else{
    
          myList.push(addedTask);
          addToLocalStorage();
          taskInput.value = "";
          createHTML();
    
        }
    }
    addTaskButton.addEventListener("click", AddNewTask);  //! lyssna addTask knappen 

    
  //! funktion för att ta bort en todolist
  //! funkar inte riktigt tas inte bort från localStorage 
    function deleteTask (event){ 
      let task = event.target; 
      
        if(task.classList[0] === 'top-container__container__taskList__todo__deletBtn'){
          let todo =  task.parentElement;
          todo.remove();
        }
        
        else if(task.classList[0] === 'top-container__container__taskList__todo__doneBtn'){
          let todo = task.parentElement;
        
          todo.classList.toggle('done'); //! kanske behövs stylas med sass

          myList.pop.length(AddNewTask());
      
         localStorage.removeItem(AddNewTask()); //! funkar inte få bort en todo i arraylistan
        }

      }

      taskList.addEventListener("click",deleteTask);  //! lyssna delete knappen 


    //! denna funtion är till för  ta bort allt som finns i todo listan  och även rensa localStorage

      const  clearAllTask = () =>{
 
        localStorage.clear(); //! rensar localStorage 
        window.location.reload(); //! rensar skärmen 
        
        }
        
           //! ta bort alla task som finns i todolistan 

        deleteAllButton.addEventListener("click", clearAllTask);  //! lyssna rensa allt knappen 
     