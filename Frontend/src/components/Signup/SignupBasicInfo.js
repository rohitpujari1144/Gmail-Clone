import React from 'react'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupBasicInfo() {
    let signupMobileNumber = sessionStorage.getItem('signupMobileNumber')
    let signupUserEmail = sessionStorage.getItem('signupUserEmail')
    let signupUserFirstName = sessionStorage.getItem('signupUserFirstName')

    let navigate = useNavigate()

    function mobileValidate() {
        const mobile = document.getElementById('mobile')
        const mobileError = document.getElementById('mobileError')
        if (mobile.value === '') {
            mobileError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else if (isNaN(mobile.value)) {
            mobileError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
        }
        else if (mobile.value.length < 10 || mobile.value.length > 10) {
            mobileError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
        }
        else {
            mobileError.innerHTML = ``
        }
    }

    function monthSelect() {
        const monthSelect = document.getElementById('monthSelect')
        const monthError = document.getElementById('monthError')
        if (monthSelect.value === 'month') {
            monthError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            monthError.innerHTML = ''
        }
    }

    function dayValidate() {
        const day = document.getElementById('day')
        const dayError = document.getElementById('dayError')
        if (day.value === '') {
            dayError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else if (isNaN(day.value)) {
            dayError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
        }
        else if (day.value <= 0 || day.value > 31) {
            dayError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
        }
        else {
            dayError.innerHTML = ''
        }
    }

    function yearValidate() {
        const year = document.getElementById('year')
        const yearError = document.getElementById('yearError')
        if (year.value === '') {
            yearError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else if (isNaN(year.value)) {
            yearError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
        }
        else if (year.value <= 1970 || year.value > 2025) {
            yearError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
        }
        else {
            yearError.innerHTML = ''
        }
    }

    function genderValidate() {
        const gender = document.getElementById('gender')
        const genderError = document.getElementById('genderError')
        if (gender.value === 'gender') {
            genderError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            genderError.innerHTML = ''
        }
    }

    function verifyClick() {
        const mobile = document.getElementById('mobile')
        const mobileError = document.getElementById('mobileError')
        const monthSelect = document.getElementById('monthSelect')
        const monthError = document.getElementById('monthError')
        const day = document.getElementById('day')
        const dayError = document.getElementById('dayError')
        const year = document.getElementById('year')
        const yearError = document.getElementById('yearError')
        const gender = document.getElementById('gender')
        const genderError = document.getElementById('genderError')
        if (mobile.value === '') {
            mobileError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (isNaN(mobile.value)) {
                mobileError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else if (mobile.value.length < 10 || mobile.value.length > 10) {
                mobileError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else {
                mobileError.innerHTML = ''
            }
        }
        if (monthSelect.value === 'month') {
            monthError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            monthError.innerHTML = ''
        }
        if (day.value === '') {
            dayError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (isNaN(day.value)) {
                dayError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else if (day.value <= 0 || day.value > 31) {
                dayError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else {
                dayError.innerHTML = ''
            }
        }
        if (year.value === '') {
            yearError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            if (isNaN(year.value)) {
                yearError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else if (year.value <= 1970 || year.value > 2025) {
                yearError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
            }
            else {
                yearError.innerHTML = ''
            }
        }
        if (gender.value === 'gender') {
            genderError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            genderError.innerHTML = ''
        }
        if (mobileError.innerHTML === '' && monthError.innerHTML === '' && dayError.innerHTML === '' && yearError.innerHTML === '' && genderError.innerHTML === '') {
            let userBasicInfo = {
                mobile: mobile.value,
                gender: gender.value
            }
            axios.put(`https://gmail-clone-be-zsgo.onrender.com/updateUser/${signupUserEmail}`, userBasicInfo)
                .then((response) => {
                    navigate('/privacy-terms')
                });
        }
    }
    return (
        <>
            <div className="container col-7 border border-secondary rounded position-absolute top-50 start-50 translate-middle">
                <div className='m-4'>
                    <div className='row'>
                        <div className="col-6">
                            <div>
                                <h3>Google</h3>
                                <p className="fs-4">{signupUserFirstName}, welcome to Google</p>
                                <p className="fs-5"><i className="fa-regular fa-circle-user"></i> {signupUserEmail}</p>
                            </div>
                            <div>
                                <TextField className='mt-2' label="Phone number" id="mobile" size="small" style={{ width: '70%' }} defaultValue={signupMobileNumber} onKeyUp={() => { mobileValidate() }} />
                                <p id='mobileError' className='text-danger'></p>
                                <p className='mt-1'>Google will use this number only for account security. Your number won’t be visible to others. You can choose later whether to use it for other purposes.</p>
                            </div>
                            <div className='row '>
                                <div className="col input-group mt-2">
                                    <select className="form-select" id="monthSelect" onChange={() => { monthSelect() }}>
                                        <option value='month'>Month</option>
                                        <option value="january">January</option>
                                        <option value="february">February</option>
                                        <option value="march">March</option>
                                        <option value="april">April</option>
                                        <option value="may">May</option>
                                        <option value="jun">June</option>
                                        <option value="july">July</option>
                                        <option value="august">August</option>
                                        <option value="september">September</option>
                                        <option value="october">October</option>
                                        <option value="november">November</option>
                                        <option value="december">December</option>
                                    </select>
                                    <p className='text-danger' id='monthError'></p>
                                    <p className='mt-1'>Your birthday</p>
                                </div>
                                <div className="col mt-2">
                                    <TextField label="Day" id="day" size="small" onKeyUp={() => { dayValidate() }} />
                                    <p id='dayError' className='text-danger'></p>
                                </div>
                                <div className="col mt-2">
                                    <TextField label="Year" id="year" size="small" onKeyUp={() => { yearValidate() }} />
                                    <p id='yearError' className='text-danger'></p>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <select className="form-select" id="gender" onChange={() => { genderValidate() }}>
                                    <option value='gender'>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <p className='text-danger' id='genderError'></p>
                            </div>
                            <div className='d-flex justify-content-between mt-5' >
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

export default SignupBasicInfo