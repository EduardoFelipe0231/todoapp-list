import { Clipboard } from "lucide-react"

export default function NotTasks(){
    return (
        <div className="w-full flex flex-col items-center justify-center text-zinc-400 mt-26 tracking-wider">
            <Clipboard size={40}/>
            <h2 className="font-bold mt-3">Você ainda não tem tarefas cadastradas</h2>
            <p className="font-light">Crie tarefas e organize seus itens a fazer</p>
        </div>
    )
}