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

function RecordPage() {

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


async function handleSubmit(event: FormEvent){
  event.preventDefault();
  if (!nameRef.current?.value || !emailRef.current?.value) {
    console.error("Todos os campos obrigatórios devem ser preenchidos.");
    return;
  }  
  const newUser: UserProp = {
    id: newId,
    name: nameRef.current.value,
    email: emailRef.current.value, 
    power: power,
    value: value
  };
  try {
    const response = await api.post("/api/user", newUser);
    setUsers(prevUsers => [...prevUsers, response.data]);
    alert("Record cadastrado")
    if (nameRef.current) nameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
  } catch (error) {
    console.error("Erro ao adicionar usuario à lista:", error);
  }}    
  return (
    <div className="w-full min-h-screen flex justify-center px-4" style={{ marginTop }}>
    <main className="my-10 w-full md:max-w-2xl">
  
      <h1 className="text-4xl font-medium text-black dark:text-white">Salvar Record</h1>
  
      <form className="flex flex-col my-6" onSubmit={handleSubmit}>
        <label className="font-medium text-black dark:text-white">Nome:</label>
        <input
          type="text"
          placeholder="Digite o Nome"
          className="w-full mb-4 p-2 rounded bg-white dark:bg-gray-700 dark:text-white"
          ref={nameRef}
        />

        <label className="font-medium text-black dark:text-white">email:</label>
        <input
          type="text"
          placeholder="Digite seu email"
          className="w-full mb-4 p-2 rounded bg-white dark:bg-gray-700 dark:text-white"
          ref={emailRef}
        />   
        <input type="submit" value="Cadastrar" className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium text-white"/>  
      </form>  
    </main>
  </div>
  )
}
export default RecordPage;