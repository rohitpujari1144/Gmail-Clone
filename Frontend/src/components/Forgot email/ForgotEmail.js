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
            sessionStorage.setItem('userMobileNumber', mobile.value)
            navigate('/forgot-email-details')
        }
    }

    const mobileValidate=()=> {
        const mobile = document.getElementById('mobile')
        const mobileError = document.getElementById('mobileError')
        if (mobile.value === '') {
            mobileError.style = 'margin-right:225px'
            mobileError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            mobileError.innerHTML = ''
        }
    }
    return (
        <>
            <div className="container col-3 shadow rounded position-absolute top-50 start-50 translate-middle">
                <div className='m-4'>
                    <div className="text-center">
                        <h3 className='mb-1 heading' style={{fontFamily:'sans-serif'}}><span className='text-primary'>G</span><span className='text-danger'>o</span><span className='text-warning'>o</span><span className='text-primary'>g</span><span className='text-success'>l</span><span className='text-danger'>e</span></h3>
                        <p className="fs-5 mb-1">Find your email</p>
                        <p className="fs-6">Enter your mobile number</p>
                    </div>
                    <div className='text-center mt-4'>
                        <TextField style={{ width: '100%' }} id="mobile" label="Mobile number" variant="outlined" placeholder='+91 1234567890' onKeyUp={mobileValidate}/>
                        <span id='mobileError' className='text-danger'></span>
                    </div>
                    <p className='d-flex' style={{fontSize:'95%'}}>Please enter mobile number in <br/>+91 1234567890 format</p>
                    <div className='mt-4 d-flex justify-content-between' >
                        <div >
                            <Button variant="text" onClick={()=>{navigate('/login')}}>Back to login</Button>
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