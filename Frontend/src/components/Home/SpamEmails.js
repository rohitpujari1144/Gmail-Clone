import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function SpamEmails() {
    let [allEmails, setAllEmails] = useState([])
    let [open, setOpen]=useState(false)
    let [popupMessage, setPopupMessage]=useState('')
    const userEmail=sessionStorage.getItem('userEmail')

    useEffect(() => {
        axios.get(`https://gmail-clone-email-be.onrender.com/getEmails/${userEmail}`)
            .then((response) => {
                setAllEmails(response.data)
            });
    }, [userEmail, allEmails])

    const allSpamEmails=allEmails.filter(e=>e.spam===true)

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

    function emptySpamNow(){
        axios.delete('https://gmail-clone-email-be.onrender.com/emptySpam')
            .then((response) => {
                setPopupMessage('All spam emails deleted successfully')
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
                                <h5 className='mt-2'>Spam Emails</h5>
                            </div>
                            <div className='ms-5 icon'>
                                <p className='text-primary mt-2' onClick={()=>{emptySpamNow()}}>Empty Spam Now</p>
                            </div>
                        </div>
                        <div className="" style={{maxHeight: "510px", overflowY:'auto'}}>
                            {
                                allSpamEmails.map((e, i) => {
                                    return (
                                        <div key={i} className="row mt-3 mb-1 p-1 unreadMail rounded-3" style={{ marginLeft: '1px', marginRight: '1px' }} >
                                            <div className='col-1'>
                                            </div>
                                            <div className='col icon' style={{ maxWidth: '100%', overflow: 'auto' }}  >
                                                <span>{e.emailSubject}</span> <span>{e.emailBody}</span>
                                            </div>
                                            <div className='col-1'>
                                                <i className="fs-5 fa-regular fa-trash-can icon delete" title='Delete'></i>
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

export default SpamEmails