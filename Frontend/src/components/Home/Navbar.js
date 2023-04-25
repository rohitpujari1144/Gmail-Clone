import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    let navigate=useNavigate()
    function logoutClick(){
        sessionStorage.clear()
        navigate('/login')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
                <div className="container-fluid">
                    <a className="navbar-brand" href="javascript(void)">Gmail</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ marginLeft: "200px" }}>
                        <form className="d-flex" style={{ width: '60%' }}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className='row d-flex justify-content-end'>
                        <div className='col '>
                            <button onClick={()=>{logoutClick()}}>Logout</button>
                        </div>
                        <div className='col '>
                            <i className="fs-4 fa-regular fa-circle-question icon" title='Support'></i>
                        </div>
                        <div className='col'>
                            <i className="fs-4 fa-solid fa-gear icon" title='Settings'></i>
                        </div>
                        <div className='col'>
                            <i className="fs-4 fa-regular fa-circle-user icon" title='Profile'></i>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar