'use client'
import { api } from "@/services/api";
import { useEffect, useState, useRef } from "react";
import { FiTrash } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../home/page';
import { Button } from "@/components/ui/button";

const newId: string = uuidv4();

interface UserProp {
  id: string;
  name: string;
  email: string;
  power: number;
  value: number;
}

function LeaderboardPage() {
  const [users, setUsers] = useState<UserProp[]>([]);
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
    const response = await api.get("/api/users");
    setUsers(response.data);
  }

  async function handleDelete(id: string) {
    try {
      await api.delete("/api/delete", {
        params: {
          id: id,
        },
      });
      loadUsers();
    } catch (erro) {
      console.log(erro);
    }
  }

  async function handleDeleteConfirmation(id: string) {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir este Usuário?");
    if (confirmDelete) {
      await handleDelete(id);
    }
  }

  async function handleDeleteInativo() {
    try {
      await api.delete("/api/deleteinativo");
      loadUsers();
    } catch (erro) {
      console.log(erro);
    }
  }

  async function handleDeleteInativoConfirmation() {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir Usuários inativos?");
    if (confirmDelete) {
      await handleDeleteInativo();
    }
  }

  async function handleDeleteDuplicado(name: string, email: string) {
    try {
      await api.delete("/api/deleteduplicado", {
        data: {
          name: name,
          email: email,
        },
      });
      loadUsers();
    } catch (erro) {
      console.log(erro);
    }
  }

  async function handleDeleteDuplicadoConfirmation(name: string, email: string) {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir Usuários duplicados?");
    if (confirmDelete) {
      await handleDeleteDuplicado(name, email);
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center px-4" style={{ marginTop }}>
      <main className="my-10 w-full md:max-w-2xl">
        <div>
          <Button
            size="lg"
            className="p-8 text-2xl w-full text-red-500 dark:hover:text-red-300 sm:w-auto border-t-2 rounded-full border-[#4D4D4D] dark:bg-gray-800 group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-red-400 duration-500 mb-4"
            onClick={() => handleDeleteInativoConfirmation()}
          >
            Apagar inativos
          </Button>
        </div>
        <section className="flex flex-col gap-4">
          {users
            .sort((a, b) => b.power - a.power)
            .map((user) => (
              <article key={user.id} className="w-full bg-white dark:bg-gray-800 rounded p-2 relative hover:scale-110">
                <p className="text-black dark:text-white"><span className="font-medium">nome:</span> {user.name}</p>
                <p className="text-black dark:text-white"><span className="font-medium">email:</span>  {user.email}</p>
                <p className="text-black dark:text-white"><span className="font-medium">Power:</span> {user.power} </p>
                <p className="text-black dark:text-white"><span className="font-medium">value:</span>{user.value} </p>
                <button className="bg-red-500 w-10 h-10 flex items-center justify-center rounded-lg absolute right-0 -top-2"
                        onClick={() => handleDeleteConfirmation(user.id)}>
                  <FiTrash size={18} color="#FFF" />
                </button>
                <button className="bg-blue-500 w-10 h-10 flex items-center justify-center rounded-lg absolute right-20 -top-2"
                        onClick={() => handleDeleteDuplicadoConfirmation(user.name, user.email)}>
                  <FiTrash size={18} color="#FFF" />
                </button>
              </article>
            ))}
        </section>
      </main>
    </div>
  );
}

export default LeaderboardPage;
