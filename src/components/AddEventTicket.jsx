import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AddEventTicket = () => {
  // Form state
  const [formData, setFormData] = useState({
    product_name: "",
    product_description: "",
    product_cost: "",
    product_photo: null,
    category: "",
    location: "",
    date: ""
  })

  // Status state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Reset messages after 5 seconds
  const clearMessages = () => {
    const timer = setTimeout(() => {
      setError("")
      setSuccess("")
    }, 5000)
    return () => clearTimeout(timer)
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }))
  }

  // Validate form
  const validateForm = () => {
    if (!formData.product_name.trim()) {
      setError("Event name is required")
      return false
    }
    if (!formData.product_description.trim()) {
      setError("Event description is required")
      return false
    }
    if (!formData.date) {
      setError("Event date is required")
      return false
    }
    if (formData.product_cost && isNaN(formData.product_cost)) {
      setError("Ticket cost must be a valid number")
      return false
    }
    if (!formData.location.trim()) {
      setError("Event location is required")
      return false
    }
    if (!formData.category.trim()) {
      setError("Ticket category is required")
      return false
    }
    if (!formData.product_photo) {
      setError("Ticket photo is required")
      return false
    }
    // Optional: validate file size (max 5MB)
    if (formData.product_photo.size > 5 * 1024 * 1024) {
      setError("Photo size must be less than 5MB")
      return false
    }
    return true
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateForm()) return

    setLoading(true)

    try {
      const formDataToSend = new FormData()
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key])
      })

      const API_URL = process.env.REACT_APP_API_URL || "http://michaelhyrax.alwaysdata.net/api"
      const response = await axios.post(`${API_URL}/add_product`, formDataToSend, {
        timeout: 10000,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setSuccess(response.data.success || "Event posted successfully!")
      
      // Reset form
      setFormData({
        product_name: "",
        product_description: "",
        product_cost: "",
        product_photo: null,
        category: "",
        location: "",
        date: ""
      })
      
      clearMessages()
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to post event"
      setError(errorMessage)
      clearMessages()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='row justify-content-center p-3'>
      <div className='card shadow col-md-6 mt-2 p-3 add_product'>
        <h1 className='add_product text-center'>Post an Event</h1>
        
        {/* Status Messages */}
        {loading && <p className='alert alert-info'>{loading ? "Please wait..." : ""}</p>}
        {error && <p className='alert alert-danger'>{error}</p>}
        {success && <p className='alert alert-success'>{success}</p>}

        <nav className='text-center w-100'>
          <Link to="/" className='btn btn-dark m-80'>See event tickets</Link>
        </nav>

        <form onSubmit={handleSubmit} className='signin_form'>
          <div className='form-group'>
            <label htmlFor="eventName">Event name</label>
            <input 
              id="eventName"
              name="product_name"
              className='form-control' 
              type="text"
              placeholder='Enter the event name' 
              value={formData.product_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor="eventDescription">Event description</label>
            <textarea 
              id="eventDescription"
              name="product_description"
              className='form-control' 
              placeholder='Enter the Event description'
              value={formData.product_description}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor="eventDate">Event Date</label>
            <input 
              id="eventDate"
              name="date"
              className='form-control' 
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor="ticketCost">Ticket cost in Kenyan Shillings</label>
            <input 
              id="ticketCost"
              name="product_cost"
              className='form-control'
              type="number"
              placeholder='Enter the Ticket cost'
              value={formData.product_cost}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor="eventLocation">Event location</label>
            <input 
              id="eventLocation"
              name="location"
              className='form-control'
              type="text"
              placeholder='Enter the event location'
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor="ticketCategory">Ticket category</label>
            <input 
              id="ticketCategory"
              name="category"
              className='form-control'
              type="text"
              placeholder='Enter ticket category'
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor="ticketPhoto">Ticket photo</label>
            <input 
              id="ticketPhoto"
              name="product_photo"
              className='form-control' 
              type="file"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit" 
            className='submit_button w-100'
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Ticket"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddEventTicket
