import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Addevent_ticket = () => {
  // declaring state variables
  const [product_name,setProductName]=useState("")
  const[product_description,setProductDescription]=useState("")
  const[product_cost,setProductCost]=useState("")
  const [product_photo, setProductPhoto] = useState("")
  const[category, setCategory]= useState("")
  const[location, setLocation]= useState("")
  const[date, setDate]= useState("")
  // Status messages
  const[loading,setLoading]=useState("")
  const[error,setError]=useState("")
  const[success,setSuccess]=useState("")
  // function to add products database
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading("Please wait...")
    setError("")
    setSuccess("")
  
  try {
    // retrieving product details
    const formData=new FormData();
    formData.append("product_name",product_name)
    formData.append("product_description",product_description)
    formData.append("product_cost",product_cost)
    formData.append("product_photo",product_photo)
    formData.append("category",category)
    formData.append("location",location)
    formData.append("date",date)
   
    // Adding base url to post data
    const response = await axios.post("https://michaelhyrax.alwaysdata.net/api/add_product", formData)
    setLoading("")
    setSuccess(response.data.success)
    
  } catch (err) {
    setLoading("")
    setError(err.message)
    
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
          <Link to="/" className='btn btn-dark justify-content-center m-auto'>See event ticket</Link>
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
         onChange={(e)=>setProductDescription(e.target.value)}
            required>Enter the events description</textarea><br />
          
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
         placeholder='Enter the Ticket price' 
         onChange={(e)=>setProductCost(e.target.value)}/><br />
         <label htmlFor="">Ticket photo</label><br />
        <input 
        className='form-control' 
        type="file" 
        onChange={(e)=>setProductPhoto(e.target.files[0])}
         required/><br />
        <label htmlFor="">Category</label><br />
        <input 
        className='form-control' 
        type="text"
         placeholder='Enter the event category' 
         onChange={(e)=>setCategory(e.target.value)} 
         required/><br />
        <label htmlFor="">Location</label><br />
        <input 
        className='form-control' 
        type="text"
         placeholder='Location' 
         onChange={(e)=>setLocation(e.target.value)} 
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
export default Addevent_ticket
