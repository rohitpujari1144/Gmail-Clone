import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

function Navbar() {
    let navigate=useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = React.useState();
    const userEmail=sessionStorage.getItem('userEmail')
    const userFirstName=sessionStorage.getItem('userFirstName')
    const userLastName=sessionStorage.getItem('userLastName')

    function logoutClick(){
        sessionStorage.clear()
        navigate('/login')
    }

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
      };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
                <div className="container-fluid">
                    <span className="navbar-brand" style={{fontFamily:"Trebuchet MS"}}>Gmail Service</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className='row d-flex justify-content-end'>
                        <div className='col '>
                            <i className="fs-4 fa-regular fa-circle-question icon" title='Support'></i>
                        </div>
                        <div className='col'>
                            <i className="fs-4 fa-solid fa-gear icon" title='Settings'></i>
                        </div>
                        <div className='col'>
                            <i className="fs-4 fa-regular fa-circle-user icon" title='Profile' onClick={handleClick('bottom-end')}></i>
                        </div>

                        <Popper  open={open} anchorEl={anchorEl} placement={placement} transition>
                            {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper>
                                <div className='d-flex '>
                                    <div className='mt-4 ms-3'>
                                        <i className="fs-3 fa-regular fa-circle-user icon"></i>
                                    </div>
                                    <div className='mt-2 ms-2 me-3'>
                                        <span>{userFirstName} </span><span>{userLastName}</span> <br />
                                        <span>{userEmail}</span>
                                    </div>
                                </div>
                                <div className='mt-3 text-center pb-3'>
                                    <button className="btn btn-outline-warning" onClick={()=>{logoutClick()}}>Logout</button>
                                </div>
                                </Paper>
                            </Fade>
                            )}
                        </Popper>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar