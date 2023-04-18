import logo from './logo.svg';
import './App.css';
import LoginComponent from './Login/LoginComponent';
import { BrowserRouter, Route ,Routes} from 'react-router-dom';

function App() {
  return (
    
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginComponent />}/>
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;
