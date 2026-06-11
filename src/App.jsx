import { useEffect, useState } from "react";
import { tabTitle} from "./utils/General";
import { Tooltip } from 'react-tooltip'
import NotTasks from './Components/NotTasks'

import { 
  Trash2, 
  Circle, 
  Pencil, 
  CircleCheckBig, 
  Grid, 
  List, 
  LayoutGrid, 
  Delete, 
  Trash, 
  Plus, 
  Check, 
  CheckCircle, 
  CheckCircle2, 
  CheckCircle2Icon, 
  Moon, 
  Bell, 
  Sun,
  Bus,
  StarIcon} 
from "lucide-react"
import Header from "./Components/Header";
import { ToastContainer, toast, Bounce, Zoom} from 'react-toastify';

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
       toast.warning("Você precisa digitar alguma tarefa, tente novamente")
    }

    if(taskInput.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskInput,
        done: false,
      };

      //seta o valor novo junto com as info já existentes.
      setTask([...task, newTask]);
      toast.success("Tarefa adicionada com sucesso")
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
    toast.success("Deletou essa tarefa")
  }


  //deletar toda as tarefas
  const deleteAllTasks = () => {
    const confirmed = window.confirm("Deseja excluir todas as tarefas?")

     if(confirmed) {
        setTask([])
        toast.info("Tarefas excluidas com sucesso")
     }  
  }

  // =============================================================== \\

  //Titulo Página dinâmico
  {task.length > 0 ? (tabTitle(`TodoApp - Você tem ${task.length} tarefa(s)`)) : (tabTitle("TodoApp"))}

  // =============================================================== \\

  //Grid - list Button - usa um ternário na lista se verdadeiro ou falso.
  const [toogleLayout, setToogleLayout] = useState(true)

  // =============================================================== \\ 

    const contextClass = {
    success: "bg-emerald-50 border border-emerald-900 text-emerald-900 font-zinc-200",
    error: "bg-rose-100 border border-red-800 text-red-800",
    info: "bg-cyan-50 border border-teal-900 text-teal-900",
    warning: "bg-amber-50 border border-yellow-950 text-yellow-950",
    default: "bg-emerald-50 border border-emerald-900 text-emerald-900",
    dark: "bg-emerald-50 border border-emerald-900 text-emerald-900",
  };
    
  return (
    
    <div className="min-h-screen flex flex-col items-center text-sm md:text-base bg-slate-100">
      <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || "default"] +
          " relative flex p-6 min-h-17 rounded-lg overflow-hidden cursor-pointer flex items-center justify-center"
        }
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
        />

      {/* Component Header */}
      <Header />

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
            className="flex-1 py-4 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-2xl bg-slate-200/60 border border-gray-200"
            autoComplete="off"
          />
            
          <button
            type="submit" 
            className="px-5 cursor-pointer transition-all rounded-2xl bg-indigo-400 hover:bg-indigo-400/75 text-white"
            data-tooltip-id="my-Adicionar"
            data-tooltip-content="Adicionar"
            data-tooltip-place="top"            
          >
            
            <Plus size={16}/>
            <Tooltip id="my-Adicionar" />
          </button>
        </form>

        {/* Botões inform */}
        <div className="flex items-center justify-between gap-3">

          <div className="flex items-center gap-3 flex-1">
            <p className="text-zinc-700 cursor-pointer">Todas <span className="rounded-full px-3 py-1.5 bg-zinc-800 text-white ">{task.length}</span></p>
            <p className="text-zinc-500/75 cursor-pointer hover:text-zinc-700 transition-all">Ativas </p>
            <p className="text-zinc-500/75 cursor-pointer hover:text-zinc-700 transition-all">Concluídas</p>
          </div>

          {/* Deletar botão */}
          {task.length > 0 && 
              <button 
                  className="flex items-center justify-center p-4 gap-1 cursor-pointer rounded-2xl bg-red-400 hover:bg-red-400/75 transition-all text-white "
                  onClick={deleteAllTasks}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Excluir todos os itens"
                  data-tooltip-place="bottom" 
                  >
                  <Trash2 size={16} />
              </button>}

          {/* grid - list */}
          {task.length > 0 &&      
              
                  <button 
                    className="flex items-center justify-center p-4 gap-1 cursor-pointer rounded-2xl bg-zinc-600 hover:bg-zinc-600/75 transition-all text-white "
                    onClick={() => {setToogleLayout(!toogleLayout)}}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Layout"
                    data-tooltip-place="bottom" 
                  >
                    {toogleLayout ? <LayoutGrid size={16}/> : <List size={16}/>}
                    <Tooltip id="my-tooltip" />
                  </button>                
                          
          }          
        </div>


        {/* lista - todos */}
        {task.length > 0 ? (
          <div className="w-full rounded-2xl space-y-3 py-4 px-1 scrollbar-thumb-zinc-500/60 scrollbar-track-zinc-900/10">
          {toogleLayout ? (
            <ul className="grid grid-cols-1 gap-2 text-white">
              {task.map((todo) => (
                <li key={todo.id} className="flex flex-wrap gap-4 p-5 rounded-2xl items-center border-l-4 border-indigo-400 bg-slate-200/60 text-zinc-700 hover:shadow cursor-pointer">
                  <button 
                    className="hover:text-zinc-400 cursor-pointer transition-all"
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
                    className="hover:text-red-400/75 cursor-pointer transition-all"
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
                <li key={todo.id} className="flex flex-wrap gap-3 px-2 py-6 rounded-2xl items-center border-l-4 border-indigo-400 bg-slate-200/60 text-zinc-700 hover:shadow cursor-pointer ">
                  <button 
                    className="hover:text-indigo-400 cursor-pointer transition-all"
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
                    className="hover:text-red-300/75 cursor-pointer transition-all"
                    onClick={() => deleteTask(todo.id)}
                  >
                    <Trash2 size={16}/>                  
                  </button>                 
                </li>
              ))}            
            </ul>
          )}          
        </div>     
        ) : (
          <NotTasks            
            title={"Você ainda não tem tarefas cadastradas"}
            subtitle={"Crie tarefas e organize seus itens a fazer"}
          />
        )}        
      </div>
    </div>
  )
}

export default App
