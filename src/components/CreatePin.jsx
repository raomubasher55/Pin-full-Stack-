import React, { useContext, useEffect, useState } from 'react'
import postContext from '../context/posts/postContext'
import { PostCard } from './PostCard';
import { v4 as uuidv4 } from 'uuid';
import { Model } from './Model';
import NavbarContext from '../context/posts/NavbarContext';

export const CreatePin = () => {
    const context = useContext(postContext)
    const { showNavbar, setShowNavbar } = useContext(NavbarContext);
    const { addPost, updatePost } = context;
    const [post, setPost] = useState({ id: "", title: "", description: "", image: "" })
    const [postArray, setPostArray] = useState([]);
    const [showPostCard, setShowPostCard] = useState(false);
    const [preView, setPreView] = useState("");

    useEffect(() => {
        setShowNavbar(true)
    }, [])


    const loadPost = () => {
        document.querySelector('#chooseFile').click();
    }

    const uploadPost = (e) => {
        savePost(e);
    }

    const onchange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }
    const savePost = async (e) => {
        e.preventDefault();
        setPostArray([...postArray, { ...post, id: uuidv4() }])
        await addPost(post.title, post.description, post.image, post.id)
        // console.log(postArray);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPost({ ...post, image: file });      //backend me direct file send krai hoti h
            //          <--enough for backend--->


            //for fornt end for image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                const preImage = reader.result;
                setPreView(preImage);
            }
            reader.readAsDataURL(file);
        }
    };

    //for fornt end use
    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             const image = reader.result;
    //             setPost({ ...post, image });
    //         };
    //         reader.readAsDataURL(file);
    //     }

    // };




    return (
        <div>
            <div className="w-full  bg-gray mt-24 px-10 py-5 text-white">
                <div className='flex justify-between fixed md:w-[96%] w-[86%] md:py-3 z-0 createPin top-[72px]'>
                    <h1 className='md:p-3 p-0 font-bold md:text-xl'>Create Pin</h1>
                    <button onClick={uploadPost} id='public' className='bg-red-600 md:text-base text-sm rounded-full font-bold  md:px-6 lg:px-4 px-3 md:py-4 py-1  '>Public</button>
                </div>
                <hr className="opacity-30 mt-12" />
                <form id='uploadForm' encType="multipart/form]-data">
                    <div className='flex flex-row w-full'>
                        {post.image == "" ? <div onClick={loadPost} className="bg-gray-200  lg:h-[450px] md:h-[330px] h-[120px] lg:w-2/5 md:w-2/4 w-[60%]  rounded-md my-5 text-black">
                            <div className='flex flex-col justify-center items-center pt-4 lg:pt-44'>
                                <span className='md:hidden ld:hidden block'>
                                <lord-icon src="https://cdn.lordicon.com/fowixcuo.json" trigger="hover" style={{ width: "20px", height: "20px" }} ></lord-icon>
                                </span>
                                <span className='md:block lg:hidden hidden mt-16'>
                                <lord-icon src="https://cdn.lordicon.com/fowixcuo.json" trigger="hover"style={{ width: "50px", height: "50px" }}  ></lord-icon>
                                </span>
                                <span className='md:hidden lg:block hidden mt-32'>
                                <lord-icon src="https://cdn.lordicon.com/fowixcuo.json" trigger="hover" style={{ width: "50px", height: "50px" }}  ></lord-icon>
                                </span>
                                <span className='text-[5px] md:text-sm lg:text-base ml-1'>Choose a file or drag or and drop it here</span>
                                <input id='chooseFile' className="" type="file" name="file" hidden onChange={handleImageUpload} />
                            </div>

                            <p className='md:pt-32 lg:pt-36  pt-8 md:text-[10px] text-[4px] lg:text-sm text-center  md:px-4 px-2  '>
                                We recommend using  high quailty .jpg files less than 20MB
                            </p>
                        </div> : <div className="w-2/5 rounded-md my-5 text-black">
                            <div className='crads text-white justify-center mb-8 '>
                                <h1 className='text-center font-bold lg:text-3xl md:text-xl text-[10px] ' >Preview</h1>
                            </div>
                            <img className='rounded' src={preView} alt="" />
                        </div>}
                        <div className='w-full' >
                            <label htmlFor="title" className='block  md:mt-4 mt-8  md:mx-48 mx-16 font-bold lg:text-3xl md:text-xl text-[10px] '>Title:</label>
                            <input onChange={onchange} required minLength={3} className="block w-2/3  md:mx-48 mx-16 px-3 md:py-3 md:mt-4 mt-2  border-2 rounded-md  md:text-base text-[8px]   text-black" type="text" placeholder="Title" name="title" value={post.title} />
                            <label htmlFor="title" className='block  md:mx-48 mx-16 font-bold  md:mt-4 mt-2 lg:text-3xl md:text-xl text-[10px]'>Description:</label>
                            <textarea onChange={onchange} className="block w-2/3 md:mx-48 mx-16 px-3 md:py-3  md:mt-4 mt-2  border-2 rounded-md lg:min-h-48 md:min-h-38 md:text-base text-[8px] text-black" cols="30" rows="10" type="text" placeholder="Description" name="description" value={post.description} > </textarea>
                            <input className="block w-2/3 md:mx-48 mx-16 px-3 md:py-6 py-2 md:mt-12 mt-2 font-bold md:text-base text-[7px] rounded-md bg-red-600" type="submit" onClick={savePost} value="Add Pin" />
                        </div>
                    </div>
                </form>
            </div>
            <div className='crads text-white justify-center my-8 '>
                <h1 className='text-center font-bold  lg:text-3xl md:text-xl text-[10px] underline'>Recent Pin</h1>
            </div>
            <div className='container'>
                <PostCard />
            </div>
        </div>
    )
}
