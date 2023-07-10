import React, { useState } from 'react'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './newPassword.css'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function NewPassword() {
    var count = 0
    let navigate = useNavigate()
    let [open, setOpen] = useState(false)

    function showPasswordClick() {
        const newPassword = document.getElementById('newPassword')
        const confirmPassword = document.getElementById('confirmPassword')
        const securityKey = document.getElementById('securityKey')
        count++
        if (count % 2 === 0) {
            newPassword.setAttribute('type', 'password')
            confirmPassword.setAttribute('type', 'password')
            securityKey.setAttribute('type', 'password')
        }
        else {
            newPassword.removeAttribute('type')
            confirmPassword.removeAttribute('type')
            securityKey.removeAttribute('type')
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    function usernameValidate() {
        const username = document.getElementById('username')
        const usernameError = document.getElementById('usernameError')
        if (username.value === '') {
            usernameError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            usernameError.innerHTML = ''
        }
    }

    function securityKeyValidate() {
        const securityKey = document.getElementById('securityKey')
        const securityKeyError = document.getElementById('securityKeyError')
        if (securityKey.value === '') {
            securityKeyError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            securityKeyError.innerHTML = ''
        }
    }

    function newPasswordValidate() {
        const newPassword = document.getElementById('newPassword')
        const newPasswordError = document.getElementById('newPasswordError')
        if (newPassword.value === '') {
            newPasswordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            newPasswordError.innerHTML = ''
        }
    }

    function confirmPasswordValidate() {
        const confirmPassword = document.getElementById('confirmPassword')
        const confirmPasswordError = document.getElementById('confirmPasswordError')
        if (confirmPassword.value === '') {
            confirmPasswordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            confirmPasswordError.innerHTML = ''
        }
    }

    function changePasswordClick() {
        const username = document.getElementById('username')
        const usernameError = document.getElementById('usernameError')
        const securityKey = document.getElementById('securityKey')
        const securityKeyError = document.getElementById('securityKeyError')
        const newPassword = document.getElementById('newPassword')
        const newPasswordError = document.getElementById('newPasswordError')
        const confirmPassword = document.getElementById('confirmPassword')
        const confirmPasswordError = document.getElementById('confirmPasswordError')
        if (username.value === '') {
            usernameError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            usernameError.innerHTML = ''
        }
        if (securityKey.value === '') {
            securityKeyError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            securityKeyError.innerHTML = ''
        }
        if (newPassword.value === '') {
            newPasswordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (newPassword.value.length < 5) {
                newPasswordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Password should be greater than 5`
            }
            else {
                newPasswordError.innerHTML = ''
            }
        }
        if (confirmPassword.value === '') {
            confirmPasswordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (confirmPassword.value !== newPassword.value) {
                confirmPasswordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Password should be same`
            }
            else {
                confirmPasswordError.innerHTML = ''
            }
        }
        if (usernameError.innerHTML === '' && securityKeyError.innerHTML === '' && newPasswordError.innerHTML === '' && confirmPasswordError.innerHTML === '') {
            let updatedPassword = {
                password: newPassword.value
            }

            axios.put(`https://gmail-clone-be-zsgo.onrender.com/updateUser/${username.value}/${securityKey.value}`, updatedPassword)
                .then((response) => {
                    if (response.data.message === "user found") {
                        setOpen(true)
                        setTimeout(() => {
                            navigate('/login')
                        }, 3500)
                    }
                    else {
                        document.getElementById('emailSecurityCodeError').innerText = '*Invalid email Id/security code'
                        setTimeout(() => {
                            document.getElementById('emailSecurityCodeError').innerText = ''
                        }, 4000);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
    return (
        <>
            <div className='container shadow col-4 rounded position-absolute top-50 start-50 translate-middle d-flex justify-content-center'>
                <div className='w-50'>
                    <h4 className='mt-2 text-center'>Enter Details</h4>
                    <div className='m-3'>
                        <TextField label="Email Id" className='md-small' id="username" size="small" onKeyUp={() => usernameValidate()} />
                        <span id='usernameError' className='text-danger' ></span>
                    </div>
                    <div className='m-3' >
                        <TextField label="Account Security Key" className='md-small' id="securityKey" size="small" onKeyUp={() => securityKeyValidate()} type='password' />
                        <span id='securityKeyError' className='text-danger' ></span>
                    </div>
                    <div className='m-3'>
                        <TextField label="New Password" id="newPassword" size="small" onKeyUp={() => newPasswordValidate()} type='password' />
                        <span id='newPasswordError' className='text-danger'></span>
                    </div>
                    <div className='m-3'>
                        <TextField label="Confirm Password" id="confirmPassword" size="small" onKeyUp={() => confirmPasswordValidate()} type='password' />
                        <span id='confirmPasswordError' className='text-danger'></span>
                    </div>
                    <div className='ms-3'>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Show password" onClick={() => { showPasswordClick() }} />
                        </FormGroup>
                    </div>
                    <div className='text-center mb-1'>
                        <span id='emailSecurityCodeError' className="text-danger"></span>
                    </div>
                    <div className='text-center mt-2'>
                        Test details, <br/>email id: userone@gmail.com<br/>account security key: 12345
                    </div>
                    <div className='mb-3 mt-3 text-center'>
                        <Button variant="contained" onClick={() => changePasswordClick()}>change password</Button>
                    </div>
                    <div className='text-center mb-3'>
                        <h6 className='text-primary backToLogin' onClick={() => { navigate('/login') }}>back to login</h6>
                    </div>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Password Successfully Changed" action={action} />
        </>
    )
}

export default NewPassword