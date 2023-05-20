import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function ImportantEmails() {
    let [openEmail, setOpenEmail] = useState(false)
    let [topIcons, setTopIcons] = useState(false)
    let [viewEmail, setViewEmail] = useState([])
    let [allEmails, setAllEmails] = useState([])
    let [open, setOpen]=useState(false)
    let [popupMessage, setPopupMessage]=useState('')
    let userEmail = sessionStorage.getItem('userEmail');

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

    let importantEmails = allEmails.filter((e) => e.important === true)

    function markStarClick(email){
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

    function removeFromImportantClick(email) {
        let updatedEmailDetails = {
            important: false
        }
        axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, updatedEmailDetails)
            .then((response) => {
                // console.log(response.data);
                setPopupMessage('Email removed from important')
                handleClick()
                setOpenEmail(false)
                setTopIcons(false)
            });
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
                // console.log(response.data);
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

    function backClick(){
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
                                        <i className="fs-5 fa-solid fa-arrow-left ms-3 icon" title='Back to Inbox' onClick={() => { backClick() }}></i>
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
                                                <p className='fs-4'>{viewEmail.emailSubject} <i className="fa-solid fa-tag fs-4 icon" title='Mark as important' onClick={() => { removeFromImportantClick(viewEmail) }}></i></p>
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
                                    <h5 className='mt-2'>Important Emails</h5>
                                    <div className="" style={{maxHeight: "510px", overflowY:'auto'}}> 
                                        {
                                            importantEmails.map((e, i) => {
                                                return (
                                                    <div key={i} className="row mt-3 mb-1 p-1 unreadMail rounded-3" style={{ marginLeft: '1px', marginRight: '1px' }} >
                                                        <div className='col-1'>
                                                            <i className="fs-5 fa-regular fa-star icon" title='Star' onClick={() => { markStarClick(e) }}></i>
                                                            <i className="fs-5 fa-solid fa-tag ms-4 icon" title='Remove from Important' onClick={() => { removeFromImportantClick(e) }}></i>
                                                        </div>
                                                        <div className='col icon' style={{ maxWidth: '100%', overflow: 'auto' }} onClick={() => { emailClick(e) }}  >
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

export default ImportantEmails