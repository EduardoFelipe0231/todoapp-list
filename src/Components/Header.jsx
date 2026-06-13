import { useEffect, useState } from 'react'
import { Moon, Sun} from "lucide-react"
import GuestGreeting from './GuestGreeting'


export default function Header() {

    const [isDark, setIsDark] = useState(false)  
    
    useEffect(() => {
      const savedTheme = localStorage.getItem("theme");
      if(savedTheme === "dark"){
        document.documentElement.classList.toggle("dark");
        setIsDark(true)
      }
    }, [])

    const toogleTheme = () => {
      const newTheme = !isDark;
      setIsDark(newTheme);
      document.documentElement.classList.toggle("dark", newTheme);
      localStorage.setItem("theme", newTheme ? "dark" : "light");
    };

    return(
        <div className="w-full py-6 px-3 rounded-b-4xl shadow-2xs border border-gray-200 bg-indigo-400 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700">
          <header className="container mx-auto flex justify-between items-center gap-5">
              <h3 className="text-sm font-bold md:text-2xl tracking-wide text-zinc-900 dark:text-zinc-100">Todo List</h3>              
              <button 
                className="p-2 rounded-full cursor-pointer shadow-2xl transition-all flex items-center justify-center text-zinc-300 bg-zinc-900 hover:bg-zinc-900/75 hover:shadow-lg dark:bg-indigo-400 dark:text-zinc-800 dark:hover:bg-blue-400/75"
                onClick={toogleTheme}
                >
                {isDark  ? <Moon size={22} /> : <Sun size={22} />}                
              </button>              
          </header>
          <GuestGreeting />     
      </div>
    )
}