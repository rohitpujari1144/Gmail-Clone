import React from 'react'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function ForgotEmail() {
    let navigate = useNavigate()

    function nextClick() {
        const securityKey = document.getElementById('securityKey')
        const securityKeyError = document.getElementById('securityKeyError')
        if (securityKey.value === '') {
            securityKeyError.style = 'margin-right:220px'
            securityKeyError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            sessionStorage.setItem('accountSecurityKey', securityKey.value)
            navigate('/forgot-email-details')
        }
    }

    const securityKeyValidate=()=> {
        const securityKey = document.getElementById('securityKey')
        const securityKeyError = document.getElementById('securityKeyError')
        if (securityKey.value === '') {
            securityKeyError.style = 'margin-right:225px'
            securityKeyError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            securityKeyError.innerHTML = ''
        }
    }
    return (
        <>
            <div className="container col-3 shadow rounded position-absolute top-50 start-50 translate-middle">
                <div className='m-4'>
                    <div className="text-center">
                        <h3 className='mb-1 heading' style={{fontFamily:'sans-serif'}}><span className='text-primary'>G</span><span className='text-danger'>o</span><span className='text-warning'>o</span><span className='text-primary'>g</span><span className='text-success'>l</span><span className='text-danger'>e</span></h3>
                        <p className="fs-5 mb-1">Find your email</p>
                        <p className="fs-6">Enter your account security key</p>
                    </div>
                    <div className='text-center mt-4'>
                        <TextField style={{ width: '100%' }} id="securityKey" label="Account Security Key" variant="outlined" onKeyUp={securityKeyValidate}/>
                        <span id='securityKeyError' className='text-danger'></span>
                    </div>
                    <div className="text-center mt-3">
                        Test account security key: 12345
                    </div>
                    <div className='mt-3 d-flex justify-content-between' >
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