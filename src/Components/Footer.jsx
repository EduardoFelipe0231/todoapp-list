const Footer = () => {
    return (
        <div className="flex items-center justify-center bg-indigo-400 w-full p-5 gap-2 mt-auto text-sm dark:bg-zinc-800 dark:text-zinc-100 ">
           <p className="flex items-center gap-1">
                &copy; 
                { new Date().getFullYear() }  
                criado por 
                <a href="https://github.com/EduardoFelipe0231" target="_blank" className="p-1 rounded-sm  transition-all hover:text-zinc-100 dark:hover:text-indigo-400">
                    Eduardo Felipe</a> 
                Todos os direitos reservados.
           </p>
        </div>
    )
}

export default Footer