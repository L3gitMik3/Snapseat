import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


const Mycarousel = () => {
  return (
    <div className=" mt-2 carousel-body search-section text-center">
        <div className='search-intro'>
        <h1>Find & Book Amaizing Events in Nairobi</h1>
        <h5>Discover concerts, workshops, festivals and more near you</h5><br />
        </div>
      <div className='search-container '>
        <input type="text" placeholder='Search the event near you....' className='search_input rounded-3 w-50 h-10' />
        <button className='search-button rounded-2 '>Search</button>
      </div>
      {/* <div className="row ">
        <div className="col-md-10 mx-auto">
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
       
        {/* Indicators */}
        {/*<div className="carousel-indicators">
          <button type="button" data-bs-target="#carousel`Example" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
        </div>

        {/* Slides */}
       {/*  <div className="carousel-inner">

          <div className="carousel-item active">
            <img
              src="images/offices1.jpg"
              className="d-block w-100"
              alt="First slide"
              height="450px"
            />
            <div className="carousel-caption d-none d-md-block bg-dark opacity-50">
              <h5>Discover Events Effortlessly</h5>
              <p>
Explore concerts, festivals, sports, and more with SnapSeat. Our platform makes it easy to find, compare, and book tickets in seconds, so you can focus on enjoying unforgettable live experiences without the hassle.
</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="images/offices2.jpg"
              className="d-block w-100"
              alt="Second slide"
              height="450px"
            />
            <div className="carousel-caption d-none d-md-block bg-dark opacity-50">
              <h5>Discover Events Effortlessly</h5>

              <p>
Explore concerts, festivals, sports, and more with SnapSeat. Our platform makes it easy to find, compare, and book tickets in seconds, so you can focus on enjoying unforgettable live experiences without the hassle.

              </p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="images/penthouse.jpg"
              className="d-block w-100"
              alt="Third slide"
              height="450px"
            />
            <div className="carousel-caption d-none d-md-block bg-dark opacity-50">
              <h5>Discover Events Effortlessly</h5>

              <p>
Explore concerts, festivals, sports, and more with SnapSeat. Our platform makes it easy to find, compare, and book tickets in seconds, so you can focus on enjoying unforgettable live experiences without the hassle.

              </p>
            </div>
          </div>

        </div>
        <br />
        <br />

        {/* Controls */}
         {/*<button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>

      </div>
        </div> 
      </div>*/}
    </div>
  )
}

export default Mycarousel
