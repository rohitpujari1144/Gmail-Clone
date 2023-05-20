import React from 'react'
import './chooseAccount.css'
import { useNavigate } from 'react-router-dom';

function ChooseAccount() {
    let navigate=useNavigate()
    const forgotEmailUserInfo = JSON.parse(sessionStorage.getItem('forgotEmailUserInfo'))
    function accountChoose(account) {
        console.log(account);
    }
    return (
        <>
            <div className="container col-4 border border-secondary rounded position-absolute top-50 start-50 translate-middle">
                <div className='m-4'>
                    <div className="text-center">
                        <h3 className='mb-1'>Google</h3>
                        <p className="fs-5 mt-3">Choose an account</p>
                    </div>
                    <div className=''>
                        {
                            forgotEmailUserInfo.map((e, i) => {
                                return (<div key={i} className="ps-2 pt-1 pb-2 mt-2 rounded-3 d-flex justify-content-start chooseAccount">
                                    <div className="fs-3 mt-2">
                                        <i className="fa-regular fa-circle-user"></i>
                                    </div>
                                    <div className="ms-3 mt-1" onClick={() => { accountChoose(e) }}>
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
                        <div className="ms-3 mt-2" onClick={()=>{navigate('/login')}}>
                            <p>Use another account</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChooseAccount