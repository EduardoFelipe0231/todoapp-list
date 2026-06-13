import { Clipboard } from "lucide-react"

export default function NotTasks({title, subtitle, icon}){
    return (
        <div className="w-full flex flex-col items-center justify-center text-zinc-500 mt-26 tracking-wider text-center dark:text-zinc-500">
            <Clipboard size={30}/>
            <h2 className="font-bold mt-3">{title}</h2>
            <p className="font-light">{subtitle}</p>
        </div>
    )
}