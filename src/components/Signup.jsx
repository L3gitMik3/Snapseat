import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  // declaring state variables
  const[username,setUsername] = useState("")
  const[email,setEmail]=useState("")
  const[phone,setPhone]=useState("")
  const[password,setPassword]=useState("")

  // status message
  const[loading,setLoading] =useState("")
  const[error,setError]=useState("")
  const[success,setSuccess]=useState("")

  // Function to submit
  const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading("Please wait...");
    try {
      // Retrieving user details
      const formData = new FormData();
      formData.append("username" ,username)
      formData.append("email",email)
      formData.append("phone",phone)
      formData.append("password",password) 

      // adding base url
      const response = await axios.post("https://michaelhyrax.alwaysdata.net/api/signup",formData)
      setSuccess(response.data.success)
      
    } catch (error) {
      setError(error)
      
    }
  }
  return (
    <div className='row  justify-content-center'> 
      <div className='col-md-6 card m-2 p-4 '>
        <div className='signup_welcome'>
        <h2 className='text-center'>Welcome to Snapseat</h2>
        <h1 className='sign_up'>Register now</h1>
        <p className='text-secondary'>Get started with our 14days free trials</p>
        </div>
        {/* Binding values from form */}
        <p>{loading}</p>
        <p>{error}</p>
        <p>{success}</p>
        {/* Signup form */}
        <form onSubmit={handleSubmit} className='signup_form'>
         <fieldset >
          <label >Username</label>
          <input type="text"
           placeholder='Enter username' 
           className='form-control' 
           onChange={(e)=>setUsername(e.target.value)}
           required/>
          <label htmlFor="">Email Address</label>
          <input type="email"
           placeholder='Enter your email address'
            className='form-control' 
            onChange={(e)=>setEmail(e.target.value)}
            required />
          <label htmlFor="">Phone number</label>
          <input type="tel"
           placeholder='Enter your phone number (254xxxxxxxx)' 
           className='form-control' 
           onChange={(e)=>setPhone(e.target.value)}
           required/>
          <label htmlFor="">Password</label>
          <input type="password"
           placeholder='Enter your password' 
           className='form-control'
            onChange={(e)=>setPassword(e.target.value)} 
            required/><br />
          <input type="submit" value="Sign Up Now" className='submit_button w-100'/>

         </fieldset><br />
         {/* incase someone already has an account */}
        <h5>Already have an account? <Link to='/signin' className='m-2'> Signin</Link></h5> 
        </form>
       
      </div>
      
    </div>
  )
}

export default Signup

