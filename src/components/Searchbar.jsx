// SearchSection.jsx
import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ─── Category list ────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Music", "Sports", "Arts", "Food & Drink", "Tech", "Comedy", "Other"];

// ─── Category emoji map ───────────────────────────────────────────────────────
const CAT_EMOJI = {
  Music: "🎵",
  Sports: "⚽",
  Arts: "🎨",
  "Food & Drink": "🍽️",
  Tech: "💻",
  Comedy: "😂",
  Other: "🎪",
};

export default function SearchSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();
  const img_url = "https://michaelhyrax.alwaysdata.net/static/images/";

  // Fetch products from your database
  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://michaelhyrax.alwaysdata.net/api/get_product_details");
      setProducts(response.data);
      setError("");
    } catch (error) {
      setError(error.message);
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch products when component mounts
  useEffect(() => {
    getProducts();
  }, []);

  // Helper function to determine category from product name/description
  // You can modify this logic based on your actual product categorization
  const getProductCategory = (product) => {
    const name = product.category.toLowerCase();
    const desc = product.product_description.toLowerCase();
    
    if (name.includes("music") || desc.includes("concert") || desc.includes("jazz")) return "Music";
    if (name.includes("sport") || desc.includes("football") || desc.includes("marathon")) return "Sports";
    if (name.includes("art") || desc.includes("exhibition") || desc.includes("gallery")) return "Arts";
    if (name.includes("food") || desc.includes("restaurant") || desc.includes("festival")) return "Food & Drink";
    if (name.includes("tech") || desc.includes("coding") || desc.includes("startup")) return "Tech";
    if (name.includes("comedy") || desc.includes("stand-up")) return "Comedy";
    return "Other";
  };

  // Live-filter whenever searchTerm or activeCategory changes
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productCategory = getProductCategory(product);
      const matchesCategory = activeCategory === "All" || productCategory === activeCategory;
      const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.product_description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, activeCategory]);

  // Trigger search on button click
  const handleSearch = () => setSearchTerm(inputValue);

  // Trigger search on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // Update input value; clear search if input is emptied
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") setSearchTerm("");
  };

  // Handle purchase navigation
  const handlePurchase = (product) => {
    navigate("/makepayment", { state: { product } });
  };

  if (loading) {
    return (
      <section className="ss-wrap">
        <div className="container text-center">
          <div className="ss-loading">
            <div className="ss-loading-spinner"></div>
            <p>Loading amazing events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="ss-wrap">
        <div className="container text-center">
          <div className="ss-error">
            <div className="ss-error-icon">⚠️</div>
            <h3>Unable to load events</h3>
            <p>{error}</p>
            <button onClick={getProducts} className="ss-retry-btn">Try Again</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ss-wrap">
      <div className="container">
        {/* ── Hero text ── */}
        <div className="text-center mb-4">
          <h1 className="ss-title">
            Find &amp; Book <span>Amazing Events</span><br />in Nairobi
          </h1>
          <p className="ss-subtitle">
            Discover concerts, workshops, festivals and more near you
          </p>
        </div>

        {/* ── Search bar ── */}
        <div className="ss-input-wrap mb-4">
          <span className="ss-search-icon">🔍</span>
          <input
            type="text"
            className="ss-input"
            placeholder="Search events near you..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button className="ss-search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* ── Category pills ── */}
        <div className="ss-pills mb-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`ss-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {CAT_EMOJI[cat] ? `${CAT_EMOJI[cat]} ` : ""}{cat}
            </button>
          ))}
        </div>

        {/* ── Results count ── */}
        <p className="ss-count mb-3">
          Showing <strong>{filteredProducts.length}</strong> of {products.length} events
          {activeCategory !== "All" && <> in <strong>{activeCategory}</strong></>}
          {searchTerm && <> matching "<strong>{searchTerm}</strong>"</>}
        </p>

        {/* ── Event cards grid ── */}
        {filteredProducts.length > 0 ? (
          <div className="row g-3">
            {filteredProducts.map((product) => {
              const category = getProductCategory(product);
              return (
                <div key={product.product_id} className="col-6 col-md-4 col-lg-3">
                  <div className="ss-card">
                    {/* Product image from your database */}
                    <div className="ss-card-img">
                      {product.product_photo ? (
                        <img 
                          src={img_url + product.product_photo} 
                          alt={product.product_name}
                          className="ss-product-image"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = CAT_EMOJI[category] || "🎪";
                          }}
                        />
                      ) : (
                        <div className="ss-emoji-placeholder">
                          {CAT_EMOJI[category] || "🎪"}
                        </div>
                      )}
                    </div>
                    <div className="ss-card-body">
                      <p className="ss-card-cat">{category}</p>
                      <h6 className="ss-card-title">{product.product_name}</h6>
                      <p className="ss-card-desc">{product.product_description.substring(0, 60)}...</p>
                      <div className="ss-card-meta">
                        <span>🎟️ <strong>Ksh {product.product_cost}</strong></span>
                      </div>
                      <button 
                        onClick={() => handlePurchase(product)} 
                        className="ss-purchase-btn"
                      >
                        Book Now →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="ss-empty">
            <div className="ss-empty-icon">🔎</div>
            <p>No events found. Try a different search or category.</p>
          </div>
        )}
      </div>

      <style>{`
        .ss-product-image {
          width: 100%;
          height: 160px;
          object-fit: cover;
        }
        .ss-emoji-placeholder {
          font-size: 3rem;
          padding: 2rem 0;
        }
        .ss-card-desc {
          font-size: 0.75rem;
          color: #6c7e91;
          margin: 0.5rem 0;
          line-height: 1.3;
        }
        .ss-purchase-btn {
          width: 100%;
          margin-top: 0.75rem;
          padding: 0.5rem;
          background: linear-gradient(135deg, #1f2937, #2d3a4a);
          color: white;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .ss-purchase-btn:hover {
          background: linear-gradient(135deg, #db5a2c, #f5a042);
          transform: translateY(-2px);
        }
        .ss-loading, .ss-error {
          padding: 4rem 2rem;
          text-align: center;
        }
        .ss-loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f0f2f5;
          border-top-color: #db5a2c;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .ss-retry-btn {
          margin-top: 1rem;
          padding: 0.5rem 1.5rem;
          background: #1f2937;
          color: white;
          border: none;
          border-radius: 40px;
          cursor: pointer;
        }
        .ss-error-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
      `}</style>
    </section>
  );
}
// import { useState, useMemo } from "react";


// // ─── Category list ────────────────────────────────────────────────────────────
// const CATEGORIES = ["All", "Music", "Sports", "Arts", "Food & Drink", "Tech", "Comedy", "Other"];

// // ─── Category emoji map ───────────────────────────────────────────────────────
// const CAT_EMOJI = {
//   Music: "🎵",
//   Sports: "⚽",
//   Arts: "🎨",
//   "Food & Drink": "🍽️",
//   Tech: "💻",
//   Comedy: "😂",
//   Other: "🎪",
// };

// // ─── Sample events (replace with your real data / props) ─────────────────────
// const SAMPLE_EVENTS = [
//   { id: 1,  name: "Nairobi Jazz Night",    category: "Music",        date: "Apr 12", location: "Alchemist Bar",      price: "KSh 500"   },
//   { id: 2,  name: "Ligi Kuu Finals",       category: "Sports",       date: "Apr 15", location: "Kasarani Stadium",   price: "KSh 300"   },
//   { id: 3,  name: "Street Art Festival",   category: "Arts",         date: "Apr 18", location: "Westlands",          price: "Free"      },
//   { id: 4,  name: "Nairobi Food Festival", category: "Food & Drink", date: "Apr 20", location: "Uhuru Gardens",      price: "KSh 200"   },
//   { id: 5,  name: "AfriTech Summit 2026",  category: "Tech",         date: "Apr 22", location: "KICC",               price: "KSh 1,500" },
//   { id: 6,  name: "Churchill Live Show",   category: "Comedy",       date: "Apr 25", location: "Ngong Racecourse",   price: "KSh 1,000" },
//   { id: 7,  name: "Blankets & Wine",       category: "Music",        date: "Apr 27", location: "Ngong Racecourse",   price: "KSh 2,000" },
//   { id: 8,  name: "Marathon Nairobi",      category: "Sports",       date: "May 1",  location: "CBD",                price: "KSh 400"   },
//   { id: 9,  name: "Open Mic Poetry",       category: "Arts",         date: "May 3",  location: "GoDown Arts Centre", price: "Free"      },
//   { id: 10, name: "Cerveza Beer Fest",     category: "Food & Drink", date: "May 5",  location: "Waterfront Karen",   price: "KSh 600"   },
//   { id: 11, name: "Startup Grind Nairobi", category: "Tech",         date: "May 8",  location: "iHub",               price: "Free"      },
//   { id: 12, name: "Comedy Store Kenya",    category: "Comedy",       date: "May 10", location: "The Carnivore",      price: "KSh 800"   },
// ];

// // ─── Main Component ───────────────────────────────────────────────────────────
// /**
//  * SearchSection
//  *
//  * Props:
//  *  - events (array) — your event objects from the backend.
//  *                     Falls back to sample data if not provided.
//  *  Each event object should have:
//  *    { id, name, category, date, location, price }
//  */
// export default function SearchSection({ events = SAMPLE_EVENTS }) {
//   const [searchTerm, setSearchTerm]         = useState("");
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [inputValue, setInputValue]         = useState("");

//   // Live-filter whenever searchTerm or activeCategory changes
//   const filteredEvents = useMemo(() => {
//     return events.filter((event) => {
//       const matchesCategory =
//         activeCategory === "All" || event.category === activeCategory;
//       const matchesSearch =
//         event.name.toLowerCase().includes(searchTerm.toLowerCase());
//       return matchesCategory && matchesSearch;
//     });
//   }, [events, searchTerm, activeCategory]);

//   // Trigger search on button click
//   const handleSearch = () => setSearchTerm(inputValue);

//   // Trigger search on Enter key
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") handleSearch();
//   };

//   // Update input value; clear search if input is emptied
//   const handleInputChange = (e) => {
//     setInputValue(e.target.value);
//     if (e.target.value === "") setSearchTerm("");
//   };

//   return (
//     <section className="ss-wrap">
//       <div className="container">

//         {/* ── Hero text ── */}
//         <div className="text-center mb-4">
//           <h1 className="ss-title">
//             Find &amp; Book <span>Amazing Events</span><br />in Nairobi
//           </h1>
//           <p className="ss-subtitle">
//             Discover concerts, workshops, festivals and more near you
//           </p>
//         </div>

//         {/* ── Search bar ── */}
//         <div className="ss-input-wrap mb-4">
//           <span className="ss-search-icon">🔍</span>
//           <input
//             type="text"
//             className="ss-input"
//             placeholder="Search events near you..."
//             value={inputValue}
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//           />
//           <button className="ss-search-btn" onClick={handleSearch}>
//             Search
//           </button>
//         </div>

//         {/* ── Category pills ── */}
//         <div className="ss-pills mb-3">
//           {CATEGORIES.map((cat) => (
//             <button
//               key={cat}
//               className={`ss-pill ${activeCategory === cat ? "active" : ""}`}
//               onClick={() => setActiveCategory(cat)}
//             >
//               {CAT_EMOJI[cat] ? `${CAT_EMOJI[cat]} ` : ""}{cat}
//             </button>
//           ))}
//         </div>

//         {/* ── Results count ── */}
//         <p className="ss-count mb-3">
//           Showing <strong>{filteredEvents.length}</strong> of {events.length} events
//           {activeCategory !== "All" && <> in <strong>{activeCategory}</strong></>}
//           {searchTerm && <> matching "<strong>{searchTerm}</strong>"</>}
//         </p>

//         {/* ── Event cards grid ── */}
//         {filteredEvents.length > 0 ? (
//           <div className="row g-3">
//             {filteredEvents.map((event) => (
//               <div key={event.id} className="col-6 col-md-4 col-lg-3">
//                 <div className="ss-card">
//                   {/* Emoji placeholder — swap with <img src={event.image} /> if you have images */}
//                   <div className="ss-card-img">
//                     {CAT_EMOJI[event.category] || "🎪"}
//                   </div>
//                   <div className="ss-card-body">
//                     <p className="ss-card-cat">{event.category}</p>
//                     <h6 className="ss-card-title">{event.name}</h6>
//                     <div className="ss-card-meta">
//                       <span>📅 {event.date}</span>
//                       <span>📍 {event.location}</span><br />
//                       <span>🎟️ {event.price}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="ss-empty">
//             <div className="ss-empty-icon">🔎</div>
//             <p>No events found. Try a different search or category.</p>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }
//  // <div className=" mt-2 carousel-body search-section text-center">
//     //     <div className='search-intro'>
//     //     <h1>Find & Book Amaizing Events in Nairobi</h1>
//     //     <h5>Discover concerts, workshops, festivals and more near you</h5><br />
//     //     </div>
//     //   <div className='search-container '>
//     //     <input type="text" placeholder='Search the event near you....' className='search_input rounded-3 w-50 h-10' />
//     //     <button className='search-button rounded-2 '>Search</button>
//     //   </div>
   
//     // </div>
