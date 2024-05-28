import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { PostCard } from './PostCard';
import { ClientPostCard } from './ClientPostCard';
import NavbarContext from '../context/posts/NavbarContext';
import { Spinner } from './Spinner';

export const ClientViewProfile = () => {

    const { showNavbar, setShowNavbar } = useContext(NavbarContext);
    const location = useLocation();
    const userData = location.state ? location.state.userData : null;
    const [followersCount, setFollowersCount] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);
    const [currentUser, setCurrentUser] = useState({ currentUser: "" });
    const [spinner, setSpinner] = useState(false)
    // console.log(currentUser);

    const host = 'http://localhost:5000/';
    const loginUser = async () => {
        setSpinner(true)
        const response = await fetch(`${host}profile`, {
            method: "GET",
            credentials: 'include',
        });
        setSpinner(false)
        const data = await response.json();
        const isCurrentUserFollowing = userData.followers.some(item => item === data.user._id);
        setIsFollowing(isCurrentUserFollowing);
    }

    useEffect(() => {
        if (userData && currentUser) {
            setFollowersCount(userData.followers.length);
            // setIsFollowing(userData.followers.map((data)=>console.log(data))); // Check if the current user is already following
            loginUser();
        }
        setShowNavbar(true)
    }, []);




    // Replace "current_user_id" with the actual current user's ID

    const follow = async () => {
        setSpinner(true);
        try {
            const response = await fetch(`http://localhost:5000/follow/${userData._id}`, {
            // const response = await fetch(`http://localhost:5000/${userData._id}`, {
                method: "POST",
                credentials: "include",
            });
            setSpinner(false);
            if (response.ok) {
                setFollowersCount(prevCount => prevCount + 1);
                setIsFollowing(true);
            } else {
                console.error("Follow failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const unfollow = async () => {
        setSpinner(true)
        try {
            const response = await fetch(`http://localhost:5000/unfollow/${userData._id}`, {
                method: "POST",
                credentials: "include",
            });
            setSpinner(false)
            if (response.ok) {
                setFollowersCount(prevCount => prevCount - 1);
                setIsFollowing(false);
            } else {
                console.error("Unfollow failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const handleOnClick = async () => {
        if (isFollowing) {
            await unfollow();
            setIsFollowing(false);
        } else {
            await follow();
            setIsFollowing(true);
        }
    };

    return (
        <>   {spinner && <Spinner/>}
            <div className="profileMain  inline-block w-full mt-16 text-white">
                <div className="Containerr max-w-screen-md mx-auto p-4">
                    <div className="rounded-lg p-4 text-center">
                        <div className="profile-picture md:w-44 md:h-44 h-32 w-32 rounded-full overflow-hidden mx-auto mb-3">
                            {userData && userData.profileImage ? (
                                <img
                                    className="h-full w-full object-cover"
                                    src={`/images/uploads/${userData.profileImage}`}

                                    alt="Profile Picture"
                                />
                            ) : (
                                <img
                                    className="h-full w-full object-cover"
                                    src="https://th.bing.com/th/id/R.ca1aa447d07684a6edc3067c6cf35b41?rik=vDTxmCKREnh4sQ&pid=ImgRaw&r=0"
                                    alt="Default Profile Picture"
                                />
                            )}
                        </div>
                        <h2 className="name text-gray-300 lg:text-3xl md:text-xl text-base  font-bold">{userData && userData.name}</h2>
                        <h3 className="username text-gray-300  md:text-base lg:text-lg text-sm md:mb-6 mb:mb-3  ">@{userData && userData.username}</h3>
                        <div className='flex flex-row items-center justify-center mt-2 gap-3'>
                            <div>
                                <h3 className="username text-gray-300 lg:text-lg md:text-lg text-sm md:mb-6 mb-3 ml-1 pl-1   ">{followersCount}</h3>
                                <h3 className="username text-gray-300 lg:text-lg md:text-lg text-sm md:mb-6 mb-3 ml-1 pl-1 ">Followers</h3>
                            </div>
                            <div>
                                <h3 className="username text-gray-300  lg:text-lg md:text-lg text-sm md:mb-6 mb-3 ml">{userData.following.length}</h3>
                                <h3 className="username text-gray-300 lg:text-lg md:text-lg text-sm md:mb-6 mb-3 ml-1 pl-1  ">Following</h3>
                            </div>
                            <div>
                                <h3 className="username text-gray-300 lg:text-lg md:text-lg text-sm md:mb-6 mb-3   ">{userData.posts.length}   </h3>
                                <h3 className="username text-gray-300 lg:text-lg md:text-lg text-sm md:mb-6 mb-3 ml-1 pl-1  ">Posts</h3>
                            </div>
                            <div className="flex justify-center gap-16">
                        </div>
                    </div>
                    {/* <button onClick={handleOnClick} className="inline-block button bg-red-600 text-white px-4 py-3 rounded-3xl mx-1 font-bold">
                            {userData.followers.length || result.followers === 1 ? 'Follower' : 'Followers'} {result.followers ? result.followers : userData.followers.length}
                        </button> */}
                    <button className="inline-block button bg-red-600 text-white px-4 py-3 rounded-3xl mx-1 font-bold" onClick={handleOnClick}>
                        {isFollowing ? 'Unfollow' : 'follow'}
                    </button>
                    <button to="/createpin" className="inline-block button bg-red-600 text-white px-4 py-3 rounded-3xl mx-1 font-bold">
                        Posted ({`${userData.posts.length}`})
                    </button>
                    <span className="bg-center">
                        <strong>
                            <h1 className="text-white lg:text-3xl md:text-2xl text-xl  mt-12">Created</h1>
                        </strong>
                    </span>
                </div>
            </div>
        </div >
            <div className='Container'>
                {userData.posts.map((data, index) => {
                    return <ClientPostCard key={index} postData={data} />;
                })}
            </div>

        </>
    );
};
