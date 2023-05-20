import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function TrashEmails() {
    let [allEmails, setAllEmails] = useState([])
    let [open, setOpen]=useState(false)
    let [popupMessage, setPopupMessage]=useState('')
    const userEmail=sessionStorage.getItem('userEmail');
    
    useEffect(() => {
        axios.get(`https://gmail-clone-email-be.onrender.com/getEmails/${userEmail}`)
            .then((response) => {
                setAllEmails(response.data)
            });
    }, [allEmails, userEmail])

    const allTrashEmails=allEmails.filter(e=>e.isTrash===true && e.emailTo===userEmail)

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

    function moveToInboxClick(email) {
        let sendingEmailToInbox = {
            emailTo: email.emailTo,
            emailFrom: email.emailFrom,
            emailSenderName: email.emailSenderName,
            emailSubject: email.emailSubject,
            emailBody: email.emailBody,
            emailDateTime: email.emailDateTime,
            isRead: false
        }
        axios.put(`https://gmail-clone-email-be.onrender.com/trashEmail/${email._id}`, sendingEmailToInbox)
            .then((response) => {
                // console.log(response.data);
                setPopupMessage('Email successfully moved to inbox')
                handleClick()
            });
    }

    function emptyTrashNow(){
        axios.delete('https://gmail-clone-email-be.onrender.com/emptyTrash')
            .then((response) => {
                setPopupMessage('All trash emails deleted successfully')
                handleClick()
            });
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
                                <h5 className='mt-2'>Trash Emails</h5>
                            </div>
                            <div className='ms-5 icon'>
                                <p className='text-primary mt-2' onClick={()=>{emptyTrashNow()}}>Empty Trash Now</p>
                            </div>
                        </div>
                        <div className="" style={{maxHeight: "500px", overflowY:'auto'}}>
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
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={popupMessage} action={action}/>

        </>
    )
}

export default TrashEmails