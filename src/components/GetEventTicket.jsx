import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import SearchBar from './Searchbar';
const GetEventTicket = () => {
  // declaring state variables
  const[products,setProducts]=useState([]);
  const[loading,setLoading]=useState("");
  const[error,setError]=useState("");

  // image url
  const img_url = "https://michaelhyrax.alwaysdata.net/static/images/"

  // navigation
  const navigate=useNavigate()

  // function to call products
  const getProducts=async()=>{
    setLoading("Please wait as we retrieve products")

    try {
      const response = await axios.get("https://michaelhyrax.alwaysdata.net/api/get_product_details")
      setProducts(response.data)
      setLoading("")
      
    } catch (error) {
      setError(error.message)
      
    }

  }


  // useEffect to retieve products automatically
  useEffect(()=>{
  getProducts()
  },[]);
  return (
    <div className='row'>
   
      <SearchBar />


     
      
       {loading}
      <p> {error} </p>

      {/* Designing the products card */}

       {products.map((product)=>(
      <div className='col-md-3 justify-content-center mb-4'
      key={product.product_id }>
        <div className='card shadow card-margin text-center'>
          <img className='mt-2 product_img' src={img_url + product.product_photo} alt={product.product_photo}/>

          {/* the product details */}
          <div className='card-body'>
            <h5 className='mt-2'>{product.product_name}</h5>
            <p className='text-muted'>{product.product_description}</p>
            <b className='text-warning'>Ksh.{product.product_cost}</b><br />
            <button onClick={()=>navigate("/makepayment", {state:{product}})} className='btn btn-dark mt-2 w-100'>Purchase now</button>
          </div>
        </div>
      </div>
      ))}
      
    </div>
  )
}

export default GetEventTicket
