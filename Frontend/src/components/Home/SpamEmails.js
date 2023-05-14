import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'

function SpamEmails() {
    let [allEmails, setAllEmails] = useState([])
    const userLoginInfo=JSON.parse(sessionStorage.getItem('userLoginInfo'))

    useEffect(() => {
        axios.get(`https://gmail-clone-email-be.onrender.com/getEmails/${userLoginInfo[0].username}`)
            .then((response) => {
                setAllEmails(response.data)
            });
    }, [userLoginInfo, allEmails])

    const allSpamEmails=allEmails.filter(e=>e.spam===true)

    function emptySpamNow(){
        axios.delete('https://gmail-clone-email-be.onrender.com/emptySpam')
            .then((response) => {
                alert('All spam emails deleted successfully')
            });
    }
    return (
        <>
            <Navbar />
            <div style={{ marginTop: '30px' }}>
                <div className='row'>
                    <Sidebar />
                    <div className='col border border-dark rounded' style={{ minHeight: '600px', marginRight: '40px' }}>
                        <div className='mt-2'>
                            <i className="fs-5 fa-solid fa-arrow-rotate-right icon" title='Refresh'></i>
                        </div>
                        <div className='d-flex flex-direction-row'>
                            <div>
                                <h5 className='mt-2'>Spam Emails</h5>
                            </div>
                            <div className='ms-5 icon'>
                                <p className='text-primary mt-2' onClick={()=>{emptySpamNow()}}>Empty Spam Now</p>
                            </div>
                        </div>
                        <div className="" style={{maxHeight: "510px", overflowY:'auto'}}>
                            {
                                allSpamEmails.map((e, i) => {
                                    return (
                                        <div key={i} className="row mt-3 mb-1 p-1 unreadMail rounded-3" style={{ marginLeft: '1px', marginRight: '1px' }} >
                                            <div className='col-1'>
                                            </div>
                                            <div className='col icon' style={{ maxWidth: '100%', overflow: 'auto' }}  >
                                                <span>{e.emailSubject}</span> <span>{e.emailBody}</span>
                                            </div>
                                            <div className='col-1'>
                                                <i className="fs-5 fa-regular fa-trash-can icon delete" title='Delete'></i>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SpamEmails