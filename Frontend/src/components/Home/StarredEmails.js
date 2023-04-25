import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'
import './starredEmails.css'

function StarredEmails() {
    // let [allstarredEmails, setAllstarredEmails] = useState([])
    let [allEmails, setAllEmails] = useState([])

    useEffect(() => {
        axios.get('https://gmail-clone-email-be.onrender.com')
            .then((response) => {
                setAllEmails(response.data)
            });
    }, [allEmails])

    let starredEmails = allEmails.filter((e) => e.starred === true)

    function removeFromStar(email) {
        let updatedEmailDetails = {
            starred: false
        }
        axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
            .then((response) => {
                // console.log(response.data);
                alert('Email removed from star')
            });
    }

    return (
        <>
            <Navbar />
            <div style={{ marginTop: '30px' }}>
                <div className='row'>
                    <Sidebar />
                    <div className='col border border-dark rounded' style={{ height: '600px', marginRight: '40px' }}>
                        <div className='mt-2'>
                            <i className="fs-5 fa-solid fa-arrow-rotate-right icon" title='Refresh'></i>
                        </div>
                        <h5 className='mt-2'>Starred Emails</h5>
                        {
                            starredEmails.map((e, i) => {
                                return (
                                    <div key={i} className="row mt-3 mb-1 p-1 unreadMail rounded-3" style={{ marginLeft: '1px', marginRight: '1px' }} >
                                        <div className='col-1'>
                                            <i className="fs-5 fa-regular fa-star icon" style={{ color: 'yellow' }} title='Remove from star' onClick={() => { removeFromStar(e) }}></i>
                                            <i className="fs-5 fa-solid fa-tag ms-4 icon" title='Mark as Important'></i>
                                        </div>
                                        <div className='col icon' style={{ maxWidth: '100%', overflow: 'auto' }}  >
                                            <span>{e.emailSubject}</span> <span>{e.emailBody}</span>
                                        </div>
                                        <div className='col-1 '>
                                            <i className="fs-5 fa-regular fa-trash-can icon delete" title='Delete'></i>
                                            <i className="fs-5 ms-4 fa-regular fa-envelope-open icon" title='Mark as read' ></i>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default StarredEmails