import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'

import { auth } from './firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

function ForgotEmailSendCode() {
    let navigate=useNavigate()

    let [otp, setOtp]=useState("")
    let [user, setUser]=useState(null)

    const userMobileNumber=sessionStorage.getItem('userMobileNumber')

    const sendCode=async()=>{
        try{  
            let recaptchaVerifier= await new RecaptchaVerifier("recaptchaDiv", {}, auth);
            let confirmation=await signInWithPhoneNumber(auth, userMobileNumber, recaptchaVerifier);
            console.log(confirmation);
            setUser(confirmation)
          }catch(error){
            console.log(error);
          }
    }

    const confirmOtp=async()=>{
        const otpInput=document.getElementById('otp')
        const otpError=document.getElementById('otpError')
        if(otpInput.value===''){
            otpError.innerHTML= `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else{
            try{
                await user.confirm(otp);
                navigate('/choose-account')
              }catch(error){
                otpError.innerHTML=`<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Incorrect OTP`
              }
        }
      }

      const otpInput=()=>{
        const otpError=document.getElementById('otpError')
        otpError.innerHTML=''
      }
    return (
        <>
            <div className="container col-4 shadow rounded position-absolute top-50 start-50 translate-middle">
                <div className='m-4'>
                    <div className="text-center">
                        <h3 className='mb-1 heading' style={{fontFamily:'sans-serif'}}><span className='text-primary'>G</span><span className='text-danger'>o</span><span className='text-warning'>o</span><span className='text-primary'>g</span><span className='text-success'>l</span><span className='text-danger'>e</span></h3>
                        <p className="fs-5 mb-3">Get a verification code</p>
                        <p className="fs-6">To help keep your account safe, Google wants to<br />make sure it's really you trying to sign in</p>
                    </div>
                    <div>
                        <b>Get a verifictaion code</b>
                        <p className='mt-2'>Google will send a verification code to {userMobileNumber}.</p>
                    </div>
                    <div className='' >
                        <button className='btn btn-primary' onClick={sendCode}>Send</button>
                    </div>
                    <div id='recaptchaDiv' className='mt-3'></div>
                    <div className='mt-3'>
                        <TextField label="OTP" id="otp" size="small" value={otp} onChange={(e)=>setOtp(e.target.value)} onKeyUp={otpInput}/>
                        <p id='otpError' className='text-danger'></p>
                        <button className='btn btn-primary' onClick={confirmOtp}>Verify OTP</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotEmailSendCode