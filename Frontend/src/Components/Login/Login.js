import React, { useState } from 'react'
import './login.css'
import axios from 'axios';
import { useNavigate } from 'react-router';
import Navbar from '../Navbar/Navbar';
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Snackbar from '@mui/material/Snackbar'
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';

function Login() {
    var count = 0;
    let [open, setOpen] = useState(false)
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/allRecipes')
            .then((res) => {
                sessionStorage.setItem('allRecipes', JSON.stringify(res.data))
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    function emailValidate() {
        const email = document.getElementById('email')
        const emailError = document.getElementById('emailError')
        if (email.value === "") {
            emailError.innerText = "*Required"
        }
        else {
            emailError.innerText = ""
        }
    }

    function passwordValidate() {
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        if (password.value === "") {
            passwordError.innerText = "*Required"
        }
        else {
            passwordError.innerText = ""
        }
    }

    function loginClick() {
        const email = document.getElementById('email')
        const emailError = document.getElementById('emailError')
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        const loginError = document.getElementById('loginError')
        if (email.value === "") {
            emailError.innerText = "*Required"
        }
        else {
            emailError.innerText = ""
        }
        if (password.value === "") {
            passwordError.innerText = "*Required"
        }
        else {
            passwordError.innerText = ""
        }
        if (emailError.innerText === "" && passwordError.innerText === "") {
            axios.get(`http://localhost:5000/login?email=${email.value}&password=${password.value}`)
                .then((res) => {
                    if (res.data.message === "Login Successful") {
                        async function getAllRecipes() {
                            await axios.get('http://localhost:5000/allRecipes')
                                .then((res) => {
                                    sessionStorage.setItem('allRecipes', JSON.stringify(res.data))
                                })
                                .catch((error) => {
                                    console.log(error);
                                })
                        }
                        getAllRecipes()
                        setOpen(true)
                        sessionStorage.setItem('userData', JSON.stringify(res.data.data[0]));
                        setTimeout(() => {
                            navigate('/home')
                        }, 2500);
                    }
                    else {
                        loginError.innerText = "*Invalid Email address/Password"
                        setTimeout(() => {
                            loginError.innerText = ""
                        }, 2500);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function showPasswordClick() {
        const password = document.getElementById('password');
        count++;
        if (count % 2 === 0) {
            password.setAttribute('type', 'password')
        }
        else {
            password.removeAttribute('type')
        }
    }

    const response = async (res) => {
        let password = '';
        let userObject = jwtDecode(res.credential);
        let loginError = document.getElementById('loginError');
        axios.get(`http://localhost:5000/login?email=${userObject.email}&password=${password}`)
            .then((res) => {
                if (res.data.message === "Login Successful") {
                    axios.get('http://localhost:5000/allRecipes')
                        .then((res) => {
                            sessionStorage.setItem('allRecipes', JSON.stringify(res.data))
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    setOpen(true)
                    sessionStorage.setItem('userData', JSON.stringify(userObject));
                    setTimeout(() => {
                        navigate('/home')
                    }, 2000);
                }
                else {
                    loginError.innerText = "*Email address not exist"
                    setTimeout(() => {
                        loginError.innerText = ""
                    }, 3000);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const error = (error) => {
        console.log(error)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )
    return (
        <>
            <Navbar myProfile={false} logout={false} />
            <div className="loginMainDiv shadow rounded" style={{}}>
                <div className='text-center'>
                    <h3 className='text-primary'>Login</h3>
                </div>
                <div>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="email" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => emailValidate()} />
                    <span id='emailError' className='text-danger'></span>
                </div>
                <div className='mt-3'>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => passwordValidate()} />
                    <span id='passwordError' className='text-danger'></span>
                </div>
                <div className='mt-2'>
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => showPasswordClick()} /> Show password
                </div>
                <div className='mt-1 text-center'>
                    <span className="text-danger" id='loginError'></span>
                </div>
                <div className='text-center mt-3'>
                    <button type="button" className="btn btn-outline-primary" onClick={() => loginClick()}>Login</button>
                    <div className="" style={{ width: 'fit-content', marginLeft: '60px', marginTop: '10px' }}>
                        <div>
                            <GoogleLogin onSuccess={response} onError={error} />
                        </div>
                    </div>
                    <h6 className='mt-3 hoverText' onClick={() => { navigate('/signup') }}>new user? <span className='text-primary' >create account</span></h6>
                    <h6 className=' hoverText' onClick={() => { navigate('/change-password') }}>forgot password? <span className='text-primary'>click here</span></h6>
                    <button className='btn btn-outline-primary btn-sm mt-2' onClick={() => navigate('/admin-login')}><i class="fa-solid fa-circle-user"></i> click here for admin login</button>
                </div>
            </div>
            {
                open ? <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Login successful" action={action} /> : ''
            }
        </>
    )
}

export default Login