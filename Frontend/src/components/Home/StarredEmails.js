import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'
import './starredEmails.css'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function StarredEmails() {
    let [openEmail, setOpenEmail] = useState(false)
    let [topIcons, setTopIcons] = useState(false)
    let [viewEmail, setViewEmail] = useState([])
    let [allEmails, setAllEmails] = useState([])
    let [open, setOpen]=useState(false)
    let [popupMessage, setPopupMessage]=useState('')
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

    let starredEmails = allEmails.filter((e) => e.starred === true)
    let importantEmails=allEmails.filter((e) => e.important === true)

    function removeFromStar(email) {
        let updatedEmailDetails = {
            starred: false
        }
        axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
            .then((response) => {
                setPopupMessage('Email removed from star')
                handleClick()
            });
    }

    function markAsImportant(email){
        let importantEmailCheck=importantEmails.filter(e=>e._id===email._id)
        if(importantEmailCheck.length){
            setPopupMessage('Email already marked as important');
            handleClick()
        }
        else{
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

    function deleteClick(email){
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

    function emailClick(email){
        setOpenEmail(true)
        setTopIcons(true)
        setViewEmail(email)
    }

    function backClick(viewEmail){
        setOpenEmail(false)
        setTopIcons(false)
    }

    function reportSpamClick(viewEmail){
        const trashEmailDetails={
            emailTo:viewEmail.emailTo,
            emailFrom:viewEmail.emailFrom,
            emailSenderName:viewEmail.emailSenderName,
            emailSubject:viewEmail.emailSubject,
            emailBody:viewEmail.emailBody,
            emailDateTime:viewEmail.emailDateTime,
            spam:true
        }
        axios.put(`https://gmail-clone-email-be.onrender.com/trashEmail/${viewEmail._id}`, trashEmailDetails)
            .then((response) => {
                setPopupMessage('Email marked as spam')
                handleClick()
                setOpenEmail(false)
                setTopIcons(false)
            });
    }

    return (
        <>
            <Navbar />
            <div style={{ marginTop: '30px' }}>
                <div className='row'>
                    <Sidebar />
                    <div className='col border border-dark rounded' style={{ minHeight: '600px', marginRight: '40px' }}>
                        <div className='mt-3 ms-1'>
                            {
                                topIcons ?
                                    <div>
                                        <i className="fs-5 fa-solid fa-arrow-left ms-3 icon" title='Back to Inbox' onClick={() => { backClick(viewEmail) }}></i>
                                        <i className="fs-5 fa-solid fa-circle-exclamation ms-5 icon delete" title='Report spam' onClick={() => {reportSpamClick(viewEmail) }}></i>
                                        <i className="fs-5 fa-regular fa-trash-can ms-5 icon delete" title='Delete' onClick={() => { deleteClick(viewEmail) }}></i>
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
                                                <p className='fs-4'>{viewEmail.emailSubject} <i className="fa-solid fa-tag fs-4 icon" title='Mark as important' onClick={() => { markAsImportant(viewEmail) }}></i></p>
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
                                <div className='mt-3' style={{ maxWidth: '1250px' }}>
                                    <h5 className='mt-2'>Starred Emails</h5>
                                    <div className="" style={{maxHeight: "500px", overflowY:'auto'}}>  
                                        {
                                            starredEmails.map((e, i) => {
                                                return (
                                                    <div key={i} className="row mt-3 mb-1 p-1 unreadMail rounded-3" style={{ marginLeft: '1px', marginRight: '1px' }} >
                                                        <div className='col-1'>
                                                            <i className="fs-5 fa-regular fa-star icon" style={{ color: 'yellow' }} title='Remove from star' onClick={() => { removeFromStar(e) }}></i>
                                                            <i className="fs-5 fa-solid fa-tag ms-4 icon" title='Mark as Important' onClick={()=>{markAsImportant(e)}}></i>
                                                        </div>
                                                        <div className='col icon' style={{ maxWidth: '100%', overflow: 'auto' }} onClick={() => { emailClick(e) }} >
                                                            <span>{e.emailSubject}</span> <span>{e.emailBody}</span>
                                                        </div>
                                                        <div className='col-1 '>
                                                            <i className="fs-5 fa-regular fa-trash-can icon delete" title='Delete' onClick={()=>{deleteClick(e)}}></i>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                        } 
                    </div>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={popupMessage} action={action}/>
        </>
    )
}

export default StarredEmails