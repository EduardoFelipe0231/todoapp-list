import { Trash2, List, LayoutGrid,  } from "lucide-react"
import { Tooltip } from 'react-tooltip'

const Button = ( {task ,toogleLayout, deleteAllTasks, setToogleLayout  }) => {
    return(
        <div className="flex items-center justify-between gap-3">        
            <div className="flex items-center gap-2 flex-1 md:gap-3">
                <p className="text-zinc-700 cursor-pointer dark:text-zinc-100">Todas <span className="rounded-full p-1 bg-zinc-800 text-zinc-100 md:px-2 ">{task.length}</span></p>
                <p className="text-zinc-500/75 cursor-pointer hover:text-zinc-700 transition-all dark:text-zinc-400 dark:hover:text-indigo-300">Ativas </p>
                <p className="text-zinc-500/75 cursor-pointer hover:text-zinc-700 transition-all dark:text-zinc-400 dark:hover:text-indigo-300">Concluídas</p>
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
    )
}

export default Button