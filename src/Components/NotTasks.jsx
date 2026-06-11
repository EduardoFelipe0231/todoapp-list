import { Clipboard } from "lucide-react"

export default function NotTasks({Icon, title, subtitle}){
    return (
        <div className="w-full flex flex-col items-center justify-center text-zinc-400 mt-26 tracking-wider">
            
            <h2 className="font-bold mt-3">{title}</h2>
            <p className="font-light">{subtitle}</p>
        </div>
    )
}