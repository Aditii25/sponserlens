// import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import SingleProfile from "./pages/SingleProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/user" element={<SingleProfile />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
