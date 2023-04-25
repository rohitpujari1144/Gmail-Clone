import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './sidebar.css'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { Button, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios'

function Sidebar() {
    let navigate = useNavigate()
    let [modal, setModal] = useState(false)
    let [popup, setPopup] = useState(false)

    let userLoginInfo=JSON.parse(sessionStorage.getItem('userLoginInfo'))

    function sendEmailClick() {
        const emailTo = document.getElementById('emailTo')
        const emailToError = document.getElementById('emailToError')
        const emailBody = document.getElementById('emailBody')
        const emailSubject = document.getElementById('emailSubject')
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
        if (emailTo.value === '') {
            emailToError.style = 'margin-left:75px'
            emailToError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else if (emailTo.value.match(emailPattern)) {
            emailToError.innerHTML = ''
            let currentDateTime = new Date().toLocaleString();
            let sendingEmailDetails = {
                emailTo: emailTo.value,
                emailFrom: userLoginInfo[0].username,
                emailSenderName: `${userLoginInfo[0].firstName}`+ ' '+`${userLoginInfo[0].lastName}`,
                emailSubject: emailSubject.value,
                emailBody: emailBody.value,
                emailDateTime: currentDateTime,
                emailId: '',
                isRead: false
            }
            axios.post('https://gmail-clone-email-be.onrender.com/newEmail', sendingEmailDetails)
                .then((response) => {
                    setModal(false)
                    setPopup(true)
                });

                let sentEmailDetails = {
                    emailTo: emailTo.value,
                    emailFrom: userLoginInfo[0].username,
                    emailSenderName: `${userLoginInfo[0].firstName}`+ ' '+`${userLoginInfo[0].lastName}`,
                    emailSubject: emailSubject.value,
                    emailBody: emailBody.value,
                    emailDateTime: currentDateTime,
                    emailId: '',
                    isRead: false
                }
                axios.post('https://gmail-clone-email-be.onrender.com/sentEmail', sentEmailDetails)
                    .then((response) => {
                        setModal(false)
                        setPopup(true)
                    });
        }
        else {
            emailToError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Invalid`
        }
    }

    function emailToValidate() {
        const emailTo = document.getElementById('emailTo')
        const emailToError = document.getElementById('emailToError')
        if (emailTo.value === '') {
            emailToError.style = 'margin-left:75px'
            emailToError.innerHTML = `<i class="fa-sharp fa-solid fa-circle-exclamation"></i> Required`
        }
        else {
            emailToError.innerHTML = ''
        }
    }

    function modalClose() {
        const emailTo = document.getElementById('emailTo')
        const emailSubject = document.getElementById('emailSubject')
        const emailBody = document.getElementById('emailBody')

        if (emailTo.value || emailSubject.value || emailBody.value) {
            let currentDateTime = new Date().toLocaleString();
            let draftEmailDetails = {
                emailTo: emailTo.value,
                emailFrom: userLoginInfo[0].username,
                emailSenderName: `${userLoginInfo[0].firstName}`+ ' '+`${userLoginInfo[0].lastName}`,
                emailSubject: emailSubject.value,
                emailBody: emailBody.value,
                emailDateTime: currentDateTime
            }
            axios.post('https://gmail-clone-email-be.onrender.com/draftEmail', draftEmailDetails)
                .then((response) => {
                    alert('Email saved as draft')
                    setModal(!modal)
                });
        }
        else {
            setModal(!modal)
        }
    }
    return (
        <>
            {/* compose new email modal start */}
            <Modal size='lg' isOpen={modal} toggle={() => { modalClose() }}>
                <ModalHeader toggle={() => { modalClose() }}>New Message</ModalHeader>
                <ModalBody>
                    <div className="container border border-secondary rounded">
                        <div>
                            <div className='mt-2 d-flex justify-content-center'>
                                <TextField id="emailTo" label="To" variant="standard" style={{ width: '80%' }} onKeyUp={() => { emailToValidate() }} />
                            </div>
                            <span className="text-danger" id='emailToError'></span>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <TextField id="emailSubject" label="Subject" variant="standard" style={{ width: '80%' }} />
                        </div>
                        <div className='mt-2 d-flex justify-content-center'>
                            <TextField id="emailBody" label="Email body" multiline rows={9} variant="standard" style={{ width: '80%' }} />
                        </div>
                        <div className='d-flex justify-content-start mt-3 mb-3' style={{ marginLeft: '75px' }}>
                            <Button variant="contained" endIcon={<SendIcon />} onClick={() => { sendEmailClick() }}>Send</Button>
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

            <div className="col-2">
                <div className='text-center' >
                    <button type="button" className="fs-5 btn btn-outline-primary" style={{ width: '70%' }} onClick={() => { setModal(true) }}><i className="fa-sharp fa-solid fa-pencil"></i> Compose</button>
                </div>
                <div className="row mt-3">
                    <div className="col icon" style={{ marginLeft: '37px' }}>
                        <p className='fs-5'><i className="fa-solid fa-inbox icon inbox" title='Inbox'></i></p>
                        <p className='fs-5'><i className="fa-regular fa-star icon " title='Starred'></i></p>
                        <p className='fs-5'><i className="fa-solid fa-tag icon" title='Important'></i></p>
                        <p className='fs-5'><i className="fa-regular fa-paper-plane icon sent" title='Sent'></i></p>
                        <p className='fs-5'><i className="fa-regular fa-file icon" title='Drafts'></i></p>
                        <p className='fs-5'><i className="fa-regular fa-trash-can icon delete" title='Delete'></i></p>
                        <p className='fs-5'><i className="fa-solid fa-circle-exclamation icon delete" title='Spam'></i></p>
                    </div>
                    <div className="col" style={{ marginRight: '40px' }}>
                        <p className='fs-5 icon inbox' onClick={() => { navigate('/new-home') }}>Inbox</p>
                        <p className='fs-5 icon' onClick={() => { navigate('/new-home/starred-emails') }}>Starred</p>
                        <p className='fs-5 icon' onClick={() => { navigate('/new-home/important-emails') }}>Important</p>
                        <p className='fs-5 icon sent' onClick={() => { navigate('/new-home/sent-emails') }}>Sent</p>
                        <p className='fs-5 icon' onClick={() => { navigate('/new-home/draft-emails') }}>Drafts</p>
                        <p className='fs-5 icon delete' onClick={() => { navigate('/new-home/trash-emails') }}>Trash</p>
                        <p className='fs-5 icon delete' onClick={() => { navigate('/new-home/spam-emails') }}>Spam</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar