import React from 'react'
import Link from 'next/link'
import { MenuIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

type Props = {}

const Navbar = async (props: Props) => {
  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100]
    flex items-center border-b-[1px] border-neutral-900 justify-between">
      <aside className="flex items-center gap-2">
        <ul className="flex items-center gap-4 list-none text-lg">
          <li>
            <Link href={"/"}>Clicker</Link>
          </li>
        </ul>
      </aside>
      <nav className="hidden md:flex items-center justify-center gap-8">
        <ul className="flex items-center gap-8 list-none">
          <li>
            <Link href="/home">Play Super Clicker</Link>
          </li>
          <li>
            <Link href="/record">Save</Link>
          </li>
          <li>
            <Link href="/load">load</Link>
          </li>
          <li>
            <Link href="/leaderbord">Leaderboard</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
          <li>
            <Link href="/update">update</Link>
          </li>
        </ul>
      </nav>
      <aside className="flex items-center gap-4 md:hidden">
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button><MenuIcon className="w-6 h-6"/></button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
          <DropdownMenuItem>
            <Link href="/home" className="text-black dark:text-white text-lg">Play Super Clicker</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/record" className="text-black dark:text-white text-lg">Save</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/load" className="text-black dark:text-white text-lg">Load</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/settings" className="text-black dark:text-white text-lg">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/update" className="text-black dark:text-white text-lg">update</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/leaderbord" className="text-black dark:text-white text-lg">Leaderboard</Link>
          </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </aside>
    </header>
  )
}

export default Navbar
