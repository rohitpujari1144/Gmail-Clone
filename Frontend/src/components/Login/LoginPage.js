import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function LoginPage() {
    let navigate = useNavigate()
    let [allUsers, setAllUsers] = useState([])
    useEffect(() => {
        axios.get('https://gmail-clone-be-zsgo.onrender.com')
            .then((response) => {
                setAllUsers(response.data)
            });
    }, [allUsers])

    function loginClick() {
        const emailInput = document.getElementById('emailInput')
        const emailError = document.getElementById('emailError')
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
        if (emailInput.value === '') {
            emailError.style = 'margin-right:220px'
            emailError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (emailInput.value.match(emailPattern)) {
                let userEmail = allUsers.filter((elem) => elem.username === emailInput.value)
                if (userEmail.length) {
                    sessionStorage.setItem('userEmail', userEmail[0].username)
                    sessionStorage.setItem('userFirstName', userEmail[0].firstName)
                    sessionStorage.setItem('userLastName', userEmail[0].lastName)
                    navigate('/login-password')
                }
                else {
                    emailError.style = 'margin-right:165px'
                    emailError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Email Id not exist`
                }
            }
            else {
                emailError.style = 'margin-right:240px'
                emailError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid`
            }
        }
    }

    function emailValidate() {
        const emailInput = document.getElementById('emailInput')
        const emailError = document.getElementById('emailError')
        if (emailInput.value === '') {
            emailError.style = 'margin-right:220px'
            emailError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            emailError.innerText = ''
        }
    }
    return (
        <>
            <div className="container col-3 shadow rounded position-absolute top-50 start-50 translate-middle">
                <div className='m-4'>
                    <div className="text-center">
                        <h3 className='mb-1 heading' style={{fontFamily:'sans-serif'}}><span className='text-primary'>G</span><span className='text-danger'>o</span><span className='text-warning'>o</span><span className='text-primary'>g</span><span className='text-success'>l</span><span className='text-danger'>e</span></h3>
                        <p className="fs-4 mb-1" style={{fontFamily:'sans-serif'}}>Sign in</p>
                        <p className="fs-6">to continue to Gmail</p>
                    </div>
                    <div className='text-center mt-4'>
                        <TextField style={{ width: '100%' }} id="emailInput" label="Email Id" variant="outlined" onKeyUp={() => { emailValidate() }} />
                        <span id='emailError' className='text-danger'></span>
                        <h6 className='text-primary forgotEmail mt-2' style={{ marginRight: '205px' }} onClick={() => { navigate('/forgot-email') }}>Forgot email ?</h6>
                    </div>
                    <div className='d-flex justify-content-between' style={{ marginTop: '50px' }}>
                        <div >
                            <h6 className='text-primary createAccount' onClick={() => { navigate('/signup') }}>Create account</h6>
                        </div>
                        <div>
                            <button className='btn btn-primary' onClick={() => { loginClick() }}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage