import React from 'react'
import { useNavigate } from 'react-router-dom'

function ForgotEmailError() {
    let navigate = useNavigate()
    return (
        <>
            <div className="container col-3 border border-secondary rounded position-absolute top-50 start-50 translate-middle">
                <div className='m-4'>
                    <div className="text-center">
                        <h3 className='mb-1'>Google</h3>
                        <p className="fs-5 mt-3">No account found</p>
                        <p className="fs-6 mt-3">There’s no Google Account with the info you provided.</p>
                    </div>
                    <div className='mt-4 d-flex justify-content-end' >
                        <button className="btn btn-primary" onClick={() => { navigate('/forgot-email') }}>Try again</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotEmailError