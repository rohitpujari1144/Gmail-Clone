import { Button, TextField } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function ForgotEmailCodeEnter() {
    let navigate=useNavigate()
    const userMobileNumber=sessionStorage.getItem('userMobileNumber')
    function nextClick(){
        const codeInput=document.getElementById('codeInput')
        const codeError=document.getElementById('codeError')
        if(codeInput.value===''){
            codeError.innerHTML=`<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else{
            if(isNaN(codeInput.value)){
                codeError.innerHTML=`<i class="fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else{
                navigate('/choose-account')
            }
        }
    }

    function codeValidate(){
        const codeInput=document.getElementById('codeInput')
        const codeError=document.getElementById('codeError')
        if(codeInput.value===''){
            codeError.innerHTML=`<i class="fa-solid fa-circle-exclamation"></i> Required`
        }
        else if(isNaN(codeInput.value)){
            codeError.innerHTML=`<i class="fa-solid fa-circle-exclamation"></i> Invalid`
        }
        else{
            codeError.innerHTML=''
        }
    }
    return (
        <>
            <div className='container col-4   position-absolute top-50 start-50 translate-middle'>
                <div className='border border-secondary rounded'>
                    <div className='m-4'>
                        <div className="text-center">
                            <h3 className='mb-3'>Google</h3>
                            <p className="fs-5 mb-3">Enter the code</p>
                            <p className="fs-6">To help keep your account safe, Google wants to<br />make sure it’s really you trying to sign in</p>
                        </div>
                        <div>
                            <p>A text message with a verification code was just<br />sent to {userMobileNumber}</p>
                        </div>
                        <div className='mt-4'>
                            <TextField style={{ width: '100%' }} id="codeInput" label="Enter the code" variant="outlined" onKeyUp={()=>{codeValidate()}}/>
                            <span id='codeError' className='text-danger'></span>
                        </div>
                        <div className='mt-4 d-flex justify-content-end' >
                            <button className='btn btn-primary' onClick={()=>{nextClick()}}>Next</button>
                        </div>
                    </div>
                </div>
                <div className='container mt-3 border border-secondary rounded bg-dark'>
                    <div className=' d-flex bd-highlight'>
                        <div className="bd-highlight mt-2">
                            <p style={{ color: 'white' }}>Didn’t get the code?</p>
                        </div>
                        <div className="ms-auto bd-highlight mt-1" >
                            <Button style={{ color: 'yellow' }}>Resend It</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotEmailCodeEnter