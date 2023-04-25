import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupPhoneNumber() {
    let navigate = useNavigate()
    let userEmail = sessionStorage.getItem('signupUserEmail')
    let [allUsers, setAllUsers] = useState()
    useEffect(() => {
        axios.get('https://gmail-clone-be-zsgo.onrender.com')
            .then((response) => {
                setAllUsers(response.data)
            });
    }, [allUsers])

    function nextClick() {
        const mobile = document.getElementById('mobile')
        const mobileError = document.getElementById('mobileError')
        if (mobile.value === '') {
            mobileError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (isNaN(mobile.value)) {
                mobileError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else if (mobile.value.length < 10 || mobile.value.length > 10) {
                mobileError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else {
                let userMobileNumbar = { mobile: mobile.value }
                axios.put(`https://gmail-clone-be-zsgo.onrender.com/updateUser/${userEmail}`, userMobileNumbar)
                    .then((response) => {
                        navigate('/mobile-verify')
                        sessionStorage.setItem('signupMobileNumber', mobile.value)
                    });
            }
        }
    }

    function mobileValidate() {
        const mobile = document.getElementById('mobile')
        const mobileError = document.getElementById('mobileError')
        if (mobile.value === '') {
            mobileError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else if (isNaN(mobile.value)) {
            mobileError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
        }
        else {
            mobileError.innerHTML = ``
        }
    }
    return (
        <>
            <div className="container col-7 border border-secondary rounded position-absolute top-50 start-50 translate-middle">
                <div className='m-4'>
                    <div className='row'>
                        <div className="col-6">
                            <div>
                                <h3 className='mb-4'>Google</h3>
                                <p className="fs-4 mb-4">Verify your phone number</p>
                                <p className="fs-6">For your security, Google wants to make sure it’s really you. Google will send a text message with a verification code.</p>
                            </div>
                            <div style={{ marginTop: '40px' }}>
                                <TextField label="Phone number" id="mobile" size="small" onKeyUp={() => { mobileValidate() }} />
                                <p id='mobileError' className='text-danger'></p>
                            </div>
                            <div className='d-flex mt-5 justify-content-between' >
                                <div >
                                    <Button variant="text" href="/login">Back</Button>
                                </div>
                                <div>
                                    <button className='btn btn-primary' onClick={() => { nextClick() }}>Next</button>
                                </div>
                            </div>
                        </div>
                        <div className="col position-absolute top-50 end-0 translate-middle-y text-center pb-5" style={{ width: '320px', height: '320px', marginRight: '60px' }}>
                            <img src="https://ssl.gstatic.com/accounts/signup/glif/personal.svg" alt="" style={{ width: '100%', height: '100%' }} />
                            <p className='m-0'>Your personal info is private & safe</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupPhoneNumber