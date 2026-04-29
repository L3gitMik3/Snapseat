import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AddEventTicket = () => {
  // declaring state variables
  const [product_name,setProductName]=useState("")
  const[product_description,setProductDescription]=useState("")
  const[product_cost,setProductCost]=useState("")
  const[product_photo,setProductPhoto]=useState("")
  const[category,SetCategory]=useState("")
  const[location,SetLocation]=useState("")
  const[date,setDate]=useState("")

  // Status messages
  const[loading,setLoading]=useState("")
  const[error,setError]=useState("")
  const[success,setSuccess]=useState("")

  // function to add products database
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading("Please wait...")
  
  try {
    // retrieving product details
    const formData=new FormData();
    formData.append("product_name",product_name)
    formData.append("product_description",product_description)
    formData.append("product_cost",product_cost)
    formData.append("product_photo",product_photo)
    formData.append("category",category)
    formData.append("date",date)
    formData.append("location",location)

    // Adding base url to post data
    const response = await axios.post("http://michaelhyrax.alwaysdata.net/api/add_product", formData)
    setLoading("")
    setSuccess(response.data.success)


    
  } catch (error) {
    setError(error.message)
    
  }
}
  return (
    <div className='row justify-content-center p-3'>
      <div className='card shadow col-md-6 mt-2 p-3 add_product '>
        <h1 className='add_product  text-center'>Post an Event</h1>
        {/* Binding variables */}
        <p>{loading}</p>
        <p>  {error} </p>
        <p> {success} </p>


        <nav className='text-center w-100'>
          <Link to="/" className='btn btn-dark justify-content-center m-80'>See event ticket</Link>
        </nav>
      <form action="" onSubmit={handleSubmit}
      className=' signin_form'>
        <label htmlFor="">Event name</label><br />
        <input 
        className='form-control' 
        type="text"
         placeholder='Enter the event name' 
         onChange={(e)=>setProductName(e.target.value)} 
         required/><br />
         <label htmlFor="">Event description</label><br />
        <textarea 
        className='form-control' 
        
        placeholder='Enter the Event description'
         onChange={(e)=>setProductDescription(e.target.value)}
            required> </textarea><br />
          
             <label htmlFor="">Event Date</label><br />
        <input 
        className='form-control' 
        type="date"
         placeholder='Enter the event date' 
         onChange={(e)=>setDate(e.target.value)} 
         required/><br />
         <label htmlFor="">Ticket cost in Kenyan Shillings</label><br />
        <input 
        className='form-control'
         type="number"  
         placeholder='Enter the Ticket cost' 
         onChange={(e)=>setProductCost(e.target.value)}/><br />
         <input 
        className='form-control'
         type="text"  
         placeholder='Enter the event location' 
         onChange={(e)=>SetLocation(e.target.value)}/><br />
           <input 
        className='form-control'
         type="text"  
         placeholder='Enter ticket category' 
         onChange={(e)=>SetCategory(e.target.value)}/><br />
         <label htmlFor="">Ticket photo</label><br />
        <input 
        className='form-control' 
        type="file" 
        onChange={(e)=>setProductPhoto(e.target.files[0])}
         required/><br />
        <input
         type="submit" 
        value="Add Ticket" 
       className='submit_button w-100' 
       
      />
      </form>
      </div>
    </div>
  )
}

export default AddEventTicket
