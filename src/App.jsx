import { useEffect } from "react";

import { Trash2, Circle, Pencil, CircleCheckBig} from "lucide-react"
import { useState } from "react"

function App() {

  //salva as informações das tarefas em um array de objetos
  //e criamos uma const para armazenar no local storage as informações recebidas via array.
  const [task, setTask] = useState(() => {
    const savedTasks = localStorage.getItem("task");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  //converte o salvo em JSON.
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task))
  }, [task])


  //salva as informações do campo input - do que foi digitado.
  const [taskInput, setTaskInput] = useState("");

  //Adiciona nova tarefa - pega o valor do input adiciona ao novo array newTask.
  const addTask = (e) => {
    e.preventDefault();
  
    //verifica se o input está vazio.
    if(!taskInput || taskInput === ""){
       window.alert("Você deve escrever algo..") 
    }

    if(taskInput.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskInput,
        done: false,
      };

      //seta o valor novo junto com as info já existentes.
      setTask([...task, newTask]);
      console.log(newTask)
      setTaskInput("");
    }   
    
  }

  //função onChange input - value.  
  const handleInput = (e) => {
    setTaskInput(e.target.value)  
  }

  //deletar tarefa com base no ID clicado, passamos o "taskID" como parametro da função, e no botão passamos o parametro "todo" com base no novo array criado..
  const deleteTask = (taskId) => {
    if(window.confirm("Você tem certeza que deseja remover essa tarefa?"))
    setTask(task.filter((t) => t.id !== taskId ));
    console.log(taskId)
  }


  //deletar toda as tarefas
  const deleteAllTasks = () => {
    if(window.confirm("Deseja excluir todas as tarefas?")) {
      setTask([])
    }    
  }

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col items-center py-20 px-3">
      <h1 className="text-3xl font-bold text-white">Todo App</h1>
      <div className="mx-auto p-5 max-w-150 w-full space-y-5">
        <form action="#" className="flex gap-4 bg-slate-800 px-0 rounded-2xl h-12 md:flex-row md:pl-5 md:px-0 " onSubmit={addTask}>
          <input 
            type="text" name="text" id="text" placeholder="Adicione uma nova tarefa.." 
            className="flex-1 focus:outline-none text-white py-3 px-2"
            value={taskInput}
            onChange={handleInput}
          />
            
          <button type="submit" className="cursor-pointer" className="bg-blue-500 px-10 h-full rounded-2xl cursor-pointer text-white hover:bg-blue-500/75 transition-all w-full md:w-0">+</button>
        </form>

        <div className="flex items-center justify-between">
          <p className="text-white">Tarefas criadas <span className="bg-slate-700 text-white rounded-full px-3">{task.length}</span></p>

          {task.length > 0 && 
              <button 
                className="bg-red-400 px-4 h-full rounded-2xl cursor-pointer text-white hover:bg-red-400/75 transition-all disabled:c"
                onClick={deleteAllTasks}
                >
                Deletar todas as tarefas
              </button>} 
        </div>
        <div className="w-full rounded-2xl space-y-3 max-h-130 h-full py-4 overflow-y-hidden">
          <ul className="flex flex-col gap-2 text-white ">
            {task.map((todo) => (
              <li key={todo.id} className="flex py-5 px-4  bg-slate-700 rounded-2xl gap-4">
                <p className="flex-1">{todo.text}</p>                
                <button 
                  className="hover:text-red-400 cursor-pointer transition-all"
                  onClick={() => deleteTask(todo.id)}
                >
                  <Trash2 size={18}/>
                </button>
                
              </li>
            ))}            
          </ul>
          
        </div>
        {task.length > 0 ? (
             null
          ): (
            <p className="text-white text-center">Você não tem tarefas no momento, adicione uma </p>
          )}
      </div>
    </div>
  )
}

export default App
