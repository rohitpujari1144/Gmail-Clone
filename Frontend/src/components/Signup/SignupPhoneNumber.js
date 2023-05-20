import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { auth } from '../config/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

function SignupPhoneNumber() {
    let navigate = useNavigate()
    let [allUsers, setAllUsers] = useState()

    let [button, setButton]=useState(false)
    let [phone, setPhone]=useState("")
    let [otp, setOtp]=useState("")
    let [user, setUser]=useState(null)

    useEffect(() => {
        axios.get('https://gmail-clone-be-zsgo.onrender.com')
            .then((response) => {
                setAllUsers(response.data)
            });
    }, [allUsers])

    const sendOtp=async()=>{
        try{  
          let recaptchaVerifier= await new RecaptchaVerifier("captchaDiv", {}, auth);
          let confirmation=await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
          console.log(confirmation);
          setUser(confirmation)
          setButton(true)
        }catch(error){
          console.log(error);
        }
      }

      const confirmOtp=async()=>{
        try{
          await user.confirm(otp)
          navigate('/privacy-terms')
  
        }catch(error){
          document.getElementById('otpError').innerHTML= `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Incorrect OTP`
        }
      }

      const otpInput=()=>{
        document.getElementById('otpError').innerHTML=''
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
                                <TextField label="Phone number" id="mobile" size="small" placeholder='+91 1234567890' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                                <p id='mobileError' className='text-danger'></p>
                                <button className='btn btn-primary' onClick={sendOtp}>Send OTP</button>
                            </div>
                            <div id='captchaDiv' className='mt-3'></div>
                            <div className='mt-3'>
                            {
                                button?
                                <div>
                                    <TextField label="OTP" id="otp" size="small" value={otp} onChange={(e)=>setOtp(e.target.value)} onKeyUp={otpInput}/>
                                    <p id='otpError' className='text-danger'></p>
                                    <button className='btn btn-primary' onClick={confirmOtp}>Verify OTP</button>
                                </div>:
                                <div>
                                    <TextField label="OTP" id="otp" size="small" value={otp} onChange={(e)=>setOtp(e.target.value)} onKeyUp={otpInput} disabled />
                                    <p id='otpError' className='text-danger'></p>
                                    <button className='btn btn-primary' onClick={confirmOtp} disabled>Verify OTP</button>
                                </div>
                            }
                                
                            </div>
                            <div className='mt-2'>
                                <button className='btn btn-primary' href="/signup">Back</button>
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