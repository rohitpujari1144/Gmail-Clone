import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import './home.css'
import axios from 'axios'

function NewHome() {
    let [topIcons, setTopIcons] = useState(false)
    let [openEmail, setOpenEmail] = useState(false)

    let [allEmails, setAllEmails] = useState([])
    let [viewEmail, setViewEmail] = useState([])

    let username = JSON.parse(sessionStorage.getItem('userLoginInfo'))

    let usersEmails = allEmails.filter((e) => e.emailTo === username[0].username)
    let usersReadEmails = usersEmails.filter((e) => e.isRead === true)
    let usersUnreadEmails = usersEmails.filter((e) => e.isRead === false)

    // let unreadEmails = allEmails.filter((e) => e.isRead === false)
    // let readEmails = allEmails.filter((e) => e.isRead === true)

    useEffect(() => {
        axios.get('https://gmail-clone-email-be.onrender.com')
            .then((response) => {
                setAllEmails(response.data)
            });
    }, [allEmails])

    function markStarClick(email) {
        let emailInfo = allEmails.filter((e) => e._id === email._id)
        if (emailInfo[0].starred === true) {
            alert('Email already marked as star')
        }
        else {
            let updatedEmailDetails = {
                starred: true
            }
            axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
                .then((response) => {
                    // console.log(response.data);
                    alert('Email marked as star')
                });
        }
    }

    function markImportantClick(email) {
        let emailInfo = allEmails.filter((e) => e._id === email._id)
        if (emailInfo[0].important === true) {
            alert('Email already marked as important')
        }
        else {
            let updatedEmailDetails = {
                important: true
            }
            axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
                .then((response) => {
                    // console.log(response.data);
                    alert('Email marked as important')
                });
        }
    }

    function deleteClick(email) {
        axios.delete(`https://gmail-clone-email-be.onrender.com/deleteEmail/${email._id}`)
            .then((response) => {
                // console.log(response.data);
                alert('Email successfully deleted')
            });
    }

    function markAsReadClick(email) {
        let emailInfo = allEmails.filter((e) => e._id === email._id)
        if (emailInfo[0].isRead === true) {
            alert('Email already marked as read')
        }
        else {
            let updatedEmailDetails = {
                isRead: true
            }
            axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
                .then((response) => {
                    // console.log(response.data);
                    alert('Email marked as read')
                });
        }
    }

    function markAsUnreadClick(email) {
        let emailInfo = allEmails.filter((e) => e._id === email._id)
        if (emailInfo[0].isRead === false) {
            alert('Email already marked as unread')
        }
        else {
            let updatedEmailDetails = {
                isRead: false
            }
            axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
                .then((response) => {
                    // console.log(response.data);
                    alert('Email marked as unread')
                });
        }
    }

    function emailClick(email) {
        setOpenEmail(true)
        setTopIcons(true)
        setViewEmail(email)
    }

    function backClick(email) {
        let emailInfo = allEmails.filter((e) => e._id === email._id)
        if (emailInfo[0].isRead !== true) {
            let updatedEmailDetails = {
                isRead: true
            }
            axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
                .then((response) => {
                    // console.log(response.data);
                });
            setOpenEmail(false)
            setTopIcons(false)
        }
        else {
            setOpenEmail(false)
            setTopIcons(false)
        }
    }

    function spamClick(email) {
        // let emailInfo = allEmails.filter((e) => e._id === email._id)
        // if (emailInfo[0].isSpam !== true) {
        //     let updatedEmailDetails = {
        //         isSpam: true
        //     }
        //     axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
        //         .then((response) => {
        //             // console.log(response.data);
        //             alert('Email marked as spam')
        //         });
        // }
        // else {
        //     alert('Email already marked as spam')
        // }

        let spamEmail = {
            emailTo: email.emailTo,
            emailFrom: email.emailFrom,
            emailSenderName: email.emailSenderName,
            emailSubject: email.emailSubject,
            emailBody: email.emailBody,
            emailDateTime: email.emailDateTime
        }
        axios.post(`https://gmail-clone-email-be.onrender.com/spamEmail`, spamEmail)
            .then((response) => {
                // console.log(response.data);
            })
        axios.delete(`https://gmail-clone-email-be.onrender.com/deleteEmail/${email._id}`)
            .then((response) => {
                // console.log(response.data);
                alert('Email marked as spam')

            })
        setOpenEmail(false)
        setTopIcons(false)
    }

    function deleteEmail(email) {
        let trashEmail = {
            emailTo: email.emailTo,
            emailFrom: email.emailFrom,
            emailSenderName: email.emailSenderName,
            emailSubject: email.emailSubject,
            emailBody: email.emailBody,
            emailDateTime: email.emailDateTime
        }
        axios.post(`https://gmail-clone-email-be.onrender.com/trashEmail`, trashEmail)
            .then((response) => {
                // console.log(response.data);
            })
        axios.delete(`https://gmail-clone-email-be.onrender.com/deleteEmail/${email._id}`)
            .then((response) => {
                // console.log(response.data);
                alert('Email deleted successfully')

            })
        setOpenEmail(false)
        setTopIcons(false)
    }

    function markUnread(email) {
        // let emailInfo = allEmails.filter((e) => e._id === email._id)
        let updatedEmailDetails = {
            isRead: false
        }
        axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
            .then((response) => {
                // console.log(response.data);
                alert('Email marked as unread')
                setOpenEmail(false)
                setTopIcons(false)
            });
    }

    function importantClick(email) {
        let emailInfo = allEmails.filter((e) => e._id === email._id)
        if (emailInfo[0].important === true) {
            alert('Email already marked as important')
        }
        else {
            let updatedEmailDetails = {
                important: true
            }
            axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
                .then((response) => {
                    // console.log(response.data);
                    alert('Email marked as important')
                });
        }
    }

    return (
        <>
            <Navbar />
            <div style={{ marginTop: '30px' }}>
                <div className='row'>
                    <Sidebar />
                    <div className='col border border-dark rounded' style={{ height: '600px', marginRight: '40px' }}>
                        <div className='mt-3 ms-1'>
                            {
                                topIcons ?
                                    <div>
                                        <i className="fs-5 fa-solid fa-arrow-left ms-3 icon" title='Back to Inbox' onClick={() => { backClick(viewEmail) }}></i>
                                        <i className="fs-5 fa-solid fa-circle-exclamation ms-5 icon delete" title='Report spam' onClick={() => { spamClick(viewEmail) }}></i>
                                        <i className="fs-5 fa-regular fa-trash-can ms-5 icon delete" title='Delete' onClick={() => { deleteEmail(viewEmail) }}></i>
                                        <i className="fs-5 fa-regular fa-envelope ms-5 icon" title='Mark as unread' onClick={() => { markUnread(viewEmail) }}></i>
                                    </div> :
                                    <i className="fs-5 fa-solid fa-arrow-rotate-right icon" title='Refresh'></i>
                            }

                        </div>
                        {
                            openEmail ?
                                <div>
                                    {
                                        <div className='mt-3'>
                                            <div className='ms-3'>
                                                <p className='fs-4'>{viewEmail.emailSubject} <i className="fa-solid fa-tag fs-4 icon" title='Mark as important' onClick={() => { importantClick(viewEmail) }}></i></p>
                                            </div>
                                            <div className='ms-3 d-flex justify-content-start'>
                                                <div className='mt-2'>
                                                    <i className="fa-regular fa-circle-user fs-4" ></i>
                                                </div>
                                                <div className='ms-2'>
                                                    <p className='fs-5'>{viewEmail.emailSenderName} {viewEmail.emailFrom}</p>
                                                    {/* <p className='fs-5'>emailSenderName senderEmailId</p> */}
                                                </div>
                                            </div>
                                            <div className='col-10 ms-3 fs-6 mb-3' style={{ height: '400px', overflowY: 'auto' }}>{viewEmail.emailBody}</div>
                                        </div>
                                    }
                                </div> :
                                <div>
                                    {/* inbox emails start */}
                                    <div className='mt-3' style={{ maxWidth: '1250px' }}>
                                        <div>
                                            <h5>Unread</h5>
                                        </div>
                                        <div className=' rounded-3' style={{ height: '180px', overflow: 'auto' }}>
                                            {
                                                usersUnreadEmails.map((e, i) => {
                                                    return (
                                                        <div key={i} className="row mb-1 p-1 unreadMail rounded-3" style={{ marginLeft: '1px', marginRight: '1px' }} >
                                                            <div className='col-1'>
                                                                <i className="fs-5 fa-regular fa-star icon" title='Star' onClick={() => { markStarClick(e) }}></i>
                                                                <i className="fs-5 fa-solid fa-tag ms-4 icon" title='Mark as Important' onClick={() => { markImportantClick(e) }}></i>
                                                            </div>
                                                            <div className='col icon' style={{ maxWidth: '100%', overflow: 'auto' }} onClick={() => { emailClick(e) }} >
                                                                <span>{e.emailSubject}</span> <span>{e.emailBody}</span>
                                                            </div>
                                                            <div className='col-1 '>
                                                                <i className="fs-5 fa-regular fa-trash-can icon delete" title='Delete' onClick={() => { deleteClick(e) }}></i>
                                                                <i className="fs-5 ms-4 fa-regular fa-envelope-open icon" title='Mark as read' onClick={() => { markAsReadClick(e) }}></i>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>
                                    {/* inbox emails end */}

                                    {/* read emails start */}
                                    <div className='mt-3'>
                                        <div>
                                            <h5>Everything else</h5>
                                        </div>
                                        <div className=' rounded-3' style={{ height: '270px', overflow: 'auto' }}>
                                            {
                                                usersReadEmails.map((e, i) => {
                                                    return (
                                                        <div key={i} className="row mb-1 p-1 unreadMail rounded-3" style={{ marginLeft: '1px', marginRight: '1px' }}>
                                                            <div className='col-1'>
                                                                <i className="fs-5 fa-regular fa-star icon" title='Star' onClick={() => { markStarClick(e) }}></i>
                                                                <i className="fs-5 fa-solid fa-tag ms-4 icon" title='Mark as Important' onClick={() => { markImportantClick(e) }}></i>
                                                            </div>
                                                            <div className='col icon' style={{ maxWidth: '100%', overflow: 'auto' }} onClick={() => { emailClick(e) }}>
                                                                <span>{e.emailSubject}</span> <span>{e.emailBody}</span>
                                                            </div>
                                                            <div className='col-1 '>
                                                                <i className="fs-5 fa-regular fa-trash-can icon delete" title='Delete' onClick={() => { deleteClick(e) }}></i>
                                                                <i className="fs-5 ms-4 fa-regular fa-envelope icon" title='Mark as unread' onClick={() => { markAsUnreadClick(e) }}></i>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>
                                    {/* read emails end */}
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewHome