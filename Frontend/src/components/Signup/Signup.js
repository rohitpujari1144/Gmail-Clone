import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {
    var count = 0
    let navigate = useNavigate()
    let [allUsers, setAllUsers] = useState([])
    useEffect(() => {
        axios.get('https://gmail-clone-be-zsgo.onrender.com')
            .then((response) => {
                setAllUsers(response.data)
            });
    }, [allUsers])

    function showPasswordClick() {
        const password = document.getElementById('password')
        const cPassword = document.getElementById('cPassword')
        count++
        if (count % 2 === 0) {
            password.setAttribute('type', 'password')
            cPassword.setAttribute('type', 'password')
        }
        else {
            password.removeAttribute('type')
            cPassword.removeAttribute('type')
        }
    }

    function fNameValidate() {
        const fName = document.getElementById('fName')
        const fNameError = document.getElementById('fNameError')
        if (fName.value === '') {
            fNameError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else if (!isNaN(fName.value)) {
            fNameError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
        }
        else {
            fNameError.innerHTML = ''
        }
    }

    function lNameValidate() {
        const lName = document.getElementById('lName')
        const lNameError = document.getElementById('lNameError')
        if (lName.value === '') {
            lNameError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else if (!isNaN(lName.value)) {
            lNameError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
        }
        else {
            lNameError.innerHTML = ''
        }
    }

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

    function passwordValidate() {
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        if (password.value === '') {
            passwordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else if (password.value.length < 9) {
            passwordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Password length should be greater than 8`
        }
        else {
            passwordError.innerHTML = ''
        }
    }

    function cPasswordValidate() {
        const cPassword = document.getElementById('cPassword')
        const cPasswordError = document.getElementById('cPasswordError')
        if (cPassword.value === '') {
            cPasswordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            cPasswordError.innerHTML = ''
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

    function nextClick() {
        const fName = document.getElementById('fName')
        const fNameError = document.getElementById('fNameError')
        const lName = document.getElementById('lName')
        const lNameError = document.getElementById('lNameError')
        const username = document.getElementById('username')
        const usernameError = document.getElementById('usernameError')
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        const cPassword = document.getElementById('cPassword')
        const cPasswordError = document.getElementById('cPasswordError')
        const securityKey = document.getElementById('securityKey')
        const securityKeyError = document.getElementById('securityKeyError')
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/

        if (fName.value === '') {
            fNameError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (!isNaN(fName.value)) {
                fNameError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else {
                fNameError.innerHTML = ''
            }
        }
        if (lName.value === '') {
            lNameError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (!isNaN(lName.value)) {
                lNameError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else {
                lNameError.innerHTML = ''
            }
        }
        if (username.value === '') {
            usernameError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (username.value.match(emailPattern)) {
                usernameError.innerHTML = ''
            }
            else {
                usernameError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
            }
        }
        if (password.value === '') {
            passwordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (password.value.length < 9) {
                passwordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Password length should be greater than 8`
            }
            else {
                passwordError.innerHTML = ''
            }
        }
        if (cPassword.value === '') {
            cPasswordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (password.value !== cPassword.value) {
                cPasswordError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Password should be same`
            }
            else {
                cPasswordError.innerHTML = ''
            }
        }
        if (securityKey.value === '') {
            securityKeyError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if(securityKey.value.length<5){
                securityKeyError.innerHTML = '<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Should be greater the 5'
            }
            else{
                securityKeyError.innerHTML = ''
            }
        }
        if (fNameError.innerHTML === '' && lNameError.innerHTML === '' && usernameError.innerHTML === '' && passwordError.innerHTML === '' && cPasswordError.innerHTML === '' && securityKeyError.innerHTML === '') {
            let user = allUsers.filter((elem) => elem.username === username.value)
            if (user.length) {
                usernameError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> This Email Id already exist, use different`
            }
            else {
                let userSignupData = {
                    firstName: fName.value,
                    lastName: lName.value,
                    username: username.value,
                    password: password.value,
                    securityKey:securityKey.value
                }
                sessionStorage.setItem('userSignupData', JSON.stringify(userSignupData))
                navigate('/phone-number')
            }
        }
    }
    return (
        <>
            <div className="container col-7 shadow rounded position-absolute top-50 start-50 translate-middle">
                <div className='m-4'>
                    <div className='row'>
                        <div className="col-6">
                            <div>
                                <h3 className='mb-1 heading' style={{fontFamily:'sans-serif'}}><span className='text-primary'>G</span><span className='text-danger'>o</span><span className='text-warning'>o</span><span className='text-primary'>g</span><span className='text-success'>l</span><span className='text-danger'>e</span></h3>
                                <p className="fs-4 mb-1">Create your Google Account</p>
                                <p className="fs-6">to continue to Gmail</p>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <TextField label="First name" id="fName" size="small" onKeyUp={() => { fNameValidate() }} />
                                    <span id='fNameError' className='text-danger'></span>
                                </div>
                                <div className="col">
                                    <TextField label="Last name" id="lName" size="small" onKeyUp={() => { lNameValidate() }} />
                                    <span id='lNameError' className='text-danger'></span>
                                </div>
                            </div>
                            <div className='mb-4'>
                                <TextField style={{ width: '100%' }} label="Email Id" id="username" size="small" onKeyUp={() => { usernameValidate() }} />
                                <span id='usernameError' className='text-danger'></span>
                                <p>You can use letters, numbers & periods</p>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <TextField label="Password" id="password" size="small" type='password' onKeyUp={() => { passwordValidate() }} />
                                    <span id='passwordError' className='text-danger'></span>
                                </div>
                                <div className="col">
                                    <TextField label="Confirm" id="cPassword" size="small" type='password' onKeyUp={() => { cPasswordValidate() }} />
                                    <span id='cPasswordError' className='text-danger'></span>
                                </div>
                                <p className='mt-1'>Use 8 or more characters with a mix of letters, numbers & symbols</p>
                            </div>
                            <div className='row ms-1 me-1'>
                                <TextField label="Account Security Key" id="securityKey" size="small" onKeyUp={() => { securityKeyValidate() }} type='password'/>
                                <span id='securityKeyError' className='text-danger'></span>
                            </div>
                            <div className='mt-2'>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="Show password" onClick={() => { showPasswordClick() }} />
                                </FormGroup>
                            </div>
                            <div className='d-flex mt-3 justify-content-between' >
                                <div >
                                    <Button variant="text" href="/login">Sign in instead</Button>
                                </div>
                                <div>
                                    <button className='btn btn-primary' onClick={() => { nextClick() }}>Next</button>
                                </div>
                            </div>
                        </div>
                        <div className="col position-absolute top-50 end-0 translate-middle-y text-center pb-5" style={{ width: '320px', height: '320px', marginRight: '80px' }}>
                            <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt="" style={{ width: '100%', height: '100%' }} />
                            <p className='m-0'>One account. All of Google</p>
                            <p className='m-0'>working for you.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup