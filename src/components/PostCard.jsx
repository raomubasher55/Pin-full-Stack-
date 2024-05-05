import React, { useContext, useEffect, useState } from 'react';
import postContext from '../context/posts/postContext';
import { Model } from './Model';

export const PostCard = () => {
    const { posts, updatePost, deletePost, getAllPost } = useContext(postContext);
    const [selectedPost, setSelectedPost] = useState(null);


    const handleUpdate = (post) => {
        setSelectedPost(post);
        // console.log(post);
        const modalToggle = document.getElementById("toggleBtn");
        modalToggle.click();
    };

    const handleDelete = (id) => {
        deletePost(id);
    }

    useEffect(() => {
        getAllPost();
    }, [])


    return (
        <>
            {posts && posts.length > 0 ? (
                <div className="Container">
                    {posts.map((post, index) => (
                        <div className="box cardColor p-2" key={index}>
                            <img src={`/images/uploads/${post.image}`} alt="image" />
                            <div className="caption font-bold mt-2">{post.title ? post.title : ""}</div>
                            <div className="caption font-bold mt-1">{post.description ? post.description : ""}</div>
                            <div className='flex justify-between mt-2'>
                                <lord-icon src="https://cdn.lordicon.com/drxwpfop.json" onClick={() => { handleDelete(post._id) }} className="hover:cursor-pointer" trigger="hover" stroke="bold" state="hover-line" colors="primary:#ffffff,secondary:#ffffff" style={{ width: "30px", height: "30px" }} ></lord-icon>
                                <lord-icon src="https://cdn.lordicon.com/wuvorxbv.json" onClick={() => handleUpdate(post)} className="hover:cursor-pointer" trigger="hover" stroke="bold" state="hover-line" colors="primary:#ffffff,secondary:#ffffff" style={{ width: "30px", height: "30px" }} ></lord-icon>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p> // Render a loading message while data is being fetched
            )}

            {/* Button to trigger the Bootstrap modal */}
            <button id="toggleBtn" style={{ display: "none" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Modal Toggle
            </button>
            {/* Pass selected post to Model component if it exists */}
            {selectedPost && <Model post={selectedPost} />}
        </>
    )
}
