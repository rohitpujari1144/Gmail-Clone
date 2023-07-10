import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function SentEmails() {
    let [allEmails, setAllEmails] = useState([]);
    let [openEmail, setOpenEmail] = useState(false);
    let [topIcons, setTopIcons] = useState(false);
    let [viewEmail, setViewEmail] = useState([]);
    let [open, setOpen] = useState(false)
    let [popMessage, setPopupMessage] = useState('')

    const userEmail = sessionStorage.getItem("userEmail");

    useEffect(() => {
        axios(`https://gmail-clone-email-be.onrender.com/getEmails/${userEmail}`)
            .then((response) => {
                setAllEmails(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [setAllEmails, userEmail]);

    let sentEmails = allEmails.length ? allEmails.filter((e) => e.sent === true) : ''

    function starClick(email) {
        let emailInfo = sentEmails.filter((e) => e._id === email._id)
        if (emailInfo[0].starred === true) {
            setPopupMessage('Email already marked as star')
            setOpen(true)
            setOpenEmail(false)
        }
        else {
            const sentEmailDetails = {
                starred: true
            }
            axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, sentEmailDetails)
                .then((response) => {
                    setPopupMessage('Email marked as star')
                    setOpen(true)
                    setOpenEmail(false)
                    setTopIcons(false)
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }

    function importantClick(email) {
        let emailInfo = sentEmails.filter((e) => e._id === email._id)
        if (emailInfo[0].important === true) {
            setPopupMessage('Email already marked as important')
            setOpen(true)
            setOpenEmail(false)
        }
        else {
            const sentEmailDetails = {
                important: true
            }
            axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, sentEmailDetails)
                .then((response) => {
                    setPopupMessage('Email marked as important')
                    setOpen(true)
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

    const backClick = () => {
        console.log('backClick');
        setOpenEmail(false)
        setTopIcons(false)
    }

    function deleteClick(viewEmail) {
        const sentEmailDetails = {
            trash: true,
            starred: false,
            important: false,
            read: null,
            spam: false,
            sent: false
        }
        axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${viewEmail._id}`, sentEmailDetails)
            .then((response) => {
                setPopupMessage('Email successfully deleted')
                setOpen(true)
                setOpenEmail(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }

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
    return (
        <>
            <Navbar />
            <div style={{ marginTop: "30px" }}>
                <div className="row">
                    <Sidebar />
                    <div className="col border border-dark rounded" style={{ minHeight: "600px", marginRight: "40px" }} >
                        <div className='mt-3 ms-1'>
                            {
                                topIcons ?
                                    <div>
                                        <i className="fs-5 fa-solid fa-arrow-left ms-3 icon" title='Back to Inbox' onClick={backClick}></i>
                                        <i className="fs-5 fa-regular fa-trash-can ms-5 icon delete" title='Delete' onClick={() => deleteClick(viewEmail)}></i>
                                    </div> :
                                    <i className="fs-5 fa-solid fa-arrow-rotate-right icon" title='Refresh'></i>
                            }
                        </div>
                        {
                            openEmail ?
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
                                </div> :
                                <div>
                                    <h5 className="mt-2">Sent Emails</h5>
                                    <div className="" style={{ maxHeight: "510px", overflowY: 'auto' }}>
                                        {
                                            sentEmails.length ? sentEmails.map((e, i) => {
                                                return (
                                                    <div key={i} className="row mt-3 mb-1 p-1 unreadMail rounded-3" style={{ marginLeft: "1px", marginRight: "1px" }}>
                                                        <div className="col-1">
                                                            <i className="fs-5 fa-regular fa-star icon" title="Star" onClick={() => { starClick(e) }}></i>
                                                            <i className="fs-5 fa-solid fa-tag ms-4 icon" title="Mark as Important" onClick={() => { importantClick(e) }}></i>
                                                        </div>
                                                        <div className="col icon" style={{ maxWidth: "100%", overflow: "hidden" }} onClick={() => emailClick(e)}>
                                                            <span>{e.emailSubject}</span> <span>{e.emailBody}</span>
                                                        </div>
                                                        <div className="col-1 ">
                                                            <i className="fs-5 fa-regular fa-trash-can icon delete" title="Delete" onClick={() => deleteClick(e)}></i>
                                                        </div>
                                                    </div>
                                                )
                                            }) : ''
                                        }
                                    </div>
                                </div>
                        }

                    </div>
                </div>
            </div>
            {
                open ? <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={popMessage} action={action} /> : ''
            }
        </>
    );
}

export default SentEmails;
