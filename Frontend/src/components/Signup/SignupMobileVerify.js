import React from 'react'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function SignupMobileVerify() {
    let navigate = useNavigate()
    function verifyClick() {
        const otp = document.getElementById('otp')
        const otpError = document.getElementById('otpError')
        if (otp.value === '') {
            otpError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (isNaN(otp.value)) {
                otpError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else {
                navigate('/basic-information')
            }
        }
    }

    function codeValidate() {
        const otp = document.getElementById('otp')
        const otpError = document.getElementById('otpError')
        if (otp.value === '') {
            otpError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else if (isNaN(otp.value)) {
            otpError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
        }
        else {
            otpError.innerHTML = ''
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
                                <p>phone number</p>
                            </div>
                            <div style={{ marginTop: '40px' }}>
                                <TextField label="Enter verification code" id="otp" size="small" onKeyUp={() => { codeValidate() }} />
                                <p id='otpError' className='text-danger'></p>
                            </div>
                            <div className='d-flex mt-5 justify-content-between' >
                                <div >
                                    <Button variant="text" href="/login">Back</Button>
                                </div>
                                <div>
                                    <button className='btn btn-primary' onClick={() => { verifyClick() }}>Verify</button>
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

export default SignupMobileVerify