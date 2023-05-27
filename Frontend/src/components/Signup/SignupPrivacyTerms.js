import { useNavigate } from 'react-router-dom';
import React from 'react'
import axios from 'axios';


function SignupPrivacyTerms() {
    let navigate = useNavigate()
    const userSignupData=JSON.parse(sessionStorage.getItem('userSignupData'))
    function nextClick() {
        axios.post('https://gmail-clone-be-zsgo.onrender.com/signup', userSignupData)
            .then((response) => {
                navigate('/home')
                sessionStorage.clear()
            });
    }
    return (
        <>
            <div className="container mt-4 mb-4 col-7 shadow rounded">
                <div className='m-4'>
                    <div className='row'>
                        <div className="col-6">
                            <div>
                                <h3 className='mb-1 heading' style={{fontFamily:'sans-serif'}}><span className='text-primary'>G</span><span className='text-danger'>o</span><span className='text-warning'>o</span><span className='text-primary'>g</span><span className='text-success'>l</span><span className='text-danger'>e</span></h3>
                                <p className="fs-4">Privacy and Terms</p>
                                <p>To create a Google Account, you’ll need to agree to the Terms of Service below.</p>
                                <p>In addition, when you create an account, we process your information as described in our Privacy Policy, including these key points:</p>
                            </div>
                            <div>
                                <b><label htmlFor="dataProcess">Data we process when you use Google</label></b>
                                <ul id='dataProcess'>
                                    <li>When you set up a Google Account, we store information you give us like your name, email address, and telephone number.</li>
                                    <li>When you use Google services to do things like write a message in Gmail or comment on a YouTube video, we store the information you create.</li>
                                    <li>When you search for a restaurant on Google Maps or watch a video on YouTube, for example, we process information about that activity – including information like the video you watched, device IDs, IP addresses, cookie data, and location.</li>
                                    <li>We also process the kinds of information described above when you use apps or sites that use Google services like ads, Analytics, and the YouTube video player.</li>
                                </ul>
                            </div>
                            <div>
                                <b>Why we process it</b>
                            </div>
                            <div>
                                <label htmlFor="googlePolicy">We process this data for the purposes described in our policy, including to:</label>
                                <ul id='googlePolicy'>
                                    <li>Help our services deliver more useful, customized content such as more relevant search results;</li>
                                    <li>Improve the quality of our services and develop new ones;</li>
                                    <li>Deliver personalized ads, depending on your account settings, both on Google services and on sites and apps that partner with Google;</li>
                                    <li>Improve security by protecting against fraud and abuse; and</li>
                                    <li>Conduct analytics and measurement to understand how our services are used. We also have partners that measure how our services are used. Learn more about these specific advertising and measurement partners.</li>
                                </ul>
                            </div>
                            <div>
                                <b>Combining data</b>
                                <p>We also combine this data among our services and across your devices for these purposes. For example, depending on your account settings, we show you ads based on information about your interests, which we can derive from your use of Search and YouTube, and we use data from trillions of search queries to build spell-correction models that we use across all of our services.</p>
                                <b>You’re in control</b>
                                <p>Depending on your account settings, some of this data may be associated with your Google Account and we treat this data as personal information. You can control how we collect and use this data now by clicking “More Options” below. You can always adjust your controls later or withdraw your consent for the future by visiting My Account (myaccount.google.com).</p>
                            </div>
                        </div>
                        <div className="col-5 text-center" style={{ width: '320px', height: '320px', marginTop: '150px', marginLeft: '50px' }}>
                            <img src="https://ssl.gstatic.com/accounts/signup/glif/privacy.svg" alt="" style={{ width: '100%', height: '100%' }} />
                            <p>You’re in control of the data we collect & how it’s used</p>
                        </div>
                        <div className='row mt-3 mb-3'>
                            <div className='col'>
                                <button type="button" className="btn btn-outline-primary" href="/basic-information">Back</button>
                            </div>
                            <div className='col me-5'>
                                <button className='btn btn-outline-primary' onClick={() => { nextClick() }}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupPrivacyTerms