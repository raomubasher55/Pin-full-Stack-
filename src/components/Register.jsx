import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarContext from '../context/posts/NavbarContext';
import { Spinner } from './Spinner';
export const Register = () => {
    const { showNavbar, setShowNavbar } = useContext(NavbarContext);
    useEffect(() => {
        setShowNavbar(false);
    }, [])

    const [credential, setCredential] = useState({ name: "", email: "", username: "", password: "" });
    const [errors, setErrors] = useState({ Error: "" });
    const [spinner, setSpinner] = useState(false)
    const navigate = useNavigate();

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const host = "https://main--pinproject.netlify.app/";
        setSpinner(true)
        const response = await fetch(`${host}signup`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: credential.name,
                email: credential.email,
                username: credential.username,
                password: credential.password
            }),
        });
        const data = await response.json();
        setSpinner(false);
        if (!response.ok) {
            if (data && data.errors) {
                const errorMessages = data.errors.map(error => error);
                console.log(errorMessages[0].msg);
                setErrors({ Error: errorMessages[0].msg })
                toast.error(errorMessages[0].msg, {
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
            else if (data) {
                if (data.success === false) {
                    console.log(data.error);
                    setErrors({ Error: data.error })
                    toast.error(data.error, {
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
            }
        } else {
            toast.success('Registered  Successfullly!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            navigate('/profile');
        }
    };

    return (
        <> {spinner && <Spinner />}
            <div className='w-full min-h-[120vh] bg-white'>
                <div className="h-screen w-full bg-cover backdrop-blur-10 flex justify-center items-center">
                    <div className="w-full max-w-md rounded-lg lg:mt-0 md:mt-6   mt-6 shadow-lg p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="container mx-auto px-4 pb-3">
                            <div className="content text-center  ">
                                <img src="https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png" alt="Pin logo"
                                    className="img1  mx-auto lg:mt-0 md:mt-1 mt-12 md:w-11 md:h-11 lg:w-12 lg:h-12 w-10 h-10" />
                                <p className="header telg:text-3xl md:text-2xl text-xl font-bold m">Create an account to see more</p>

                                {/* Display errors */}
                                <div className="text-red-500 mb-4">
                                    <p>{errors.Error}</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input type="text" name="name" placeholder="Full Name"
                                        className="detail mb-4 rounded-md p-2 border border-gray-300 block w-full" onChange={onChange} value={credential.name} />
                                    <input type="text" name="username" placeholder="Username"
                                        className="detail mb-4 rounded-md p-2 border border-gray-300 block w-full" onChange={onChange} value={credential.username} />
                                    <input type="email" name="email" placeholder="Email"
                                        className="detail mb-4 rounded-md p-2 border border-gray-300 block w-full" onChange={onChange} value={credential.email} />
                                    <input type="password" name="password" placeholder="Password"
                                        className="detail mb-4 rounded-md p-2 border border-gray-300 block w-full" onChange={onChange} value={credential.password} />
                                    <input type="submit"
                                        className="btn int py-2 px-4 bg-red-500 hover:bg-red-700 text-white rounded-md cursor-pointer block w-full"
                                        value="Register Account" />
                                </form>
                                <a href="/forget" className="text-blue-500 block mb-4">Forgot your password?</a>

                                <p className="or my-4 text-xl font-bold">OR</p>

                                <button className="btn fbk py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer mb-2 block w-full">
                                    <i className="fab fa-facebook fa-lg" style={{ color: 'white', paddingRight: '10px' }}></i>Continue with Facebook
                                </button>
                                <button className="btn ggl py-2 px-4 bg-yellow-500 text-black rounded-md cursor-pointer mb-4 block w-full">
                                    <i className="fab fa-google" style={{ color: 'black', paddingRight: '10px' }}></i>Continue with Google
                                </button>

                                <footer className="text-xs text-gray-600">
                                    <p>
                                        By continuing, you agree to Pinterest's
                                        <b className="font-bold">Terms of Service</b> and
                                        <b className="font-bold">Privacy Policy.</b>
                                    </p>
                                    <hr className="my-4 border-t border-gray-400" />
                                    <Link to="/login" className="text-blue-500 block">Already on Pinterest? Login</Link>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>

    )
}
