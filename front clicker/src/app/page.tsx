import Navbar from '@/components/global/navbar'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import { Boxes } from '@/components/ui/background-boxes'
import { Button } from '@/components/ui/button'
import { ContainerScroll } from '@/components/ui/container-scroll'
import { LampContainer } from '@/components/ui/lamp'
import { cn } from '@/lib/utils'
import { CheckIcon } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-start p-24 light:bg-white dark:bg-black">
      <Navbar/>      
      <div className="hidden md:block">
        <Boxes />
      </div>
      <h1 className={cn("md:text-4xl sm:text-2xl text-xl text-black dark:text-white relative z-20")}>
        Super Clicker is Awesome
      </h1>
      <p className="text-center md:text-lg sm:text-base text-sm mt-2 text-black dark:text-white relative z-20">
        Click Click Click does my mouse
      </p>
    </main> 
  )
}
