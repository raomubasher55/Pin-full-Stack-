import React, { useState ,useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import PostContext from './postContext';
import { v4 as uuidv4 } from 'uuid';
import { PostCard } from '../../components/PostCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from '../../components/Spinner';


const PostState = (props) => {
    const [posts, setPosts] = useState([]);
    const [spinner, setSpinner] = useState(false)
    const host = 'http://localhost:5000/';
    const navigate = useNavigate();

    useEffect(() => {
        getAllPost();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    //Get all post
    const getAllPost = async () => {
        setSpinner(true)
        const response = await fetch(`${host}profile`, {
            method: "GET",
            credentials: 'include',
        });
        setSpinner(false)
        if(response.ok){
            const data = await response.json();
            const user = data.user;
            setPosts(user.posts)
        }else{
            navigate('/login')
        }
    }


    const addPost = async (title, description, image) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', image);

        try {
            setSpinner(true);
            const response = await fetch(`${host}createpin`, {
                method: "POST",
                credentials: "include",
                body: formData
            });
            setSpinner(false)
            const pin = await response.json();
            if(response.ok){
                setPosts([...posts , pin]);
                getAllPost();
            }else{
                toast.error(pin.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            toast.error("Error :", error , {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };


    // Update a post
    const updatePost = async(id, title, description) => {
        setSpinner(true);
        const response = await fetch(`${host}updatepin/${id}` ,{
            method: "PUT",
            credentials: "include",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({title ,description})
        });
        setSpinner(false);
        setPosts(posts.map(post => post.id === id ? [ ...posts , {title ,description }] : post));
            const data = await response.json();
            if(response.ok){
                getAllPost();
            }else{
                toast.error(data.message , {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
    };

    //Delete Post
    const deletePost = async(id) => {
        setSpinner(true);
        const response = await fetch(`${host}deletepin/${id}`,{
            method: "DELETE",
            credentials: "include",
            body: JSON.stringify(id)
        });
        setSpinner(false)
        const data = await response.json();
        setPosts(posts.filter(post => post.id !== id));
        getAllPost();
    }
    return (
        <PostContext.Provider value={{ posts, addPost, updatePost, deletePost, getAllPost }}>
            {spinner && <Spinner/>}
            {props.children}
            <ToastContainer/>
        </PostContext.Provider>
    );
};

export default PostState;
