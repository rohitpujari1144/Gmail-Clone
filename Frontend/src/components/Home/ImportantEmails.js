import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'

function ImportantEmails() {
    let [allEmails, setAllEmails] = useState([])
    let [allImportantEmails, setAllImportantEmails] = useState([])

    useEffect(() => {
        axios.get('https://gmail-clone-email-be.onrender.com')
            .then((response) => {
                setAllEmails(response.data)
            });
    }, [allEmails])

    let importantEmails = allEmails.filter((e) => e.important === true)

    function removeFromImportantClick(email) {
        let updatedEmailDetails = {
            important: false
        }
        axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
            .then((response) => {
                // console.log(response.data);
                alert('Email removed from important')
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
                        <h5 className='mt-2'>Important Emails</h5>
                        {
                            importantEmails.map((e, i) => {
                                return (
                                    <div key={i} className="row mt-3 mb-1 p-1 unreadMail rounded-3" style={{ marginLeft: '1px', marginRight: '1px' }} >
                                        <div className='col-1'>
                                            <i className="fs-5 fa-regular fa-star icon" title='Star'></i>
                                            <i className="fs-5 fa-solid fa-tag ms-4 icon" title='Remove from Important' onClick={() => { removeFromImportantClick(e) }}></i>
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

export default ImportantEmails