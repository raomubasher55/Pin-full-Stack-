import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import PostContext from '../context/posts/postContext';
import NavbarContext from '../context/posts/NavbarContext';
import { NotificationCard } from './NotificationCard'
import { MessageCard } from './MessageCard'
import { SearchBar } from './SearchBar'
import { Spinner } from './Spinner';


export const Navbar = () => {
    const { showNavbar, setShowNavbar } = useContext(NavbarContext);
    const a = useContext(PostContext);
    const b = useContext(NavbarContext)
    const [showNotificationCard, setShowNotificationCard] = useState(false);
    const [messageCard, setMessageCard] = useState(false);
    const [profile, setProfile] = useState();
    const [hambuerger, setHambuerger] = useState(false);
    const [spinner, setSpinner] = useState(false);

    const navigate = useNavigate();
    const searchRef = useRef(null);

    const toggleNotificationCard = () => {
        setMessageCard(true);
    }
    const toggleMessageCard = () => {
        setMessageCard(true);
    }

    const handleCloseMessageCard = () => {
        setMessageCard(false);
    }

    const handleOnlogout = async () => {
        setSpinner(true)
        const response = await fetch(`http://localhost:5000/logout`, {
            method: "POST",
            credentials: "include"
        });
        setSpinner(false)
        const result = await response.json();
        if (response.ok) {
            setSpinner(ture)
            navigate("/login");
        }
    }

    const user = async () => {
        setSpinner(true);
        const response = await fetch(`http://localhost:5000/profile`, {
            method: "GET",
            credentials: "include",
        });
        const result = await response.json();
        setSpinner(false);
        if (response.ok) {
            setProfile(result.user.profileImage)
        }
    }


    useEffect(() => {
        user();
        setHambuerger(false);

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setHambuerger(false);
        }
    };

    const handleonHamburgr = () => {
        setHambuerger(true);
    }

    const handleOnClose = () => {
        setHambuerger(false);
        console.log("close working");
    }


    return (
        <>
            { spinner &&
                <Spinner />
            }
            {showNavbar &&
                <nav className=" w-full fixed top-0 z-10 bg-black md:p-1 p-0 ">
                    {hambuerger &&
                        <div ref={searchRef} id="leftMenubar" className='menu   bg-slate-900 text-white min-h-screen md:w-[40%] w-64 absolute flex flex-col gap-7 left duration-150 ease-out'>
                            <span onClick={handleOnClose} className='flex justify-end mr-3 mt-3'>
                                <lord-icon src="https://cdn.lordicon.com/zxvuvcnc.json" trigger="hover" colors="primary:#ffffff" style={{ width: "30px", height: "30px" }}></lord-icon>
                            </span>
                            <div onClick={() => setHambuerger(false)}>
                                <Link to="/profile" className='flex ml-4 items-center h-10 hover:bg-slate-700 hover:rounded-lg '>
                                    {!profile ? <div className='hover:bg-slate-500 hover:p-2 hover:rounded-md p-2 ' ><span ><lord-icon colors="primary:#ffffff" src="https://cdn.lordicon.com/hrjifpbq.json" trigger="hover" style={{ width: "30px", height: "30px" }}>
                                    </lord-icon></span></div> : <div className='hover:bg-slate-500 hover:p-2 hover:rounded-md p-2 ' to="/profile"><img className='w-9 h-9 rounded-full' src={`./images/uploads/${profile}`} alt="" /></div>}
                                    <div className=' mx-3  font-bold  text-lg '>Profile</div>

                                </Link>
                            </div>
                            <div onClick={() => setHambuerger(false)}>
                                <Link to="/" className='flex ml-6 hover:bg-slate-700 hover:rounded-lg py-2 '>
                                    <lord-icon src="https://cdn.lordicon.com/wmwqvixz.json" trigger="hover" colors="primary:#ffffff" style={{ width: "30px", height: "30px" }}></lord-icon>
                                    <span id='home' className='  mx-3  hover:rounded  font-bold  text-lg '>Home</span>
                                </Link>
                            </div>
                            <div onClick={() => setHambuerger(false)}>
                                <Link to="/createpin" className="flex ml-6 hover:bg-slate-700 hover:-1 hover:rounded-lg py-2">
                                    <lord-icon src="https://cdn.lordicon.com/fowixcuo.json" trigger="hover" colors="primary:#ffffff" style={{ width: "30px", height: "30px" }}></lord-icon>
                                    <div ><span id='create' className=' mx-3   hover:rounded font-bold text-lg  '>Create</span></div>
                                </Link>
                            </div>
                            <div onClick={() => { setHambuerger(false); toggleMessageCard() }} className="flex ml-6 hover:bg-slate-700 hover:rounded-lg">
                                <button className='hover:bg-slate-500  hover:rounded-full  '><lord-icon colors="primary:#ffffff" src="https://cdn.lordicon.com/ayhtotha.json" trigger="hover" style={{ width: "30px", height: "30px" }}></lord-icon></button>
                                <span id='create' className=' mx-2    hover:rounded p-2 font-bold text-lg  '>Message</span>
                            </div>
                            <div onClick={() => { setHambuerger(false); toggleNotificationCard() }} className="flex ml-6 hover:bg-slate-700 hover:rounded-lg">
                                <button className='hover:bg-slate-500  hover:rounded-full '><lord-icon colors="primary:#ffffff" src="https://cdn.lordicon.com/lznlxwtc.json" trigger="hover" style={{ width: "30px", height: "30px" }}></lord-icon></button>
                                <span id='create' className=' mx-2    hover:rounded p-2 font-bold text-lg  '>Notification</span>
                            </div>
                            <hr />
                            <div className="flex  justify-center">
                                <Link onClick={handleOnlogout} className="px-7 py-2 bg-red-600  text-white rounded-lg font-bold text-xl" to="/login">Logout</Link>
                            </div>

                        </div>
                    }
                    <div className="w-full px-3 md:py-3 py-2 flex justify-between text-white">
                        <div className="justify-center items-center flex md:flex">
                            <i onClick={handleonHamburgr} className="lg:hidden md:block block text-2xl  ri-align-justify"></i>
                            <img className="md:w-12 md:h-12  lg:w-12 lg:h-12 w-19 h-9 " src="https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png" alt="" />
                            <Link to="/"><span id='home' className='  mx-6 hover:bg-slate-500 hover:p-2 hover:rounded-md md:p-0 font-bold  text-xl  sm:hidden md:hidden lg:block hidden   '>Home</span></Link>
                            <Link to="/createpin"><span id='create' className='   hover:bg-slate-500 hover:p-2 hover:rounded-md p-2 font-bold text-xl sm:hidden md:hidden lg:block hidden '>Create</span></Link>
                        </div>
                        <SearchBar />
                        <div className="flex gap-4 items-center ">
                            <button onClick={toggleNotificationCard} className='hover:bg-slate-500  hover:rounded-full p-2 sm:hidden md:hidden lg:block hidden '><lord-icon colors="primary:#ffffff" src="https://cdn.lordicon.com/lznlxwtc.json" trigger="hover" style={{ width: "30px", height: "30px" }}></lord-icon></button>
                            <button onClick={toggleMessageCard} className='hover:bg-slate-500  hover:rounded-full p-2 sm:hidden md:hidden lg:block hidden '><lord-icon colors="primary:#ffffff" src="https://cdn.lordicon.com/ayhtotha.json" trigger="hover" style={{ width: "30px", height: "30px" }}></lord-icon></button>
                            {!profile ? <Link className='hover:bg-slate-500 hover:p-2 hover:rounded-md p-2 ' to="/profile"><span ><lord-icon colors="primary:#ffffff" src="https://cdn.lordicon.com/hrjifpbq.json" trigger="hover" style={{ width: "30px", height: "30px" }}>
                            </lord-icon></span></Link> : <Link className='hover:bg-slate-500  hover:p-2 hover:rounded-md p-2 ' to="/profile"><span ><img className='w-9 h-9 rounded-full' src={`./images/uploads/${profile}`} alt="" /></span></Link>}
                            <Link onClick={handleOnlogout} className="px-3 py-2 bg-red-600  text-white rounded-lg sm:hidden md:hidden lg:block hidden " to="/login">Logout</Link>
                        </div>
                    </div>
                </nav>
            }
            {messageCard && <NotificationCard handleCloseMessageCard={handleCloseMessageCard} />}
            {messageCard && <MessageCard handleCloseMessageCard={handleCloseMessageCard} />}
        </>
    )
}
