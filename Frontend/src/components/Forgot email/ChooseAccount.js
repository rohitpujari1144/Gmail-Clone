import React, { useState, useEffect } from 'react'
import './chooseAccount.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ChooseAccount() {
    let navigate=useNavigate()
    let [allUsers, setAllUsers]=useState([])
    const userMobileNumber=sessionStorage.getItem('userMobileNumber')

    useEffect(() => {
        axios.get('https://gmail-clone-be-zsgo.onrender.com')
            .then((response) => {
                setAllUsers(response.data)
            });
    }, [allUsers])
    
    let userAccount=allUsers.filter((e)=>e.mobile===userMobileNumber)
    
    const chooseAccount=()=>{
        navigate('/login')
    }

    const useAnotherAccont=()=>{
        navigate('/login')
    }
    return (
        <>
            <div className="container col-4 shadow rounded position-absolute top-50 start-50 translate-middle">
                <div className='m-4'>
                    <div className="text-center">
                        <h3 className='mb-1 heading' style={{fontFamily:'sans-serif'}}><span className='text-primary'>G</span><span className='text-danger'>o</span><span className='text-warning'>o</span><span className='text-primary'>g</span><span className='text-success'>l</span><span className='text-danger'>e</span></h3>
                        <p className="fs-5 mt-3">Choose an account</p>
                    </div>
                    <div className=''>
                        {
                            userAccount.map((e, i) => {
                                return (<div key={i} className="ps-2 pt-1 pb-2 mt-2 rounded-3 d-flex justify-content-start chooseAccount" onClick={chooseAccount}>
                                    <div className="fs-3 mt-2">
                                        <i className="fa-regular fa-circle-user"></i>
                                    </div>
                                    <div className="ms-3 mt-1">
                                        <span>{e.firstName} {e.lastName}</span><br />
                                        <span>{e.username}</span>
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                    <div className="ps-2 pt-1 pb-1 mt-2 rounded-3 d-flex justify-content-start chooseAccount">
                        <div className="fs-3">
                            <i className="fa-regular fa-circle-user"></i>
                        </div>
                        <div className="ms-3 mt-2" onClick={useAnotherAccont}>
                            <p>Use another account</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChooseAccount