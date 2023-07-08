import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function DraftEmails() {
    let [allEmails, setAllEmails] = useState([])
    let [viewDraftEmail, setViewDraftEmail] = useState([])
    let [modal, setModal] = useState(false)
    let [popup, setPopup] = useState(false)
    let [open, setOpen] = useState(false)
    let [popupMessage, setPopupMessage] = useState('')

    const userFirstName = sessionStorage.getItem('userFirstName')
    const userLastName = sessionStorage.getItem('userLastName')
    const userEmail = sessionStorage.getItem('userEmail')

    useEffect(() => {
        axios(`https://gmail-clone-email-be.onrender.com/getEmails/${userEmail}`)
            .then((response) => {
                setAllEmails(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [setAllEmails, userEmail])

    let draftEmails = allEmails.length ? allEmails.filter((e) => e.draftEmail === true) : ''

    function openDraftEmail(email) {
        setViewDraftEmail(email)
        console.log(viewDraftEmail);
        setModal(true)
    }

    function modalClose() {
        setModal(!modal)
    }

    function deleteDraftEmail(email) {
        const trashEmailDetails = {
            trash: true,
            starred: false,
            important: false,
            read: null,
            spam: false,
            draftEmail: false
        }
        axios.put(`https://new-be.onrender.com/updateEmailInfo/${email._id}`, trashEmailDetails)
            .then((response) => {
                setPopupMessage('Draft Email successfully deleted')
                handleClick()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function sendEmailClick() {
        const emailTo = document.getElementById('emailTo')
        const emailSubject = document.getElementById('emailSubject')
        const emailBody = document.getElementById('emailBody')
        let sendingEmailDetails = {
            emailTo: emailTo.value,
            emailFrom: userEmail,
            emailSenderName: userFirstName + ' ' + userLastName,
            emailSubject: emailSubject.value,
            emailBody: emailBody.value,
            emailDateTime: new Date().toLocaleString(),
            read: false,
            draftEmail: false
        }
        axios.post('https://gmail-clone-email-be.onrender.com/newEmail', sendingEmailDetails)
            .then((response) => {
                setModal(false)
                setPopupMessage("Email sent")
                handleClick()
            })
            .catch((error) => {
                console.log(error);
            })
    }

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

    return (
        <>
            {/* compose new email modal start */}
            <Modal size='lg' isOpen={modal} toggle={() => { modalClose() }}>
                <ModalHeader toggle={() => { modalClose() }}>Draft Message</ModalHeader>
                <ModalBody>
                    <div className="container border border-secondary rounded">
                        <div>
                            <div className='mt-2 d-flex justify-content-center'>
                                <TextField id="emailTo" label="To" variant="standard" style={{ width: '80%' }} value={viewDraftEmail.emailTo} />
                            </div>
                            <span className="text-danger" id='emailToError'></span>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <TextField id="emailSubject" label="Subject" variant="standard" style={{ width: '80%' }} value={viewDraftEmail.emailSubject} />
                        </div>
                        <div className='mt-2 d-flex justify-content-center'>
                            <TextField id="emailBody" label="Email body" multiline rows={9} variant="standard" style={{ width: '80%' }} value={viewDraftEmail.emailBody} />
                        </div>
                        <div className='d-flex justify-content-start mt-3 mb-3' style={{ marginLeft: '75px' }}>
                            <Button variant="contained" endIcon={<SendIcon />} onClick={() => sendEmailClick()}>Send</Button>
                            <i className="ms-4 mt-2 fa-solid fa-font fs-5 icon" title='Formatting options'></i>
                            <i className="ms-4 mt-2 fa-solid fa-paperclip fs-5 icon" title='Attach files'></i>
                            <i className="ms-4 mt-2 fa-regular fa-face-smile fs-5 icon" title='Insert emoji'></i>
                            <i className="ms-4 mt-2 fa-regular fa-image fs-5 icon" title='Insert photo'></i>
                            <i className="mt-2 fa-regular fa-trash-can fs-5 icon delete" style={{ marginLeft: '313px' }} title='Delete'></i>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
            {/* compose new email modal end */}

            {/* email sent popup modal start */}
            <Modal size='sm' isOpen={popup} toggle={() => setPopup(!popup)}>
                <ModalHeader toggle={() => setPopup(!popup)}><b>Email sent</b></ModalHeader>
            </Modal>
            {/* email sent popup modal end */}

            <Navbar />
            <div style={{ marginTop: '30px' }}>
                <div className='row'>
                    <Sidebar />
                    <div className='col border border-dark rounded' style={{ minHeight: '600px', marginRight: '40px' }}>
                        <div className='mt-2'>
                            <i className="fs-5 fa-solid fa-arrow-rotate-right icon" title='Refresh'></i>
                        </div>
                        <h5 className='mt-2'>Draft Emails</h5>
                        <div className="" style={{ maxHeight: "510px", overflowY: 'auto' }}>
                            {
                                draftEmails.length ? draftEmails.map((e, i) => {
                                    return (
                                        <div key={i} className="row mt-3 mb-1 p-1 unreadMail rounded-3" style={{ marginLeft: '1px', marginRight: '1px' }} >
                                            <div className='col icon' style={{ maxWidth: '100%', overflow: 'auto' }} onClick={() => { openDraftEmail(e) }}>
                                                <span>{e.emailSubject}</span> <span>{e.emailBody}</span>
                                            </div>
                                            <div className='col-1 '>
                                                <i className="fs-5 fa-regular fa-trash-can icon delete" title='Delete' onClick={() => { deleteDraftEmail(e) }}></i>
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

export default DraftEmails