import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ForgotEmail() {
    let navigate = useNavigate()
    let [allUsers, setAllUsers] = useState([])
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
            mobileError.style = 'margin-right:220px'
            mobileError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (isNaN(mobile.value)) {
                mobileError.style = 'margin-right:240px'
                mobileError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else if (mobile.value.length < 10 || mobile.value.length > 10) {
                mobileError.style = 'margin-right:240px'
                mobileError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else {
                let userInfo = allUsers.filter((elem) => elem.mobile === mobile.value)
                console.log(userInfo);
                sessionStorage.setItem('forgotEmailUserInfo', JSON.stringify(userInfo))
                navigate('/forgot-email-details')
            }
        }

    }

    function mobileValidate() {
        const mobile = document.getElementById('mobile')
        const mobileError = document.getElementById('mobileError')
        if (mobile.value === '') {
            mobileError.style = 'margin-right:225px'
            mobileError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else if (isNaN(mobile.value)) {
            mobileError.style = 'margin-right:240px'
            mobileError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid`
        }
        else {
            mobileError.innerHTML = ''
        }
    }
    return (
        <>
            <div className="container col-3 border border-secondary rounded position-absolute top-50 start-50 translate-middle">
                <div className='m-4'>
                    <div className="text-center">
                        <h3 className='mb-1'>Google</h3>
                        <p className="fs-5 mb-1">Find your email</p>
                        <p className="fs-6">Enter your phone number</p>
                    </div>
                    <div className='text-center mt-4'>
                        <TextField style={{ width: '100%' }} id="mobile" label="Phone number" variant="outlined" onKeyUp={() => { mobileValidate() }} />
                        <span id='mobileError' className='text-danger'></span>
                    </div>
                    <div className='mt-4 d-flex justify-content-between' >
                        <div >
                            <Button variant="text" href="/login">Back to login</Button>
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

export default ForgotEmail