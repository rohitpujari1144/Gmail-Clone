import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import './home.css'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function NewHome() {
    let [topIcons, setTopIcons] = useState(false)
    let [openEmail, setOpenEmail] = useState(false)
    let [allEmails, setAllEmails] = useState([])
    let [viewEmail, setViewEmail] = useState([])
    let [popMessage, setPopupMessage]=useState('')
    const [open, setOpen] = useState(false);

    let userEmail = sessionStorage.getItem('userEmail')
    useEffect(() => {
        axios.get(`https://gmail-clone-email-be.onrender.com/getEmails/${userEmail}`)
            .then((response) => {
                setAllEmails(response.data)
            });
    }, [allEmails, userEmail])

    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    // users read emails
    let usersReadEmails = allEmails.filter((e)=>e.isRead===true)
    // users unread emails
    let usersUnreadEmails = allEmails.filter((e)=>e.isRead===false)

    function markStarClick(email) {
        let emailInfo = allEmails.filter((e) => e._id === email._id)
        if (emailInfo[0].starred === true) {
            setPopupMessage('Email already marked as star')
            handleClick()
        }
        else {
            let updatedEmailDetails = {
                starred: true
            }
            axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
                .then((response) => {
                    setPopupMessage('Email marked as star')
                    handleClick()
                });
        }
    }

    function markImportantClick(email) {
        let emailInfo = allEmails.filter((e) => e._id === email._id)
        if (emailInfo[0].important === true) {
            setPopupMessage('Email already marked as important')
            handleClick()
        }
        else {
            let updatedEmailDetails = {
                important: true
            }
            axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
                .then((response) => {
                    setPopupMessage('Email marked as important')
                    handleClick()
                });
        }
    }

    function deleteClick(email) {
        const trashEmailDetails={
            emailTo:email.emailTo,
            emailFrom:email.emailFrom,
            emailSenderName:email.emailSenderName,
            emailSubject:email.emailSubject,
            emailBody:email.emailBody,
            emailDateTime:email.emailDateTime,
            isTrash:true
        }
        axios.put(`https://gmail-clone-email-be.onrender.com/trashEmail/${email._id}`, trashEmailDetails)
            .then((response) => {
                setPopupMessage('Email successfully deleted')
                handleClick()
                setOpenEmail(false)
                setTopIcons(false)
            });
    }

    function markAsReadClick(email) {
        let emailInfo = allEmails.filter((e) => e._id === email._id)
        if (emailInfo[0].isRead === true) {
            setPopupMessage('Email already marked as read')
            handleClick()
        }
        else {
            let updatedEmailDetails = {
                isRead: true
            }
            axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
                .then((response) => {
                    setPopupMessage('Email marked as read')
                    handleClick()
                });
        }
    }

    function markAsUnreadClick(email) {
        let emailInfo = allEmails.filter((e) => e._id === email._id)
        if (emailInfo[0].isRead === false) {
            setPopupMessage('Email already marked as unread')
            handleClick()
        }
        else {
            let updatedEmailDetails = {
                isRead: false
            }
            axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
                .then((response) => {
                    setPopupMessage('Email marked as unread')
                    handleClick()
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
        let spamEmail = {
            emailTo: email.emailTo,
            emailFrom: email.emailFrom,
            emailSenderName: email.emailSenderName,
            emailSubject: email.emailSubject,
            emailBody: email.emailBody,
            emailDateTime: email.emailDateTime,
            spam:true
        }
        axios.put(`https://gmail-clone-email-be.onrender.com/trashEmail/${email._id}`, spamEmail)
            .then((response) => {
                setPopupMessage('Email marked as spam')
                handleClick()
                setOpenEmail(false)
                setTopIcons(false)
            });
    }

    function markUnread(email) {
        let updatedEmailDetails = {
            isRead: false
        }
        axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
            .then((response) => {
                setPopupMessage('Email marked as unread')
                handleClick()
                setOpenEmail(false)
                setTopIcons(false)
            });
    }

    function importantClick(email) {
        let emailInfo = allEmails.filter((e) => e._id === email._id)
        if (emailInfo[0].important === true) {
            setPopupMessage('Email already marked as important')
            handleClick()
        }
        else {
            let updatedEmailDetails = {
                important: true
            }
            axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
                .then((response) => {
                    setPopupMessage('Email marked as important')
                    handleClick()
                });
        }
    }

    return (
        <>
            <Navbar />
            <div style={{ marginTop: '30px' }} >
                <div className='row'>
                    <Sidebar />
                    <div className='col border border-dark rounded' style={{ height: '600px', marginRight: '40px' }}>
                        <div className='mt-3 ms-1'>
                            {
                                topIcons ?
                                    <div>
                                        <i className="fs-5 fa-solid fa-arrow-left ms-3 icon" title='Back to Inbox' onClick={() => { backClick(viewEmail) }}></i>
                                        <i className="fs-5 fa-solid fa-circle-exclamation ms-5 icon delete" title='Report spam' onClick={() => { spamClick(viewEmail) }}></i>
                                        <i className="fs-5 fa-regular fa-trash-can ms-5 icon delete" title='Delete' onClick={() => { deleteClick(viewEmail) }}></i>
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
                                                            <div className='col icon' style={{ maxWidth: '90%', overflow: 'hidden'}} onClick={() => { emailClick(e) }} >
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
            {
                open?<Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={popMessage} action={action}/>:''
            }
        </>
    )
}

export default NewHome