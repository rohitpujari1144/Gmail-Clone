import React from 'react'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


function ForgotEmailNameDetails() {
    let navigate = useNavigate()
    const securityKey = sessionStorage.getItem('accountSecurityKey')

    function nextClick() {
        const fNameInput = document.getElementById('fNameInput')
        const fNameError = document.getElementById('fNameError')
        const lNameInput = document.getElementById('lNameInput')
        const lNameError = document.getElementById('lNameError')
        if (fNameInput.value === '') {
            fNameError.style = 'margin-right:225px'
            fNameError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (!isNaN(fNameInput.value)) {
                fNameError.style = 'margin-right:240px'
                fNameError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else {
                fNameError.innerHTML = ''
            }
        }
        if (lNameInput.value === '') {
            lNameError.style = 'margin-right:225px'
            lNameError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (!isNaN(lNameInput.value)) {
                lNameError.style = 'margin-right:240px'
                lNameError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else {
                lNameError.innerHTML = ''
            }
        }
        if (fNameError.innerHTML === '' && lNameError.innerHTML === '') {
            axios.get(`https://gmail-clone-be-zsgo.onrender.com/user/${fNameInput.value}/${lNameInput.value}/${securityKey}`)
                .then((response) => {
                    if (response.data.message === "user found") {
                        sessionStorage.setItem('userFirstName', response.data.data[0].firstName)
                        sessionStorage.setItem('userLastName', response.data.data[0].lastName)
                        sessionStorage.setItem('userEmailId', response.data.data[0].username)

                        navigate('/choose-account')
                    }
                    else {
                        navigate('/forgot-email-error')
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function fNameValidate() {
        const fNameInput = document.getElementById('fNameInput')
        const fNameError = document.getElementById('fNameError')
        if (fNameInput.value === '') {
            fNameError.style = 'margin-right:225px'
            fNameError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else if (!isNaN(fNameInput.value)) {
            fNameError.style = 'margin-right:240px'
            fNameError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid`
        }
        else {
            fNameError.innerHTML = ''
        }
    }

    function lNameValidate() {
        const lNameInput = document.getElementById('lNameInput')
        const lNameError = document.getElementById('lNameError')
        if (lNameInput.value === '') {
            lNameError.style = 'margin-right:225px'
            lNameError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else if (!isNaN(lNameInput.value)) {
            lNameError.style = 'margin-right:240px'
            lNameError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid`
        }
        else {
            lNameError.innerHTML = ''
        }
    }
    return (
        <>
            <div className="container col-3 shadow rounded position-absolute top-50 start-50 translate-middle">
                <div className='m-4'>
                    <div className="text-center">
                        <h3 className='mb-1 heading' style={{ fontFamily: 'sans-serif' }}><span className='text-primary'>G</span><span className='text-danger'>o</span><span className='text-warning'>o</span><span className='text-primary'>g</span><span className='text-success'>l</span><span className='text-danger'>e</span></h3>
                        <p className="fs-5 mb-1">What's your name ?</p>
                        <p className="fs-6">Enter the name on your Google Account</p>
                    </div>
                    <div className='text-center mt-4'>
                        <TextField style={{ width: '100%' }} id="fNameInput" label="First Name" variant="outlined" onKeyUp={() => { fNameValidate() }} />
                        <span id='fNameError' className='text-danger'></span>
                    </div>
                    <div className='text-center mt-4'>
                        <TextField style={{ width: '100%' }} id="lNameInput" label="Last Name" variant="outlined" onKeyUp={() => { lNameValidate() }} />
                        <span id='lNameError' className='text-danger' style={{ marginRight: '220px' }}></span>
                    </div>
                    <div className='text-center mt-3'>
                        Test details,<br/>First Name: user, Last Name: one
                    </div>
                    <div className='mt-3 d-flex justify-content-end' >
                        <button className='btn btn-primary' onClick={() => { nextClick() }}>Next</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotEmailNameDetails