import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PostCard } from './PostCard';
import { ClientPostCard } from './ClientPostCard';

export const ClientViewProfile = () => {
    const location = useLocation();
    const userData = location.state ? location.state.userData : null;
    const [result,  setReasult]  = useState({followers: ""})
    console.log(userData);
    const follow = async () => {
        try {
            const response = await fetch(`http://localhost:5000/follow/${userData._id}`, {
                method: "POST",
                credentials: "include",
            });
            const data = await response.json();
            setReasult({followers: data.result.followers.length});
            if (response.ok) {
                const data = await response.json();
                console.log("Follow success:", data);
            } else {
                console.error("Follow failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const unfollow = async () => {
        try {
            const response = await fetch(`http://localhost:5000/unnfollow/${userData._id}`, {
                method: "POST",
                credentials: "include",
            });
            const data = await response.json();
            setReasult({followers: data.result.followers.length});
            if (response.ok) {
                const data = await response.json();
                console.log("Follow success:", data);
            } else {
                console.error("Follow failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    const handleOnClick=()=>{
        
    }

    return (
        <>
            <div className="profileMain  inline-block w-full mt-16 text-white">
                <div className="Containerr max-w-screen-md mx-auto p-4">
                    <div className="rounded-lg p-4 text-center">
                        <div className="profile-picture w-44 h-44 rounded-full overflow-hidden m-auto mb-5">
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
                        <h2 className="name text-gray-300 text-4xl font-bold">{userData && userData.name}</h2>
                        <h3 className="username text-gray-300 text-lg mb-6">@{userData && userData.username}</h3>
                        <div className="flex justify-center gap-24 font-bold h-8">
                            <h3 className="username text-gray-300 text-lg mb-6">{userData.posts.length}   </h3>
                            <h3 className="username text-gray-300 text-lg mb-6">{userData.following.length}</h3>
                        </div>
                        <div className="flex justify-center gap-10">
                            <h3 className="username text-gray-300 text-lg mb-6 ml-6">Posts</h3>
                            <h3 className="username text-gray-300 text-lg mb-6 ml-1 pl-4">Following</h3>
                        </div>
                        <button onClick={handleOnClick} className="inline-block button bg-red-600 text-white px-4 py-3 rounded-3xl mx-1 font-bold">
                            {userData.followers.length || result.followers === 1 ? 'Follower' : 'Followers'} {result.followers ? result.followers : userData.followers.length}
                        </button>
                        <button to="/createpin" className="inline-block button bg-red-600 text-white px-4 py-3 rounded-3xl mx-1 font-bold">
                            Posted ({`${userData.posts.length}`})
                        </button>
                        <span className="bg-center">
                            <strong>
                                <h1 className="text-white text-3xl mt-12">Created</h1>
                            </strong>
                        </span>
                    </div>
                </div>
            </div>
            <div className='Container'>
                {userData.posts.map((data, index) => {
                    return <ClientPostCard key={index} postData={data} />;
                })}
            </div>

        </>
    );
};

