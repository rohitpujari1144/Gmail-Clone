import { TextField } from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPassword() {
    let navigate=useNavigate()
    var count = 0
    let [allUsers, setAllUsers]=useState([])
    const userEmail=sessionStorage.getItem('userEmail')
    const userFirstName=sessionStorage.getItem('userFirstName')
    const userLastName=sessionStorage.getItem('userLastName')

    useEffect(() => {
        axios.get('https://gmail-clone-be-zsgo.onrender.com')
            .then((response) => {
                setAllUsers(response.data)
            });
    }, [allUsers])

    function nextClick(){
        const passwordInput = document.getElementById('passwordInput')
        const emailError = document.getElementById('emailError')
        if(passwordInput.value===''){
            emailError.style='margin-right:210px'
            emailError.innerHTML=`<i class="fa-solid fa-circle-exclamation"></i> Please enter password`
        }
        else{
            let userExist=allUsers.filter(elem=>elem.username===userEmail)
            if(userExist[0].password===passwordInput.value){
                navigate('/new-home')
            }
            else{
                emailError.style='margin-right:250px'
                emailError.innerHTML=`<i class="fa-solid fa-circle-exclamation"></i> Invalid password`
            }
        }
    }

    function showPasswordClick() {
        const passwordInput = document.getElementById('passwordInput')
        count++
        if (count % 2 === 0) {
            passwordInput.setAttribute('type', 'password')
        }
        else {
            passwordInput.removeAttribute('type')
        }
    }

    function passwordValidate(){
        const passwordInput = document.getElementById('passwordInput')
        const emailError = document.getElementById('emailError')
        if(passwordInput.value===''){
            emailError.style='margin-right:210px'
            emailError.innerHTML=`<i class="fa-solid fa-circle-exclamation"></i> Please enter password`
        }
        else{
            emailError.innerHTML=''
        } 
    }

    return (
        <>
            <div className="container col-4 border border-secondary rounded position-absolute top-50 start-50 translate-middle">
                <div className='m-5'>
                    <div className="text-center">
                        <h3 className='mb-1'>Google</h3>
                        <p className="fs-4 mb-1">Hi {userFirstName} {userLastName}</p>
                        <p className="fs-5">{userEmail}</p>
                    </div>
                    <div>
                        <p className="fs-6">To continue, first verify it’s you</p>
                    </div>
                    <div className='text-center mt-4'>
                        <TextField type="password" style={{ width: '100%' }} id="passwordInput" label="Enter your password" variant="outlined" onKeyUp={() => { passwordValidate() }}/>
                        <span id='emailError' className='text-danger'></span>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Show password" onClick={() => { showPasswordClick() }} />
                        </FormGroup>
                    </div>
                    <div className='d-flex justify-content-between' style={{ marginTop: '50px' }}>
                        <div >
                            <h6 className='text-primary createAccount'>Forgot password ?</h6>
                        </div>
                        <div>
                            <button className='btn btn-primary' onClick={()=>{nextClick()}}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPassword