import { useEffect } from 'react'
import { currentDate } from '../utils/CurrentDate'
import { Calendar, CalendarDays } from 'lucide-react'

export default function GuestGreeting( ){

    const emojiRandom = () => {
        
            const listEmoji = ['😄','😃','😀','😊','☺','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨','👂','👀','👃','👅','👄','👍','👎','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏','☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅','👰','🙎','🙍','🙇']
            
            const randomEmoji = listEmoji[Math.floor(Math.random() * listEmoji.length)]

            return    
    }

    return(
        <div className="flex flex-col justify-center text-zinc-900 max-w-2xl mx-auto ">
              <h1 className="mt-6 text-2xl font-bold tracking-wide md:text-3xl">Olá 👋<span className='text-3xl'>{emojiRandom()}</span></h1>
              <div className='flex justify-between items-center gap-2 text-sm md:text-lg'>
                <p className="font-extralight flex-1">Qual seus planos hoje?</p>
                <CalendarDays size={18}/>
                <p className="font-light">{currentDate()}</p>
              </div>
          </div> 
    )
}