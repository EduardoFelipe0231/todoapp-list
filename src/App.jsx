import { useEffect } from "react";

import { Trash2, Circle, Pencil, CircleCheckBig, Grid, List, LayoutGrid, Delete, Trash, Plus, Check, CheckCircle, CheckCircle2, CheckCircle2Icon, Moon, Bell, Sun} from "lucide-react"
import { useState } from "react"

import { tabTitle } from "./utils/General";

import { Tooltip } from 'react-tooltip'

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
  }


  //deletar toda as tarefas
  const deleteAllTasks = () => {
    if(window.confirm("Deseja excluir todas as tarefas?")) {
      setTask([])
    }    
  }


  // =============================================================== \\

  //Titulo Página dinâmico
  {task.length > 0 ? (tabTitle(`TodoApp - Você tem ${task.length} tarefa(s)`)) : (tabTitle("TodoApp"))}

  // =============================================================== \\

  //Grid - list Button - usa um ternário na lista se verdadeiro ou falso.
  const [toogleLayout, setToogleLayout] = useState(true)

  // =============================================================== \\

  //DarkMode - LightMode

  const [theme, setTheme] = useState('lighta')
  
  return (
    <div className="bg-zinc-800 min-h-screen flex flex-col items-center text-sm md:text-base">
      <div className="w-full bg-zinc-300 h-50 py-3 px-3 rounded-b-4xl shadow-2xs">
          <header className="container mx-auto flex justify-between items-center gap-5">
              <h3 className="text-sm font-bold md:text-2xl text-zinc-900 flex-1 tracking-wide">Todo List</h3>              
              <button className="bg-zinc-800 hover:bg-zinc-800/75 p-2 rounded-full text-zinc-300 cursor-pointer shadow-2xl transition-all">
                {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
              </button>              
          </header>
          <div className="flex flex-col items-center justify-center ">
              <h1 className="text-center mt-14 text-3xl font-bold">Bom dia, Visitante 😎</h1>
              <p className="font-mono text-zinc-600">Hoje é 08 Jun 2026 </p>  
          </div>          
      </div>

      <div className="mx-auto p-5 max-w-180 w-full space-y-5">
        {/* form */}
        <form action="#" className="flex rounded-sm gap-2" onSubmit={addTask}>

          <input 
            type="text" 
            name="text" 
            id="text" 
            placeholder="Adicionar nova tarefa" 
            value={taskInput}
            onChange={handleInput}
            className="flex-1 text-white py-4 px-2 bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-2xl"
          />
            
          <button
            type="submit" 
            className="bg-indigo-400 px-5 cursor-pointer text-white hover:bg-indigo-400/75 transition-all rounded-2xl"
            
          >
            <Plus size={16}/>
          </button>
        </form>

        {/* info */}
        <div className="flex items-center justify-between gap-3">

          <div className="flex items-center gap-3 flex-1">
            <p className="text-zinc-100">Todas <span className="bg-zinc-700 text-white rounded-full px-3 py-1.5 cursor-pointer hover:text-zinc-300">{task.length}</span></p>
            <p className="text-zinc-500 cursor-pointer hover:text-zinc-300">Ativas </p>
            <p className="text-zinc-500 cursor-pointer hover:text-zinc-300">Concluídas</p>
          </div>

          {/* Deletar botão */}
          {task.length > 0 && 
              <button 
                  className="flex items-center justify-center p-4 gap-1 hover:text-zinc-50 cursor-pointer bg-red-400 hover:bg-red-400/75 transition-all text-white  rounded-2xl"
                  onClick={deleteAllTasks}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Excluir todos os itens"
                  data-tooltip-place="bottom" 
                  >
                  <Trash2 size={16} />
              </button>}

          {/* grid - list */}
          {task.length > 0 &&          
              <div className="flex items-center justify-between text-white bg-zinc-700 rounded-2xl text-sm hover:bg-zinc-700/75 ">
                  <button 
                    className="flex items-center justify-center p-4 gap-1 hover:text-zinc-50 cursor-pointer"
                    onClick={() => {setToogleLayout(!toogleLayout)}}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Layout"
                    data-tooltip-place="bottom" 
                  >
                    {toogleLayout ? <LayoutGrid size={20}/> : <List size={20}/>}
                  </button>
                  <Tooltip id="my-tooltip" />
                </div>          
          }
          
        </div>


        {/* lista - todos */}
        <div className="w-full rounded-2xl space-y-3 h-140 py-4 px-1 overflow-y-auto scrollbar-thumb-zinc-500/60 scrollbar-track-zinc-900/10">
          {toogleLayout ? (
            <ul className="grid grid-cols-1 gap-2 text-white">
              {task.map((todo) => (
                <li key={todo.id} className="flex flex-wrap gap-4 p-5 rounded-2xl bg-zinc-700 items-center border-l-4 border-red-400">
                  <button 
                    className="hover:text-red-400 cursor-pointer transition-all"
                  >
                    <Circle size={16}/>                  
                  </button> 
                  <p className="break-all flex-1">{todo.text}</p>                
                  <button 
                    className="hover:text-zinc-400 cursor-pointer transition-all"
                  >
                    <Pencil size={16}/>                  
                  </button>
                  <button 
                    className="hover:text-red-400 cursor-pointer transition-all"
                    onClick={() => deleteTask(todo.id)}
                  >
                    <Trash2 size={16}/>                  
                  </button>                 
                </li>
              ))}            
            </ul>
          ) : (
            <ul className="grid grid-cols-2 gap-2 text-white">
              {task.map((todo) => (
                <li key={todo.id} className="flex flex-wrap gap-3 px-2 py-6 rounded-2xl bg-zinc-700 items-center border-l-4 border-red-400">
                  <button 
                    className="hover:text-red-400 cursor-pointer transition-all"
                  >
                    <Circle size={16}/>                  
                  </button> 
                  <p className="break-all flex-1">{todo.text}</p>                
                  <button 
                    className="hover:text-zinc-400 cursor-pointer transition-all"
                  >
                    <Pencil size={16}/>                  
                  </button>
                  <button 
                    className="hover:text-red-400 cursor-pointer transition-all"
                    onClick={() => deleteTask(todo.id)}
                  >
                    <Trash2 size={16}/>                  
                  </button>                 
                </li>
              ))}            
            </ul>
          )}          
        </div>             
      </div>
    </div>
  )
}

export default App
