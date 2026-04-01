import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// Declaring state variables
const Signin = () => {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")

// Status message

const[loading,setLoading]=useState("")
const[success,setSuccess]=useState("")
const[error,setError]=useState("")

// navigation
const navigate=useNavigate()

// submit function
const handleSignin=async(e)=> {
  e.preventDefault()
  setLoading("Please wait...")

  try {
    // Retrieving user data
    const formData=new FormData();

    formData.append("email", email)
    formData.append("password", password)

    // Adding base url
    const response = await axios.post("https://michaelhyrax.alwaysdata.net/api/signin",formData);
    if(response.data.user){
      setSuccess(response.data.success)
      setLoading("")
      localStorage.setItem("user",JSON.stringify(response.data.user))
      // navigation on successfull sign in
      navigate("/")
      
    }
    
  } catch (error) {
    setError(error)
    
  }

  
}

  return (
    <div className='row justify-content-center p-3 '>
      <div className='card shadow col-md-6 mt-2 p-3 ' >
        <h1 className='text-center'>Log in</h1>
     ``
        {loading}<br/>
        {error}<br/>
        {success}
        

        <form action="" className=' signin_form' onSubmit={handleSignin}>
      
            <label htmlFor="">Email Address</label><br />
            <input type="text" 
            className='form-control' 
            placeholder='Enter your Email'
             onChange={(e)=>setEmail(e.target.value)}
             required/><br />
            <label htmlFor="">Password</label><br />
            <input type="password" 
            className='form-control' 
            placeholder='Enter your password' 
            onChange={(e)=>setPassword(e.target.value)}
            required /><br />
            <input type="submit" value="Log in" className='submit_button w-100'/><br />

            <h5>Don't have an account? <Link to="/signup">Sign up</Link></h5>


     
        </form>
      </div>
      
    </div>
  )
}

export default Signin

