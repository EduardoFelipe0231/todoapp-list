import { Pencil, CircleCheckBig, Trash2, Circle } from "lucide-react"

const ListItem = ( {task, todo, deleteTask}) => {
    return(
        <>
            <li key={todo.id} className={`flex flex-wrap gap-4 p-5 rounded-2xl items-center border-l-4 bg-slate-200/60 text-zinc-700 hover:shadow cursor-pointer transition ${todo.done ? "border-red-400" : "border-indigo-400"}`}>
                  <button 
                    className={`cursor-pointer transition-all  ${todo.done ? "text-gray-400" : "text-zinc-700"}`}
                    onClick={() => completeTodo(todo.id)}
                  >
                    {todo.done ?  <CircleCheckBig size={17}/> : <Circle size={16}/> }                 
                  </button> 

                  <p className={`break-all flex-1 ${todo.done ? "line-through text-gray-400" : ""}`}>{todo.text}</p>   
                                 
                  {todo.done ? (
                      null
                  ) : (
                    <button 
                      className="hover:text-zinc-400 cursor-pointer transition-all"
                    >
                      <Pencil size={16}/>                  
                  </button>

                  )}


                  <button 
                    className="hover:text-red-400/75 cursor-pointer transition-all"
                    onClick={() => deleteTask(todo.id)}
                  >
                    <Trash2 size={16}/>                  
                  </button>                 
            </li>
        </>
    )
}

export default ListItem