import Navbar from '@/components/global/navbar'


import React from 'react'

type Props = { children: React.ReactNode}

const Layout = (props: Props) => {
  return (
<>
  <div className="flex h-screen">
    <Navbar/>
    <div className="w-full pb-12">
      {props.children}
    </div>
  </div>
</>
  )
}
export default Layout