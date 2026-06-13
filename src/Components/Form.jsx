import { Plus } from "lucide-react"
import { Tooltip } from 'react-tooltip'

const Form = ( { addTask , taskInput , handleInput  }) => {
    return (
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
            className="px-5 cursor-pointer transition-all rounded-2xl bg-indigo-400 hover:bg-indigo-400/75 text-white disabled:opacity-50 disabled:hover:bg-indigo-400"
            data-tooltip-id="my-Adicionar"
            data-tooltip-content="Adicionar"
            data-tooltip-place="top"     
            disabled={!taskInput.trim()}       
          >
            
            <Plus size={17}/>
            {!taskInput.trim() ? null : <Tooltip id="my-Adicionar" />}
          </button>
        </form>
    )
}

export default Form