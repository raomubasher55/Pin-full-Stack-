import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavbarContext from '../context/posts/NavbarContext';
import { Spinner } from './Spinner';


export const Login = () => {
    const { showNavbar, setShowNavbar } = useContext(NavbarContext);
    useEffect(() => {
        setShowNavbar(false);
    }, [])

    const [credential, setCredential] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [spinner, setSpinner] = useState(false)
    const navigate = useNavigate();

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const host = "https://main--pinproject.netlify.app/";
        setSpinner(true);
        try {
            const response = await fetch(`${host}login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',  //set cookies
                body: JSON.stringify({
                    username: credential.username,
                    password: credential.password
                }),
            });
            if (!response.ok) {
                setSpinner(false)
                const errorData = await response.json();
                if (errorData && errorData.errors) {
                    const errorMessages = errorData.errors.map((error) => error.msg);
                    toast.error(errorMessages[0], {
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
                if (!errorData.success) {
                    toast.error(errorData.message, {
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
            } else {
                setSpinner(false)
                const data = await response.json();
                if (data.success === true) {
                    navigate('/profile');
                } else {
                    toast.error(data.message, {
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
        } catch (error) {
            toast.error("An error occurred while logging in", {
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

    return (
        <>
            {spinner && <Spinner />}
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 shadow-lg p-4">
                    <div>
                        <img className="mx-auto md:w-11 md:h-11 lg:w-12 lg:h-12 w-10 h-10" src="https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png" alt="Pin logo" />
                        <h2 className="mt-6 text-center lg:text-3xl md:text-2xl text-xl font-extrabold text-gray-900">Login to your account</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <input onChange={onChange} value={credential.username} type="text" name="username" placeholder="Username" className="mb-4 block w-full p-2 border border-gray-300 rounded-md" />
                        <input onChange={onChange} value={credential.password} type="password" name="password" placeholder="Password" className="mb-4 block w-full p-2 border border-gray-300 rounded-md" />
                        <button type="submit" className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md">Login My Account</button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        <div className="text-center">
                            <Link to="#" className="text-blue-500">Forgot your password?</Link>
                        </div>
                    </form>
                    <footer className="text-xs text-gray-600">
                        <p>
                            By continuing, you agree to Pinterest's
                            <b className="font-bold"> Terms of Service </b>
                            and
                            <b className="font-bold"> Privacy Policy. </b>
                        </p>
                        <hr className="my-4 border-t border-gray-400" />
                        <div className="text-center">
                            <Link to="/signup" className="text-blue-500">Not on Pinterest yet? Sign up</Link>
                        </div>
                    </footer>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default Login;
