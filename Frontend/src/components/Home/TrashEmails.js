import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'

function TrashEmails() {
    let [allTrashEmails, setAllTrashEmails] = useState([])
    useEffect(() => {
        axios.get('https://gmail-clone-email-be.onrender.com/allTrashEmails')
            .then((response) => {
                setAllTrashEmails(response.data)
            });
    }, [allTrashEmails])

    function moveToInboxClick(email) {
        console.log(email);
        let sendingEmailToInbox = {
            emailTo: email.emailTo,
            emailFrom: 'emailFrom@gmail.com',
            emailSenderName: "user user",
            emailSubject: email.emailSubject,
            emailBody: email.value,
            emailDateTime: email.emailDateTime,
            isRead: false
        }
        axios.post('https://gmail-clone-email-be.onrender.com/newEmail', sendingEmailToInbox)
            .then((response) => {
                // console.log(response.data);

            });
        axios.delete(`https://gmail-clone-email-be.onrender.com/deleteTrashEmail/${email._id}`)
            .then((response) => {
                // console.log(response.data);
                alert('Email moved to Inbox')
            })
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
                        <div className='d-flex flex-direction-row'>
                            <div>
                                <h5 className='mt-2'>Trash Emails</h5>
                            </div>
                            <div className='ms-5 icon'>
                                <p className='text-primary mt-2'>Empty Trash Now</p>
                            </div>
                        </div>
                        {
                            allTrashEmails.map((e, i) => {
                                return (
                                    <div key={i} className="row mt-3 mb-1 p-1 unreadMail rounded-3" style={{ marginLeft: '1px', marginRight: '1px' }} >
                                        <div className='col icon' style={{ maxWidth: '100%', overflow: 'auto' }}  >
                                            <span>{e.emailSubject}</span> <span>{e.emailBody}</span>
                                        </div>
                                        <div className='col-1 '>
                                            <i className="fs-5 fa-solid fa-trash-arrow-up icon delete" title='Move to Inbox' onClick={() => { moveToInboxClick(e) }}></i>
                                            {/* <i className="fs-5 fa-regular fa-trash-can icon delete" title='Move to Inbox'></i> */}
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

export default TrashEmails