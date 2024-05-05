import React, { useEffect, useRef, useState } from 'react'
import { Notificationitem } from './Notificationitem'


export const MessageCard = ({handleCloseMessageCard}) => {
  const [component, setComponent] = useState(true);

  const ref =useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);

const handleClickOutside = (event) => {
  if (ref.current && !ref.current.contains(event.target)) {
      setComponent(false);
      handleCloseMessageCard();
  }
};
  
  return (
    <>
    { component &&
     <div ref={ref} className='bg-gray-200 lg:w-1/3 md:w-[50%] w-[60%] min-h-96 absolute top-7 z-10 right-0 mt-24 rounded-lg m-5 flex  flex-col gap-3 shadow-gray-800	  '>
        <h1 className='text-center font-bold lg:text-2xl md:text-xl md:text-md mt-2' >Message</h1>
        <Notificationitem />
        <Notificationitem />
        <Notificationitem />
        <Notificationitem />  
      </div>
    }
    </>
  )
}
