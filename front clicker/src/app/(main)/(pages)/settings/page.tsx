"use client"
import { ModeToggle } from "@/components/global/mode-toogle";
import React, { useEffect } from "react";
import { create } from "zustand";

interface StoreState {
  marginTop: string;
  setMarginTop: (newMarginTop: string) => void;
}
const useStore = create<StoreState>((set) => ({
  marginTop: '20px',
  setMarginTop: (newMarginTop) => set({ marginTop: newMarginTop }),
}));


const Settings = () => {

  const {  marginTop,setMarginTop } = useStore();

  useEffect(()=>{
    function handelRezise() {
      if(window.innerWidth <= 770){
        setMarginTop('100px');
      } else if (window.innerWidth <= 1550){
        setMarginTop('100px')
      } else {
        setMarginTop('100px');
      }
    }
    window.addEventListener('resize', handelRezise);
    handelRezise();
    return () => window.removeEventListener('resize', handelRezise);
  }, [])


  return (
    <div className="flex flex-col gap-4 relative pt-14" style={{ marginTop }}>
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">settings</h1>
      <ModeToggle/>
    </div>
  );
}

export default Settings;
