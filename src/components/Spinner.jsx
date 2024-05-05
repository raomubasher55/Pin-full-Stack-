import React from 'react';
import { Bars } from 'react-loader-spinner'

export const Spinner = () => {
  return (
    <>
         <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white/1  backdrop-blur-sm z-50">
                <div className="relative">
                    <Bars
                        height={80}
                        width={80}
                        // color="#4fa94d"
                        color="#fff"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            </div>
    </>
  )
}
