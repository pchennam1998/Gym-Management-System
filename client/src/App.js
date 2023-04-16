import logo from "./logo.svg";
import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import Layout from "./Layout/Layout";
//import Nav from "./Navigation/Nav";
//import Home from "./Home/Home";
//import Footer from "./Footer/Footer";
//import FlightStatus from "./FlightStatus/FlightStatus";
import LoginComponent from "./Login/LoginComponent";
//import AirportEmployeeDash from "./AirportEmployee/AirportEmployeeDash";
//import AirlineEmployeeDash from "./AirlineEmployee/AirlineEmployee";
//import Airlines from "./AirlinesAtSffo/airlinesAtSffo";
//import FlightSchedules from "./FlightSchedules/FlightSchedules";

function App() {
  const [data, setData] = React.useState(null);
  const [logged, setLogged] = React.useState(false);
  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);
  function changeLogged(value) {
    setLogged(value);
  }
  console.log(logged);
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {data}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            //element={<Layout logged={logged} changeLogged={changeLogged} />}
          >
            <Route
              path="LogIn"
              element={<LoginComponent changeLogged={changeLogged} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
