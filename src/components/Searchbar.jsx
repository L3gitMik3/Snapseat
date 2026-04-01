import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// const CATEGORIES = ['All', 'Music', 'Sports', 'Arts', 'Food & Drink', 'Tech', 'Comedy', 'Other'];

const SearchBar = () => {
// //   const [query, setQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');

  // const handleSearch = (newQuery, newCategory) => {
  //   const result = events.filter((event) => {
  //     const matchName = event.name?.toLowerCase().includes(newQuery.toLowerCase());
  //     const matchCategory = newCategory === 'All' || event.category === newCategory;
  //     return matchName && matchCategory;
  //   });
  //   onFilter(result);
  // };

  // const handleQueryChange = (e) => {
  //   setQuery(e.target.value);
  //   handleSearch(e.target.value, activeCategory);
  // };

  // const handleCategoryChange = (cat) => {
  //   setActiveCategory(cat);
  //   handleSearch(query, cat);
  // };

  return (
     <div className=" mt-2 carousel-body search-section text-center">
         <div className='search-intro'>
         <h1>Find & Book Amaizing Events in Nairobi</h1>
         <h5>Discover concerts, workshops, festivals and more near you</h5><br />
       </div>
      <div className='search-container '>
         <input type="text"
          placeholder='🔍Search the event near you....' 
          className='search_input rounded-3 w-50 ' />
         <button className='search-button rounded-2 '>Search</button>
       </div>
      {/* <div className="d-flex flex-wrap gap-2 text-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`mb-16 btn btn-sm ${activeCategory === cat ? 'btn-danger' : 'btn-outline-warning'}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
        
        </div> */}
    </div>
  );
}


export default SearchBar;

 // <div className=" mt-2 carousel-body search-section text-center">
    //     <div className='search-intro'>
    //     <h1>Find & Book Amaizing Events in Nairobi</h1>
    //     <h5>Discover concerts, workshops, festivals and more near you</h5><br />
    //     </div>
    //   <div className='search-container '>
    //     <input type="text" placeholder='🔍Search the event near you....' className='search_input rounded-3 w-50 h-10' />
    //     <button className='search-button rounded-2 '>Search</button>
    //   </div>
   
    // </div>