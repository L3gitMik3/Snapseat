import React, { useState } from 'react'

import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Mpesapayment = () => {
  // declaring state variables
  const{product} = useLocation().state || {};
  const[phone,setPhone] = useState("")
  const[message,setMessage] = useState("")
  const[error,setError] = useState("")

  //image url
  const img_url = "https://michaelhyrax.alwaysdata.net/static/images/"

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setMessage("Please wait as we process the transaction")

    try {
      // Retieving payment details
      const formData= new FormData()
      formData.append("phone",phone)
      formData.append("amount",product.product_cost)

      // Adding base url
      const response = await axios.post("https://michaelhyrax.alwaysdata.net/api/mpesa_payment",formData)
      console.log(response.data)
      
    } catch (error) {
      setError(error.message)
      
    }
  }

  return (
    <div className='row justify-content-center md-4'>
      <h1 className='text-center' >LIPA NA MPESA</h1><hr />
      <div className='  mb-4 card shadow card-margin text-center col-md-6 bg-light'>
      <img  className='mt-2 product_image' src={img_url + product.product_photo } alt={product.product_photo} />
      <p>Product Name : {product.product_name} </p>
      <p className='text-warning'>Product Cost : {product.product_cost}</p>

      {phone}
      {message}
      {error}

      {/* Phone input */}
      <form action="" className='' onSubmit={handleSubmit}>
        <u> <label htmlFor="" className='text-success '>Phone number</label></u>
        <input type="tel"
        placeholder='Enter your phone number'
        className="form-control" 
        onChange={(e)=>setPhone(e.target.value)}/><br/>

       

        <button className='btn btn-success p-1 mb-3'>
          Make payment
        </button>
        
      </form>
      </div>
      
    </div>
  )
}

export default Mpesapayment 
