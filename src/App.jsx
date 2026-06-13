import { useEffect, useState } from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Form from "./Components/Form";
import Button from "./Components/Buttons";
import ListItem from "./Components/ListItem";
import NotTasks from './Components/NotTasks'

import { tabTitle} from "./utils/General";
import { Tooltip } from 'react-tooltip'
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
        text: taskInput.trim(),
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
    const confirmedDelete = window.confirm("Você tem certeza que deseja remover essa tarefa?")

    if(confirmedDelete)
    setTask(task.filter((t) => t.id !== taskId ));
    toast.success("Deletou essa tarefa")
  }


  //deletar toda as tarefas
  const deleteAllTasks = () => {
    const confirmedAll = window.confirm("Deseja excluir todas as tarefas?")

     if(confirmedAll) {
        setTask([])
        toast.info("Tarefas excluidas com sucesso")
     }  
  }

  // completar a tarefa
  const completeTodo = (id) => {
        setTask((prev) => 
          prev.map((ct) =>
          ct.id === id ? { ...ct, done: !ct.done}
        : ct        
      )        
    )
    console.log(id)
  }
  
  // =============================================================== \\

  //Titulo Página dinâmico
  {task.length > 0 ? (tabTitle(`TodoApp - Você tem ${task.length} tarefa(s)`)) : (tabTitle("TodoApp"))}

  // =============================================================== \\

  //Grid - list Button - usa um ternário na lista se verdadeiro ou falso.
  const [toogleLayout, setToogleLayout] = useState(true)

  // =============================================================== \\ 

    const contextClass = {
    success: "bg-emerald-50 border border-emerald-700 text-emerald-900 font-zinc-200",
    error: "bg-rose-100 border border-red-700 text-red-800",
    info: "bg-cyan-50 border border-teal-700 text-teal-900",
    warning: "bg-amber-50 border border-yellow-750 text-yellow-950",
    default: "bg-emerald-50 border border-emerald-700 text-emerald-900",
    dark: "bg-zinc-50 border border-zinc-900 text-zinc-900",
  };
    
  return (
    
    <div className="min-h-screen flex flex-col flex-1 items-center text-sm md:text-base bg-slate-100 relative ">
      
      <ToastContainer
        toastClassName={(context) =>
          contextClass[context?.type || "default"] +
          " relative flex px-6 min-h-13 rounded-lg overflow-hidden cursor-pointer flex items-center justify-center"
        }
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        />

      {/* =================== Header =================== */}
      <Header />

      <div className="mx-auto p-5 max-w-180 w-full space-y-5 ">

        {/* =================== form =================== */}        
        <Form addTask={addTask} taskInput={taskInput} handleInput={handleInput}/>

        
        {/* =================== Buttons =================== */}        
        <Button task={task} deleteAllTasks={deleteAllTasks} toogleLayout={toogleLayout} setToogleLayout={setToogleLayout } />         


        {/* =================== Lista =================== */}
        {task.length > 0 ? (
          <div className="w-full rounded-2xl space-y-3 py-4 px-1 scrollbar-thumb-zinc-500/60 scrollbar-track-zinc-900/10 text-sm h-full max-h-123 overflow-y-auto">
              {toogleLayout ? (
                <ul className="grid grid-cols-1 gap-2 text-white">
                  {task.map((todo) => (
                    <ListItem key={todo.id} task={task} todo={todo} deleteTask={deleteTask}/>
                  ))}            
                </ul>
              ) : (
                <ul className="grid grid-cols-2 gap-2 text-white">
                  {task.map((todo) => (
                    <ListItem key={todo.id} task={task} todo={todo} deleteTask={deleteTask}/>
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

      {/* =================== Footer =================== */}   
      <Footer />
    </div>
  )
}

export default App
