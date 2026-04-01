import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import{BrowserRouter as Router, Routes ,Route ,Link} from 'react-router-dom'

const Mycategory = () => {
  return (
      <div className='container text-center'>
          <h3>Explore by Category</h3>
          <div className='category'>
              <Link  className='btn btn-outline-dark ms-1 link_style'>Concerts</Link>
              <Link className='btn btn-outline-dark ms-1 link_style'>Conferences</Link>
              <Link  className='btn btn-outline-dark ms-1 link_style'>Workshops</Link>
              <Link  className='btn btn-outline-dark ms-1 link_style'>Festivals</Link>
              <Link  className='btn btn-outline-dark ms-1 link_style'>Sports</Link>
          </div>
    </div>
  )
}

export default Mycategory