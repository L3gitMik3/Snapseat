import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import{BrowserRouter as Router, Routes ,Route ,Link} from 'react-router-dom'
import Signup from './components/Signup';
import Addevent_ticket from './components/Addevent_ticket';
import Getevent_ticket from './components/Getevent_ticket';
import Signin from './components/Signin';
import Mpesapayment from './components/Mpesapayment';
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='App-header'>
          <h1 className='welcome_text'>Welcome to Snapseat</h1>
        </div>
      

      <nav>
        <Link to='/login' className='btn btn-outline-warning  ms-2 link_style'>Log In</Link>
        <Link to='/signup' className='btn btn-outline-warning ms-2 link_style'>Sign Up</Link>
        <Link to='/addeventticket' className='btn btn-outline-warning ms-2 link_style'>Add Event Ticket</Link>
        <Link to='/' className='btn btn-outline-warning ms-2 link_style'>Get Event Ticket</Link>
       
      </nav>


      <Routes>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Signin/>} />
        <Route path='/addeventticket' element={<Addevent_ticket/>} />
        <Route path='/' element={<Getevent_ticket/>} />
        <Route path='/mpesapayment' element={<Mpesapayment/>}/>


      </Routes>
      <Footer/>
      </div>
    
    </Router>
  );
}

export default App;
