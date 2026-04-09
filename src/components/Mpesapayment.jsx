import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Mpesapayment = () => {
  // declaring state variables
  const { product } = useLocation().state || {};
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const navigate = useNavigate();

  //image url
  const img_url = "https://michaelhyrax.alwaysdata.net/static/images/";

  // If no product is found, redirect back
  if (!product) {
    navigate('/');
    return null;
  }

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    let cleaned = value.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '254' + cleaned.substring(1);
    } else if (!cleaned.startsWith('254') && cleaned.length > 0) {
      cleaned = '254' + cleaned;
    }
    return cleaned;
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    if (value.length <= 9) {
      setPhone(value);
    } else {
      setPhone(value.substring(0, 12));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanPhone = formatPhoneNumber(phone);
    if (cleanPhone.length < 10 || cleanPhone.length > 12) {
      setError("Please enter a valid phone number (e.g., 0712345678)");
      return;
    }
    
    setMessage("");
    setError("");
    setIsProcessing(true);
    setMessage("Please wait as we process the transaction...");

    try {
      const formData = new FormData();
      formData.append("phone", cleanPhone);
      formData.append("amount", product.product_cost);
      formData.append("product_name", product.product_name);

      const response = await axios.post("https://michaelhyrax.alwaysdata.net/api/mpesa_payment", formData);
      console.log(response.data);
      
      if (response.data.success || response.data.ResponseCode === "0") {
        setMessage("✅ Payment initiated successfully! Check your phone for the STK push prompt.");
        setTimeout(() => {
          navigate('/payment-success', { state: { product, transaction: response.data } });
        }, 3000);
      } else {
        setError(response.data.errorMessage || "Payment failed. Please try again.");
      }
      
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Network error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getCategoryEmoji = () => {
    const name = product.product_name.toLowerCase();
    if (name.includes("music") || name.includes("concert")) return "🎵";
    if (name.includes("sport")) return "⚽";
    if (name.includes("art")) return "🎨";
    if (name.includes("food")) return "🍽️";
    if (name.includes("tech")) return "💻";
    if (name.includes("comedy")) return "😂";
    return "🎪";
  };

  return (
    <div className="mpesa-wrapper bg-light">
      <div className="container py-5">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-outline-warning mb-4 rounded-pill px-4"
        >
          ← Back to Events
        </button>

        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-dark mb-3">
            Complete Your Purchase
          </h1>
          <p className="text-muted">Secure payment via M-PESA</p>
        </div>

        <div className="row g-4">
          {/* Event Details Column */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm h-100">
              <div className="position-relative">
                <img 
                  src={img_url + product.product_photo} 
                  className="card-img-top" 
                  alt={product.product_name}
                  style={{ height: '300px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="bg-warning bg-gradient d-flex align-items-center justify-content-center" 
                           style="height: 300px;">
                        <span class="display-1">${getCategoryEmoji()}</span>
                      </div>
                    `;
                  }}
                />
                <span className="position-absolute top-0 end-0 m-3 badge bg-warning rounded-pill px-3 py-2">
                  {getCategoryEmoji()} Premium Event
                </span>
              </div>
              
              <div className="card-body p-4">
                <h2 className="card-title h3 mb-3">{product.product_name}</h2>
                
                <div className="mb-4">
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-2">📅</span>
                    <span className="text-muted">Date: TBD (Check email)</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-2">📍</span>
                    <span className="text-muted">Location: Nairobi, Kenya</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="me-2">🎟️</span>
                    <span className="text-muted">Ticket Type: Regular Access</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="fw-semibold mb-2">About this event</h5>
                  <p className={showFullDescription ? "text-muted" : "text-muted text-truncate"}>
                    {product.product_description}
                  </p>
                  {product.product_description.length > 100 && (
                    <button 
                      className="btn btn-link text-warning p-0"
                      onClick={() => setShowFullDescription(!showFullDescription)}
                    >
                      {showFullDescription ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>

                <div>
                  <h5 className="fw-semibold mb-3">What's included:</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">✓ Entry to the event</li>
                    <li className="mb-2">✓ Digital ticket delivery</li>
                    <li className="mb-2">✓ Priority support</li>
                    <li className="mb-2">✓ Free cancellation (48hrs notice)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Column */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm sticky-top" style={{ top: '2rem' }}>
              <div className="card-body p-4">
                <h3 className="card-title h4 mb-4">Payment Summary</h3>
                
                <div className="border-bottom pb-3 mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Ticket Price:</span>
                    <span className="fw-semibold">KSh {product.product_cost}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Processing Fee:</span>
                    <span className="fw-semibold">KSh 0</span>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between mb-4 pb-2 border-bottom">
                  <span className="fw-bold">Total Amount:</span>
                  <span className="fw-bold text-warning fs-4">KSh {product.product_cost}</span>
                </div>

                <div className="bg-light rounded p-3 mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <span className="fs-4 me-2">💳</span>
                    <span className="fw-semibold">M-PESA Express</span>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">M-PESA Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text bg-white">+254</span>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="712345678"
                          value={phone}
                          onChange={handlePhoneChange}
                          required
                          disabled={isProcessing}
                        />
                      </div>
                      <small className="text-muted">
                        Enter the M-PESA registered phone number
                      </small>
                    </div>

                    {message && (
                      <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {message}
                      </div>
                    )}

                    {error && (
                      <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <span className="me-2">⚠️</span>
                        {error}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      className="btn btn-warning w-100 py-2 fw-semibold"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          💳 Pay KSh {product.product_cost} with M-PESA
                        </>
                      )}
                    </button>

                    <p className="text-center text-muted small mt-3 mb-0">
                      🔒 Secure payment powered by M-PESA API
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mpesapayment;

// import React, { useState } from 'react'
// import image from '../logo.svg'
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';

// const Mpesapayment = () => {
//   // declaring state variables
//   const{product} = useLocation().state || {};
//   const[phone,setPhone] = useState("")
//   const[message,setMessage] = useState("")
//   const[error,setError] = useState("")

//   //image url
//   const img_url = "https://michaelhyrax.alwaysdata.net/static/images/"

//   const handleSubmit=async(e)=>{
//     e.preventDefault();
//     setMessage("Please wait as we process the transaction")

//     try {
//       // Retieving payment details
//       const formData= new FormData()
//       formData.append("phone",phone)
//       formData.append("amount",product.product_cost)

//       // Adding base url
//       const response = await axios.post("https://michaelhyrax.alwaysdata.net/api/mpesa_payment",formData)
//       console.log(response.data)
      
//     } catch (error) {
//       setError(error.message)
      
//     }
//   }

//   return (
//     <div className='row justify-content-center md-4'>
//       <h1 className='text-center' >LIPA NA MPESA</h1><hr />
//       <div className='  mb-4 card shadow card-margin text-center col-md-6 bg-light'>
//       <img  className='mt-2 product_image' src={img_url + product.product_photo } alt={product.product_photo} />
//       <p>Product Name : {product.product_name} </p>
//       <p className='text-warning'>Product Cost : {product.product_cost}</p>

//       {phone}
//       {message}
//       {error}

//       {/* Phone input */}
//       <form action="" className='' onSubmit={handleSubmit}>
//         <u> <label htmlFor="" className='text-success '>Phone number</label></u>
//         <input type="tel"
//         placeholder='Enter your phone number'
//         className="form-control" 
//         onChange={(e)=>setPhone(e.target.value)}/><br/>

       

//         <button className='btn btn-success p-1 mb-3'>
//           Make payment
//         </button>
        
//       </form>
//       </div>
      
//     </div>
//   )
// }

// export default Mpesapayment 
