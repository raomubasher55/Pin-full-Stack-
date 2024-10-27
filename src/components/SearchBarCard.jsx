import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ClientViewProfile } from './ClientViewProfile';


export const SearchBarCard = ({ searchResult, search, setComponent , searchFunction }) => {
    const handleOnClick = (e) => {
        e.preventDefault();
        setComponent(false);
        searchFunction;
    }

    // console.log(searchResult);
    
    return (
        <>
            <div className="bg-zinc-200 p-4 absolute left-[11%] top-16 rounded-lg w-4/5 text-black max-h-[70vh] overflow-scroll ">
                <div className="max-w-6xl mx-auto">

                    <div onClick={handleOnClick} className="mb-6 text-black">

                        {searchResult && (searchResult.length > 0 && search.length > 0) ? (
                            searchResult.map((data, index) => (
                                <div  key={index}  onClick={handleOnClick}>
                                    {console.log(data)
                                    }
                                    <Link
                                        to={`userprofile/${data._id}`} // Navigate to the user profile with user ID
                                        state={{ userData: data }} // Pass user data as state
                                       >
                                        <div className="flex flex-col space-y-4 md:p-4 lg:p-4 p-2">
                                            <div className="flex items-center space-x-3">
                                                {!data.profileImage ? <div className="bg-purple-500 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">R</div> :
                                                    <div className="bg-purple-500 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold"><img className='rounded-full h-10 w-10' src={`./images/uploads/${data.profileImage}`} alt="" /></div>}
                                                <div>
                                                    <div className="font-semibold">{data.name}</div>
                                                    <div className="text-zinc-500">{data.username}</div>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            search.length > 0 ? <div className='font-bold text-center lg:text-2xl md:text-xl text-lg m-5'>Not found</div> : <div className='font-bold text-center lg:text-2xl md:text-xl text-sm  m-3'>Write Something to Search </div>
                        )}
                        <hr />
                        <h2 className="text-lg font-semibold mb-2">Ideas for you</h2>

                        {!searchResult && <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                            <div className=" w-1/2  mb-6 ">
                                <div className="box relative rounded-lg">
                                    <img src="https://orionstardesign.com/wp-content/uploads/2023/08/020.jpg" alt="image" className="rounded-lg w-full object-cover" />
                                    <div className="caption font-bold bg-black bg-opacity-50 text-white absolute bottom-0 left-0 w-full py-2 px-4 truncate">Lorem ipsum</div>
                                </div>
                            </div>
                            <div className=" w-1/2  mb-6 ">
                                <div className="box relative rounded-lg">
                                    <img src="https://i.pinimg.com/236x/36/3c/a0/363ca0acc354f780479c88e495431384.jpg" alt="image" className="rounded-lg w-full object-cover" />
                                    <div className="caption font-bold bg-black bg-opacity-50 text-white absolute bottom-0 left-0 w-full py-2 px-4 truncate">Lorem ipsum</div>
                                </div>
                            </div>
                            <div className=" w-1/2 mb-6 ">
                                <div className="box relative rounded-lg">
                                    <img src="https://i.pinimg.com/236x/82/8d/6e/828d6ec2dfcaa4e1916c3c7429d3c121.jpg" alt="image" className="rounded-lg w-full object-cover" />
                                    <div className="caption font-bold bg-black bg-opacity-50 text-white absolute bottom-0 left-0 w-full py-2 px-4 truncate">Lorem ipsum</div>
                                </div>
                            </div>
                            <div className=" w-1/2  mb-6 ">
                                <div className="box relative rounded-lg">
                                    <img src="https://i.pinimg.com/236x/56/be/9e/56be9e7635eb228af2d834d6532f1845.jpg" alt="image" className="rounded-lg w-full object-cover" />
                                    <div className="caption font-bold bg-black bg-opacity-50 text-white absolute bottom-0 left-0 w-full py-2 px-4 truncate">Lorem ipsum</div>
                                </div>
                            </div>
                        </div>}
                    </div>

                    <div>

                        <h2 className="text-lg font-semibold mb-2">Popular on Seleven</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg overflow-hidden">
                                <img src="https://placehold.co/200x150" alt="Chicken Pot Pie" />
                                <div className="p-2 text-center">Chicken Pot Pie</div>
                            </div>
                            <div className="bg-white rounded-lg overflow-hidden">
                                <img src="https://placehold.co/200x150" alt="Easy dinner recipes" />
                                <div className="p-2 text-center">Easy dinner recipes</div>
                            </div>
                            <div className="bg-white rounded-lg overflow-hidden">
                                <img src="https://placehold.co/200x150" alt="Painting ideas" />
                                <div className="p-2 text-center">Painting ideas</div>
                            </div>
                            <div className="bg-white rounded-lg overflow-hidden">
                                <img src="https://placehold.co/200x150" alt="Pretty selfies" />
                                <div className="p-2 text-center">Pretty selfies</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
