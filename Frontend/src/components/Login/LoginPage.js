import { TextField } from '@mui/material'
import React from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function LoginPage() {
    let navigate = useNavigate()
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
                axios.get(`https://gmail-clone-be-zsgo.onrender.com/login/${emailInput.value}`)
                    .then((response) => {
                        if (response.data.message === "user found") {
                            sessionStorage.setItem('userEmail', emailInput.value)
                            sessionStorage.setItem('userFirstName', response.data.data[0].firstName)
                            sessionStorage.setItem('userLastName', response.data.data[0].lastName)
                            navigate('/login-password')
                        }
                        else {
                            emailError.style = 'margin-right:165px'
                            emailError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Email Id not exist`
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
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
                        <h3 className='mb-1 heading' style={{ fontFamily: 'sans-serif' }}><span className='text-primary'>G</span><span className='text-danger'>o</span><span className='text-warning'>o</span><span className='text-primary'>g</span><span className='text-success'>l</span><span className='text-danger'>e</span></h3>
                        <p className="fs-4 mb-1" style={{ fontFamily: 'sans-serif' }}>Sign in</p>
                        <p className="fs-6">to continue to Gmail</p>
                    </div>
                    <div className='text-center mt-4'>
                        <TextField style={{ width: '100%' }} id="emailInput" label="Email Id" variant="outlined" onKeyUp={() => { emailValidate() }} />
                        <span id='emailError' className='text-danger'></span>
                        <h6 className='text-primary forgotEmail mt-2' style={{ marginRight: '205px' }} onClick={() => { navigate('/forgot-email') }}>Forgot email ?</h6>
                    </div>
                    <div className='text-center mt-4'>
                        Test email Id: userone@gmail.com
                    </div>
                    <div className='d-flex justify-content-between' style={{ marginTop: '30px' }}>
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