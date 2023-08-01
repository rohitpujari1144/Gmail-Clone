import React, { useState } from 'react'
import './adminPage.css'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { useEffect } from 'react'
// import { useNavigate } from 'react-router'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Snackbar from '@mui/material/Snackbar'

function AdminPage() {
  // let navigate = useNavigate()
  let [open, setOpen] = useState(false)
  let [allUsers, setAllUsers] = useState([])
  // let [allRecipes, setAllRecipes] = useState([])
  let [message, setMessage] = useState("")
  useEffect(() => {
    axios.get('http://localhost:5000/allUsers')
      .then((res) => {
        setAllUsers(res.data)
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://localhost:5000/allRecipes')
      .then((res) => {
        // setAllRecipes(res.data);
        sessionStorage.setItem('allRecipes', JSON.stringify(res.data))
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const recipes = JSON.parse(sessionStorage.getItem('allRecipes'))

  async function deleteAccount(userId) {
    let confirmation = window.confirm("Are you sure, you want to delete this account?")
    if (confirmation) {
      await axios.delete(`http://localhost:5000/deleteUser/${userId}`)
        .then((res) => {
          if (res.data.message === "Account successfully deleted") {
            async function getAllUsers() {
              await axios.get('http://localhost:5000/allUsers')
                .then((res) => {
                  setAllUsers(res.data)
                  setMessage("Account successfully deleted")
                  setOpen(true)
                })
                .catch((error) => {
                  console.log(error);
                })
            }
            getAllUsers()
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  async function deleteRecipeClick(recipeId) {
    let recipeDeleteConfirmation = window.confirm("Are you sure, you want to delete this recipe?")
    if (recipeDeleteConfirmation) {
      await axios.delete(`http://localhost:5000/deleteRecipe/${recipeId}`)
        .then((res) => {
          async function getAllRecipes() {
            await axios.get('http://localhost:5000/allRecipes')
              .then((res) => {
                setMessage("Recipe successfully deleted")
                setOpen(true)
                // setAllRecipes(res.data);
                sessionStorage.setItem('allRecipes', JSON.stringify(res.data))
              })
              .catch((error) => {
                console.log(error);
              })
          }
          getAllRecipes()
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  return (
    <>
      <Navbar logout={true} />
      <div className='m-5'>
        <div className="">
          <div>
            <h4>All Users</h4>
          </div>
          <div className='border' style={{ width: '70%', height: '250px', overflowY: 'auto', position: 'sticky', top: 0 }}>
            <table className="table" style={{ borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#a3a3a3', position: 'sticky', top: 0 }}>
                <tr>
                  <th scope="col" style={{ position: 'sticky', top: 0 }}>Sr. No.</th>
                  <th scope="col" style={{ position: 'sticky', top: 0 }}>Name</th>
                  <th scope="col" style={{ position: 'sticky', top: 0 }}>Email address</th>
                  <th scope="col" style={{ position: 'sticky', top: 0 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  allUsers.length ? allUsers.map((e, i) => {
                    return (<tr key={i}>
                      <td>{i + 1}</td>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td><button className='btn btn-outline-danger btn-sm' onClick={() => deleteAccount(e.userId)}><i className="fa-regular fa-trash-can"></i> Delete account</button></td>
                    </tr>)
                  }) : ''
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className='mt-5'>
          <h4>All Recipes</h4>
        </div>
        <div className='mt-4 border rounded p-3' style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', gridGap: '15px', height: '700px', overflow: 'auto' }}>
          {
            recipes.length ? recipes.map((e, i) => {
              return (
                <div key={i} className="cardDiv card border-0 shadow" style={{ width: '20rem' }}>
                  <div className='position-relative top-0 start-50 translate-middle-x mt-3' style={{ width: '250px', height: '250px' }}>
                    <img src={e.imgAddress} className="rounded card-img-top" alt={e.name} style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{e.name}</h5>
                    <p className="card-text">{e.description}</p>
                  </div>
                  <div className='m-2'>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => { deleteRecipeClick(e.recipeId) }}><i className="fa-regular fa-trash-can"></i> Delete Recipe</button>
                  </div>
                </div>
              )
            }) : ''
          }
        </div>
      </div>
      {
        open ? <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={message} action={action} /> : ''
      }
    </>
  )
}

export default AdminPage