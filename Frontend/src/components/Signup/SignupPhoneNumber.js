import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { auth } from '../config/firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

function SignupPhoneNumber() {
    let navigate = useNavigate()
    let [allUsers, setAllUsers] = useState()

    let [phone, setPhone]=useState("")
    let [otp, setOtp]=useState("")
    let [user, setUser]=useState(null)

    let userSignupData=JSON.parse(sessionStorage.getItem('userSignupData'))

    useEffect(() => {
        axios.get('https://gmail-clone-be-zsgo.onrender.com')
            .then((response) => {
                setAllUsers(response.data)
            });
    }, [allUsers])

    const sendOtp=async()=>{
        const mobile=document.getElementById('mobile')
        const mobileError=document.getElementById('mobileError')
        if(mobile.value===''){
            mobileError.innerHTML=`<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else{
            // try{  
            //     let recaptchaVerifier= await new RecaptchaVerifier("captchaDiv", {}, auth);
            //     let confirmation=await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
            //     console.log(confirmation);
            //     setUser(confirmation)
            //   }catch(error){
            //     console.log(error);
            //   }
        }
      }

      const confirmOtp=async()=>{
        const otpInput=document.getElementById('otp')
        if(otpInput.value===''){
            document.getElementById('otpError').innerHTML= `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else{
            document.getElementById('otpError').innerHTML=''
            // try{
            //     await user.confirm(otp)
            //     navigate('/basic-information')
            //     userSignupData.mobile=document.getElementById('mobile').value
            //     sessionStorage.setItem('userSignupData', JSON.stringify(userSignupData))
        
            //   }catch(error){
            //     document.getElementById('otpError').innerHTML= `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Incorrect OTP`
            //   }
            navigate('/basic-information')
        }
      }

      const otpInput=()=>{
        document.getElementById('otpError').innerHTML=''
      }
    return (
        <>
            <div className="container col-7 shadow rounded position-absolute top-50 start-50 translate-middle">
                <div className='m-4'>
                    <div className='row'>
                        <div className="col-6">
                            <div>
                                <h3 className='mb-1 heading' style={{fontFamily:'sans-serif'}}><span className='text-primary'>G</span><span className='text-danger'>o</span><span className='text-warning'>o</span><span className='text-primary'>g</span><span className='text-success'>l</span><span className='text-danger'>e</span></h3>
                                <p className="fs-4 mb-4">Verify your phone number</p>
                                <p className="fs-6">For your security, Google wants to make sure it’s really you. Google will send a text message with a verification code.</p>
                            </div>
                            <div style={{ marginTop: '40px' }}>
                                <TextField label="Mobile number" id="mobile" size="small" placeholder='+91 1234567890' value={phone} onChange={(e)=>setPhone(e.target.value)} onKeyUp={()=>{document.getElementById('mobileError').innerHTML=''}}/>
                                <p id='mobileError' className='text-danger' ></p>
                                <p style={{fontSize:'95%'}}>Please enter mobile number in +91 1234567890 format</p>
                                <button className='btn btn-primary' onClick={sendOtp}>Send OTP</button>
                            </div>
                            <div id='captchaDiv' className='mt-3'></div>
                            <div className='mt-3'>
                                <div>
                                    <TextField label="OTP" id="otp" size="small" value={otp} onChange={(e)=>setOtp(e.target.value)} onKeyUp={otpInput}/>
                                    <p id='otpError' className='text-danger'></p>
                                    <button className='btn btn-primary' onClick={confirmOtp}>Verify OTP</button>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <button className='btn btn-primary' onClick={()=>{navigate('/signup')}}>Back</button>
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