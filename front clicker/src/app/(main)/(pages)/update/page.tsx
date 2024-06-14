'use client'
import { api } from "@/services/api";
import { useEffect, useState, useRef, FormEvent } from "react";
import { useStore } from '../home/page';

interface UserProp {
  id: string;
  name: string;
  email: string;
  power: number;
  value: number;
}

function UpdateRecordPage() {
  const [users, setUsers] = useState<UserProp[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProp | null>(null);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  
  const { power, value, marginTop, setMarginTop } = useStore();

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 770) {
        setMarginTop('100px');
      } else if (window.innerWidth <= 1550) {
        setMarginTop('100px');
      } else {
        setMarginTop('50px');
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  async function loadUsers() {
    try {
      const response = await api.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  }

  function findUser(name: string, email: string) {
    const foundUser = users.find(user => user.name === name && user.email === email);
    if (foundUser) {
      setSelectedUser(foundUser);
    } else {
      alert("Usuário não encontrado com o nome e email fornecidos.");
      setSelectedUser(null);
    }
  }
//QUARRY Update
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!selectedUser || !nameRef.current?.value || !emailRef.current?.value) {
      console.error("Selecione um usuário e preencha os campos obrigatórios.");
      return;
    }

    const updatedUser: UserProp = {
      ...selectedUser,
      name: nameRef.current.value,
      email: emailRef.current.value,
      value: value,
      power: power
    };

    try {
      const response = await api.put(`/api/user?id=${selectedUser.id}`, updatedUser);
      const updatedUsers = users.map(user => user.id === updatedUser.id ? response.data : user);
      setUsers(updatedUsers);
      alert("Registro atualizado com sucesso!");
      resetForm();
    } catch (error) {
      console.error("Erro ao atualizar registro:", error);
    }
  }
//QUARRY Update

  function resetForm() {
    if (nameRef.current) nameRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
    setSelectedUser(null);
  }

  return (
    <div className="w-full min-h-screen flex justify-center px-4" style={{ marginTop }}>
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4xl font-medium text-black dark:text-white">Atualizar Registro</h1>
        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
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
          <button type="button" onClick={() => findUser(nameRef.current?.value || '', emailRef.current?.value || '')} className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium text-white">Buscar Usuário</button>
          {selectedUser && (
            <>
              <h2 className="text-xl font-medium mt-6 mb-2 text-black dark:text-white">Usuário Selecionado:</h2>
              <p className="text-black dark:text-white"><span className="font-medium">Nome:</span> {selectedUser.name}</p>
              <p className="text-black dark:text-white"><span className="font-medium">Email:</span> {selectedUser.email}</p>
              <p className="text-black dark:text-white"><span className="font-medium">power:</span> {selectedUser.power}</p>
              <p className="text-black dark:text-white"><span className="font-medium">value:</span> {selectedUser.value}</p>
              <button type="submit" className="cursor-pointer w-full mt-4 p-2 bg-blue-500 rounded font-medium text-white">Atualizar Registro</button>
            </>
          )}
        </form>
      </main>
    </div>
  );
}

export default UpdateRecordPage;
