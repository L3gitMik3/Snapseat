
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import{BrowserRouter as Router, Routes ,Route } from 'react-router-dom'
import Signup from './components/Signup';
import Addevent_ticket from './components/AddeventTicket';
import Getevent_ticket from './components/GeteventTicket';
import Signin from './components/Signin';
import Mpesapayment from './components/Mpesapayment';
import Footer from './components/Footer'
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className='App'>
       <Navbar/>

        {/* <nav className='App-header'>
            <h3 className='snapseat_logo'>Snapseat</h3>
            <Link to='/' className='btn btn-outline-dark ms-1 link_style'>Explore events</Link>
            <Link to='/addeventticket' className='btn btn-outline-dark ms-1 link_style'>Create Event</Link>
            <Link to='/login' className='btn btn-outline-dark  ms-1 link_style'>LogIn</Link>
            <Link to='/signup' className='btn btn-outline-dark ms-1 link_style'>Register</Link>
            
            
       
      </nav>
 */}

      <Routes>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Signin/>} />
        <Route path='/addeventticket' element={<Addevent_ticket/>} />
        <Route path='/' element={<Getevent_ticket/>} />
        <Route path='/makepayment' element={<Mpesapayment/>}/>


      </Routes>
      <Footer/>
      </div>
    
    </Router>
  );
}

export default App;
