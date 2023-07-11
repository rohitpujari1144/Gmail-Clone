import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function SpamEmails() {
    let [allEmails, setAllEmails] = useState([])
    let [open, setOpen] = useState(false)
    let [popupMessage, setPopupMessage] = useState('')
    const userEmail = sessionStorage.getItem('userEmail')

    // useEffect(() => {
        axios.get(`https://gmail-clone-email-be.onrender.com/getEmails/${userEmail}`)
            .then((response) => {
                setAllEmails(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    // }, [userEmail, setAllEmails])

    const spamEmails = allEmails.length ? allEmails.filter(e => e.spam === true) : ''

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

    function emptySpamNow() {
        if (spamEmails.length !== 0) {
            axios.delete(`https://gmail-clone-email-be.onrender.com/deleteAllSpamEmails/${userEmail}`)
                .then((response) => {
                    setPopupMessage('All spam emails deleted successfully')
                    handleClick()
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            setPopupMessage('No spam emails found')
            handleClick()
        }
    }

    function deleteSpamClick(email) {
        let trashEmailDetails = {
            spam: false,
            trash: true,
            starred: false,
            important: false,
            read: null,
        }
        axios.put(`https://gmail-clone-email-be.onrender.com/updateEmailInfo/${email._id}`, trashEmailDetails)
            .then((response) => {
                setPopupMessage('Spam email deleted successfully')
                handleClick()
            })
            .catch((error) => {
                console.log(error);
            })
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
                                <button className='btn btn-sm border-danger text-danger mt-1' onClick={() => { emptySpamNow() }}>Empty Spam Now</button>
                            </div>
                        </div>
                        <div className="" style={{ maxHeight: "510px", overflowY: 'auto' }}>
                            {
                                spamEmails.length ? spamEmails.map((e, i) => {
                                    return (
                                        <div key={i} className="row mt-3 mb-1 p-1 unreadMail rounded-3" style={{ marginLeft: '1px', marginRight: '1px' }} >
                                            <div className='col-1'>
                                            </div>
                                            <div className='col icon' style={{ maxWidth: '100%', overflow: 'auto' }}  >
                                                <span>{e.emailSubject}</span> <span>{e.emailBody}</span>
                                            </div>
                                            <div className='col-1'>
                                                <i className="fs-5 fa-regular fa-trash-can icon delete" title='Delete' onClick={() => { deleteSpamClick(e) }}></i>
                                            </div>
                                        </div>
                                    )
                                }) : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={popupMessage} action={action} />
        </>
    )
}

export default SpamEmails