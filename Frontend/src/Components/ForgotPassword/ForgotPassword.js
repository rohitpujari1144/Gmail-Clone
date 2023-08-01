import React, { useState } from 'react'
import './forgotPassword.css'
import { useNavigate } from 'react-router'
import axios from 'axios'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Snackbar from '@mui/material/Snackbar'

function ForgotPassword() {
    let count=0;
    let navigate = useNavigate()
    let [open, setOpen] = useState(false)

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

    function securityCodeValidate() {
        const securityCode = document.getElementById('securityCode')
        const securityCodeError = document.getElementById('securityCodeError')
        if (securityCode.value === "") {
            securityCodeError.innerText = "*Required"
        }
        else {
            securityCodeError.innerText = ""
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

    async function changePasswordClick() {
        const email = document.getElementById('email')
        const emailError = document.getElementById('emailError')
        const securityCode = document.getElementById('securityCode')
        const securityCodeError = document.getElementById('securityCodeError')
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        const changePasswordError = document.getElementById('changePasswordError')
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
        if (email.value === "") {
            emailError.innerText = "*Required"
        }
        else {
            if (email.value.match(emailPattern)) {
                emailError.innerText = ""
            }
            else {
                emailError.innerText = "*Invalid"
            }
        }
        if (securityCode.value === "") {
            securityCodeError.innerText = "*Required"
        }
        else {
            securityCodeError.innerText = ""
        }
        if (password.value === "") {
            passwordError.innerText = "*Required"
        }
        else {
            if (password.value.length < 6) {
                passwordError.innerText = "*Password should be greater than 5 characters"
            }
            else {
                passwordError.innerText = ""
            }
        }
        if (emailError.innerText === "" && securityCodeError.innerText === "" && passwordError.innerText === "") {
            let newPasswordData = {
                password: password.value
            }
            await axios.put(`http://localhost:5000/updateUser?email=${email.value}&securityCode=${securityCode.value}`, newPasswordData)
                .then((res) => {
                    if (res.data.message === "Invalid credentials") {
                        changePasswordError.innerText = "*Invalid Email address/Security code"
                        setTimeout(() => {
                            changePasswordError.innerText = ""
                        }, 3000);
                    }
                    else {
                        setOpen(true)
                        setTimeout(() => {
                            navigate('/')
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
        const securityCode = document.getElementById('securityCode');
        count++;
        if (count % 2 === 0) {
            password.setAttribute('type', 'password')
            securityCode.setAttribute('type', 'password')
        }
        else {
            password.removeAttribute('type')
            securityCode.removeAttribute('type')
        }
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
            <div className="forgotPasswordMainDiv shadow rounded p-4">
                <div className='text-center'>
                    <h4 className='text-primary'>Change Password</h4>
                </div>
                <div>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="email" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => emailValidate()} />
                    <span id='emailError' className='text-danger'></span>
                </div>
                <div className='mt-3'>
                    <label htmlFor="securityCode" className="form-label">Account security code</label>
                    <input type="password" className="form-control" id="securityCode" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => securityCodeValidate()} />
                    <span id='securityCodeError' className='text-danger'></span>
                </div>
                <div className='mt-3'>
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input type="password" className="form-control" id="password" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => passwordValidate()} />
                    <span id='passwordError' className='text-danger'></span>
                </div>
                <div className='mt-2'>
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={()=>showPasswordClick()}/> Show password & security code
                </div>
                <div className='text-center mt-2'>
                    <span className='text-danger' id="changePasswordError"></span>
                </div>
                <div className='text-center mt-3'>
                    <button type="button" className="btn btn-outline-primary" onClick={() => changePasswordClick()}>Change Password</button>
                    <h6 className='mt-3 hoverText text-primary' onClick={() => { navigate('/') }}>back to login</h6>
                </div>
            </div>
            {
                open ? <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Password successfully updated" action={action} /> : ''
            }
        </>
    )
}

export default ForgotPassword