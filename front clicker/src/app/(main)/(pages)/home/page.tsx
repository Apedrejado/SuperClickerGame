'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { CheckIcon } from "lucide-react";
import create from 'zustand';


interface StoreState {
  value: number;
  power: number;
  marginTop: string;
  setValue: (newValue: number) => void;
  setPower: (newPower: number) => void;
  setMarginTop: (newMarginTop: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  value: 0,
  power: 1,
  marginTop: '20px',
  setValue: (newValue) => set({ value: newValue }),
  setPower: (newPower) => set({ power: newPower }),
  setMarginTop: (newMarginTop) => set({ marginTop: newMarginTop }),
}));


const HomePage = () => {

  const { value, power, marginTop, setValue, setPower, setMarginTop } = useStore();

    const handleClick = () => {
      setValue(value + power);
    };  

    const handleBuy = (amount: number, increment: number) => {
      if (value >= amount) {
        setPower(power + increment);
        setValue(value - amount);
      } else {
        alert('Sem saldo');
      }
    };

    useEffect(()=>{
      function handelRezise() {
        if(window.innerWidth <= 770){
          setMarginTop('780px');
        } else if (window.innerWidth <= 1550){
          setMarginTop('290px')
        } else {
          setMarginTop('20px');
        }
      }
      window.addEventListener('resize', handelRezise);
      handelRezise();
      return () => window.removeEventListener('resize', handelRezise);
    }, [])


  return (
    <div className="flex flex-col items-center justify-center h-screen" style={{ marginTop }}>
      <div className="flex flex-col items-center justify-center mb-8 pt-20">
        <Button
          size="lg"
          className="p-8 text-2xl w-full text-white  hover:text-black sm:w-auto border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500 "
          onClick={handleClick} 
        >
          Click me
        </Button>
      </div>
      <div className="text-bold text-5xl text-center">{value}</div>
        <h4 className="mt-4 text-center">Power: {power}</h4>
      
      <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-8">
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="250"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              +1
              <h2 className="text-6xl">$5</h2>
            </CardItem>
            <CardItem
              translateZ="150"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Click +
              <ul className="my-4 flex flex-col gap-2">                
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  click click
                </li>
              </ul>
            </CardItem>
            <div className="flex justify-between items-center mt-8">              
              <CardItem
                translateZ={20}
                as="button"
                className="px-36 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                onClick={() =>handleBuy(5, 1)}
              >
                buy
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="250"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              +10
              <h2 className="text-6xl">$50</h2>
            </CardItem>
            <CardItem
              translateZ="160"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Click ++
              <ul className="my-4 flex flex-col gap-2">                
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  click click
                </li>
              </ul>
            </CardItem>
            <div className="flex justify-between items-center mt-8">              
              <CardItem
                translateZ={20}
                as="button"
                className="px-36 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                onClick={() =>handleBuy(50, 10)}
              >
                buy
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="250"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              +100
              <h2 className="text-6xl">$500</h2>
            </CardItem>
            <CardItem
              translateZ="160"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Click +++
              <ul className="my-4 flex flex-col gap-2">                
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  click click
                </li>
              </ul>
            </CardItem>
            <div className="flex justify-between items-center mt-8">              
              <CardItem
                translateZ={20}
                as="button"
                className="px-36 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                onClick={() =>handleBuy(500, 100)}
              >
                buy
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="250"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              +10000
              <h2 className="text-6xl">$50000</h2>
            </CardItem>
            <CardItem
              translateZ="160"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Nerd
              <ul className="my-4 flex flex-col gap-2">                
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  click click
                </li>
              </ul>
            </CardItem>
            <div className="flex justify-between items-center mt-8">              
              <CardItem
                translateZ={20}
                as="button"
                className="px-36 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                onClick={() =>handleBuy(50000, 10000)}
              >
                buy
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
};

export default HomePage;
