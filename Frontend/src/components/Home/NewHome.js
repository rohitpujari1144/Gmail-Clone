import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import './home.css'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function NewHome() {
    let [open, setOpen] = useState(false)
    let [viewEmail, setViewEmail] = useState([])
    let [allEmails, setAllEmails] = useState([])
    let [topIcons, setTopIcons] = useState(false)
    let [openEmail, setOpenEmail] = useState(false)
    let [popMessage, setPopupMessage] = useState('')

    let userEmail = sessionStorage.getItem('userEmail')

    // useEffect(() => {
        axios.get(`https://gmail-clone-email-be.onrender.com/getEmails/${userEmail}`)
            .then((response) => {
                setAllEmails(response.data)
                // console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    // }, [setAllEmails, userEmail])

    // users read emails
    let usersReadEmails = allEmails.length ? allEmails.filter((e) => e.read === true) : ''

    // users unread emails
    let usersUnreadEmails = allEmails.length ? allEmails.filter((e) => e.read === false) : ''

    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )


    function markStarClick(email) {
        let emailInfo = allEmails.length ? allEmails.filter((e) => e._id === email._id) : ''
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
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function markImportantClick(email) {
        let emailInfo = allEmails.length ? allEmails.filter((e) => e._id === email._id) : ''
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
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function deleteClick(email) {
        const trashEmailDetails = {
            trash: true,
            starred: false,
            important: false,
            read: null,
            spam: false
        }
        axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, trashEmailDetails)
            .then((response) => {
                setPopupMessage('Email successfully deleted')
                handleClick()
                setOpenEmail(false)
                setTopIcons(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function markAsReadClick(email) {
        let emailInfo = allEmails.length ? allEmails.filter((e) => e._id === email._id) : ''
        if (emailInfo[0].read === true) {
            setPopupMessage('Email already marked as read')
            handleClick()
        }
        else {
            let updatedEmailDetails = {
                read: true
            }
            axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
                .then((response) => {
                    setPopupMessage('Email marked as read')
                    handleClick()
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function markAsUnreadClick(email) {
        let emailInfo = allEmails.length ? allEmails.filter((e) => e._id === email._id) : ''
        if (emailInfo[0].read === false) {
            setPopupMessage('Email already marked as unread')
            handleClick()
        }
        else {
            let updatedEmailDetails = {
                read: false
            }
            axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
                .then((response) => {
                    setPopupMessage('Email marked as unread')
                    handleClick()
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    function emailClick(email) {
        setOpenEmail(true)
        setTopIcons(true)
        setViewEmail(email)
    }

    function backClick(email) {
        let emailInfo = allEmails.length ? allEmails.filter((e) => e._id === email._id) : ''
        if (emailInfo[0].read !== true) {
            let updatedEmailDetails = {
                read: true
            }
            axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
                .then((response) => {
                    // console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
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
            starred: false,
            important: false,
            read: "",
            spam: true
        }
        axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, spamEmail)
            .then((response) => {
                setPopupMessage('Email marked as spam')
                handleClick()
                setOpenEmail(false)
                setTopIcons(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function markUnread(email) {
        let updatedEmailDetails = {
            read: false
        }
        axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
            .then((response) => {
                setPopupMessage('Email marked as unread')
                handleClick()
                setOpenEmail(false)
                setTopIcons(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function importantClick(email) {
        let emailInfo = allEmails.length ? allEmails.filter((e) => e._id === email._id) : ''
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
                })
                .catch((error) => {
                    console.log(error);
                })
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
                                            <div className='col-10 ms-3 fs-6 mb-3' style={{ height: '400px', overflowY: 'auto' }}>{viewEmail.emailBody}
                                                {/* <div className='border' style={{width:'150px', height:'150px'}}>
                                                    <img src={viewEmail.imageInput} alt=""  style={{width:'100%', height:'100%'}}/>
                                                </div> */}
                                             </div>
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
                                                usersUnreadEmails.length ? usersUnreadEmails.map((e, i) => {
                                                    return (
                                                        <div key={i} className="row mb-1 p-1 unreadMail rounded-3" style={{ marginLeft: '1px', marginRight: '1px' }} >
                                                            <div className='col-1'>
                                                                <i className="fs-5 fa-regular fa-star icon" title='Star' onClick={() => { markStarClick(e) }}></i>
                                                                <i className="fs-5 fa-solid fa-tag ms-4 icon" title='Mark as Important' onClick={() => { markImportantClick(e) }}></i>
                                                            </div>
                                                            <div className='col icon' style={{ maxWidth: '90%', overflow: 'hidden' }} onClick={() => { emailClick(e) }} >
                                                                <span>{e.emailSubject}</span> <span>{e.emailBody}</span>
                                                            </div>
                                                            <div className='col-1 '>
                                                                <i className="fs-5 fa-regular fa-trash-can icon delete" title='Delete' onClick={() => { deleteClick(e) }}></i>
                                                                <i className="fs-5 ms-4 fa-regular fa-envelope-open icon" title='Mark as read' onClick={() => { markAsReadClick(e) }}></i>
                                                            </div>
                                                        </div>
                                                    )
                                                }) : ''
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
                                                usersReadEmails.length ? usersReadEmails.map((e, i) => {
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
                                                }) : ''
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
                open ? <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={popMessage} action={action} /> : ''
            }
        </>
    )
}

export default NewHome