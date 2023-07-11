import { TextField } from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPassword() {
    let navigate = useNavigate()
    var count = 0
    
    const userEmail = sessionStorage.getItem('userEmail')
    const userFirstName = sessionStorage.getItem('userFirstName')
    const userLastName = sessionStorage.getItem('userLastName')

    function nextClick() {
        const passwordInput = document.getElementById('passwordInput')
        const passwordError = document.getElementById('passwordError')
        if (passwordInput.value === '') {
            passwordError.style = 'margin-right:330px'
            passwordError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            axios.get(`https://gmail-clone-be-zsgo.onrender.com/login/${userEmail}`)
                .then((response) => {
                    if (response.data.data[0].password === passwordInput.value) {
                        navigate('/new-home')
                    }
                    else {
                        passwordError.style = 'margin-right:270px'
                        passwordError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid password`
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function showPasswordClick() {
        const passwordInput = document.getElementById('passwordInput')
        count++
        if (count % 2 === 0) {
            passwordInput.setAttribute('type', 'password')
        }
        else {
            passwordInput.removeAttribute('type')
        }
    }

    function passwordValidate() {
        const passwordInput = document.getElementById('passwordInput')
        const passwordError = document.getElementById('passwordError')
        if (passwordInput.value === '') {
            passwordError.style = 'margin-right:330px'
            passwordError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            passwordError.innerHTML = ''
        }
    }

    function forgotPasswordClick() {
        navigate('/new-password')
    }

    return (
        <>
            <div className="container col-4 shadow rounded position-absolute top-50 start-50 translate-middle p-5" >
                <div>
                    <div className="text-center">
                        <h3 className='mb-1 heading' style={{ fontFamily: 'sans-serif' }}><span className='text-primary'>G</span><span className='text-danger'>o</span><span className='text-warning'>o</span><span className='text-primary'>g</span><span className='text-success'>l</span><span className='text-danger'>e</span></h3>
                        <p className="fs-4 mb-1" >Hi {userFirstName} {userLastName}</p>
                        <p className="fs-5">{userEmail}</p>
                    </div>
                    <div>
                        <p className="fs-6">To continue, first verify it's you</p>
                    </div>
                    <div className='text-center mt-4'>
                        <TextField type="password" style={{ width: '100%' }} id="passwordInput" label="Enter your password" variant="outlined" onKeyUp={() => { passwordValidate() }} />
                        <span id='passwordError' className='text-danger'></span>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Show password" onClick={() => { showPasswordClick() }} />
                        </FormGroup>
                    </div>
                    <div className='text-center mt-3'>
                        Test password: userone@12345
                    </div>
                    <div className='d-flex justify-content-between' style={{ marginTop: '30px' }}>
                        <div >
                            <h6 className='text-primary createAccount' onClick={() => forgotPasswordClick()}>Forgot password ?</h6>
                        </div>
                        <div>
                            <button className='btn btn-primary' onClick={() => { nextClick() }}>Next</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default LoginPassword