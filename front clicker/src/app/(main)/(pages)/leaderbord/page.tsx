'use client'
import { api } from "@/services/api";
import { useEffect, useState, useRef, FormEvent } from "react"
import {FiTrash} from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../home/page';


const newId: string = uuidv4();

interface UserProp{
    id: string;
    name: string;
    email: string;
    power: number;
    value: number;
}

function leaderbordPage() {

  const [users,setUsers]= useState<UserProp[]>([])

  const nameRef = useRef<HTMLInputElement|null>(null)
  const emailRef = useRef<HTMLInputElement|null>(null)

  const { power, value, marginTop, setMarginTop} = useStore();

  useEffect(()=>{
    loadUsers();
}, [])

useEffect(()=>{
    function handelRezise() {
      if(window.innerWidth <= 770){
        setMarginTop('100px');
      } else if (window.innerWidth <= 1550){
        setMarginTop('100px')
      } else {
        setMarginTop('50px');
      }
    }
    window.addEventListener('resize', handelRezise);
    handelRezise();
    return () => window.removeEventListener('resize', handelRezise);
  }, [])


async function loadUsers() {
  const response = await api.get("/api/users")
  setUsers(response.data);
}

async function handleDelete(id: string) {
  try{
    await api.delete("/api/delete",{
      params:{
        id: id
      }
    })
    const allUsers = users.filter((user)=>user.id !== id)
    setUsers(allUsers);
  }catch(erro){
    console.log(erro);
  }
}

async function handleDeleteConfirmation(id: string) {
  const confirmDelete = window.confirm("Tem certeza de que deseja excluir este Usuario?");
  if (confirmDelete) {
    await handleDelete(id);
  }
}


  
  return (
    <div className="w-full min-h-screen flex justify-center px-4" style={{ marginTop }}>
    <main className="my-10 w-full md:max-w-2xl">
      
      <section className="flex flex-col gap-4">
        {users
          .sort((a, b) => b.power - a.power) // Ordena os usuários com base no power (do maior para o menor)
          .map((user) => (
            <article key={user.id} className="w-full bg-white dark:bg-gray-800 rounded p-2 relative hover:scale-110">
              <p className="text-black dark:text-white"><span className="font-medium">nome:</span> {user.name}</p>
              <p className="text-black dark:text-white"><span className="font-medium">email:</span>  {user.email}</p>
              <p className="text-black dark:text-white"><span className="font-medium">Power:</span> {user.power} </p>
              <p className="text-black dark:text-white"><span className="font-medium">value:</span>{user.value} </p>
              <button className="bg-red-500 w-10 h-10 flex items-center justify-center rounded-lg absolute right-0 -top-2"
                      onClick={() => handleDeleteConfirmation(user.id)}>
                <FiTrash size={18} color="#FFF"/>
              </button>            
            </article>
          ))}
      </section>
  
    </main>
  </div>
  
  )
}
export default leaderbordPage;