import React from 'react'
import './navbar.css'
import { useNavigate } from 'react-router'

function Navbar(props) {
    let navigate=useNavigate()
    function logoutClick(){
        sessionStorage.clear()
        navigate('/')
    }
    return (
        <>
            <nav className="navbar shadow navbar-expand-lg bg-light sticky-top">
                <div className="container-fluid">
                    <span className="navbar-brand" style={{ letterSpacing: '3px' }}>RECIPE BOOK</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                                props.home ? <li className="nav-item">
                                    <span className="nav-link active" aria-current="page" onClick={()=>navigate('/home')}>Home</span>
                                </li> : ""
                            }
                            {
                                props.myProfile ? <li className="nav-item">
                                    <span className="nav-link active" aria-current="page" onClick={()=>navigate('/profile')}>My Profile</span>
                                </li> : ""
                            }
                            {
                                props.logout ? <li className="nav-item">
                                    <span className="nav-link active" aria-current="page" onClick={()=>logoutClick()}>Logout</span>
                                </li> : ""
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar