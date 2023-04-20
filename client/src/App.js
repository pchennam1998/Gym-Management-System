import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
	import { BrowserRouter as Router, Routes, Route}
		from 'react-router-dom';
// import LoginComponent from './Login/LoginComponent';
// import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import Home from './pages';
import Service from './pages/service';
import Clsses from './pages/clsses';
import Pricing from './pages/pricing';
import Contact from './pages/contact';

import LoginComponent from './pages/login';
function App() {
  return (
    
    <Router>
    <Navbar />
    <Routes>
      <Route  path='/'  element={<Home />} />
      <Route path='/service' element={<Service/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/clsses' element={<Clsses/>} />
      <Route path='/pricing' element={<Pricing/>} />
      <Route path="/login" element={<LoginComponent />} />
    </Routes>
    </Router>
    
  );
}

export default App;
