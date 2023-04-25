import React from 'react'
import { useNavigate } from 'react-router-dom'

function ForgotEmailSendCode() {
    let navigate=useNavigate()
    const userMobileNumber=sessionStorage.getItem('userMobileNumber')
    return (
        <>
            <div className="container col-4 border border-secondary rounded position-absolute top-50 start-50 translate-middle">
                <div className='m-4'>
                    <div className="text-center">
                        <h3 className='mb-3'>Google</h3>
                        <p className="fs-5 mb-3">Get a verification code</p>
                        <p className="fs-6">To help keep your account safe, Google wants to<br />make sure it's really you trying to sign in</p>
                        <img style={{ width: '65%' }} src="https://img.freepik.com/premium-vector/smartphone-with-notification-bubble-chat_77417-2101.jpg?w=2000" alt="" />
                    </div>
                    <div>
                        <b>Get a verifictaion code</b>
                        <p className='mt-2'>Google will send a verification code to {userMobileNumber}.</p>
                        <i>Standard rates apply.</i>
                    </div>
                    <div className='mt-4 d-flex justify-content-end' >
                        <button className='btn btn-primary' onClick={()=>{navigate('/forgot-email-enter-code')}}>Send</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotEmailSendCode