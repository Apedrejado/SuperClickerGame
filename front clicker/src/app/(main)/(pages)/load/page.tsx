'use client'
import { api } from "@/services/api";
import { useEffect, useState, useRef, FormEvent } from "react"
import { useStore } from '../home/page';

interface UserProp {
  id: string;
  name: string;
  email: string;
  power: number;
  value: number;
}

function LoadPage() {
  const [users, setUsers] = useState<UserProp[]>([])

  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  const { marginTop, setValue, setPower, setMarginTop } = useStore();

  useEffect(() => {
    loadUsers();
  }, [])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 770) {
        setMarginTop('100px');
      } else if (window.innerWidth <= 1550) {
        setMarginTop('100px')
      } else {
        setMarginTop('50px');
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  async function loadUsers() {
    try {
      const response = await api.get("/api/users")
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  }

  function findUser() {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    if (!name || !email) {
      alert("Por favor, insira o nome e o email para encontrar o usuário.");
      return;
    }
    const foundUser = users.find(user => user.name === name && user.email === email);
    if (foundUser) {
      console.log("Usuário encontrado:", foundUser);
      setPower(foundUser.power)
      setValue(foundUser.value);
      alert('load concluido')
      if (nameRef.current) nameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
    } else {
      alert("Nenhum usuário encontrado com os critérios fornecidos.");
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center px-4" style={{ marginTop }}>
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-black dark:text-white">Load Record</h1>
        <form className="flex flex-col my-6">
          <label className="font-medium text-black dark:text-white">Nome:</label>
          <input
            type="text"
            placeholder="Digite o Nome"
            className="w-full mb-4 p-2 rounded bg-white dark:bg-gray-700 dark:text-white"
            ref={nameRef}
          />
          <label className="font-medium text-black dark:text-white">Email:</label>
          <input
            type="text"
            placeholder="Digite o Email"
            className="w-full mb-4 p-2 rounded bg-white dark:bg-gray-700 dark:text-white"
            ref={emailRef}
          />
          <button type="button" onClick={findUser} className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium text-white">Encontrar Usuário</button>
        </form>
      </main>
    </div>
  )
}

export default LoadPage;
