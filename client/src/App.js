//import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from "./components/Sidebar";
	import { BrowserRouter as Router, Routes, Route}
		from 'react-router-dom';
// import LoginComponent from './Login/LoginComponent';
// import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import Home from './pages';
import Service from './pages/Service/service';
import Classes from './pages/Classes/classes';
import Pricing from './pages/Pricing/pricing';
import Contact from './pages/Contacts/contact';
import MemberHomePage from './pages/MemberHomePage/member';
import HCMember from './pages/HCMemberHomePage/hcmember';
import LoginComponent from './pages/Login/login';
import { GymEnrollment } from './pages/GymEnrollment';
import { LogHours } from './pages/LogHours';
import ActivitiesChart from './pages/ActivitiesChart';
import ClassSchedule from './pages/ClassSchedule';
function App() {
  return (
    
    <Router>
    <Navbar />
    <Sidebar />
    <Routes>
      <Route  path='/'  element={<Home />} />
      <Route path='/gymenrollment' element={<GymEnrollment/>} />
      <Route path='/loghours' element={<LogHours/>} />
      <Route path='/activitieschart' element={<ActivitiesChart/>} />
      <Route path='/classSchedule' element={<ClassSchedule/>} />
      <Route path='/service' element={<Service/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/classes' element={<Classes/>} />
      <Route path='/pricing' element={<Pricing/>} />
      <Route path='/member' element={<MemberHomePage/>} />
      <Route path='/hcmember' element={<HCMember/>} />
      <Route path='/login' element={<LoginComponent />} />
    </Routes>
    </Router>
    
  );
}

export default App;
