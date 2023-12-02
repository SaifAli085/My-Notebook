import "./App.css";
import MyNotes from "./components/MyNotes";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import StateNote from "./context/notes/StateNote";
import { BrowserRouter as Main, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";

function App() {
 
  const [alert, setAlert] = useState('');     
  const showAlert = (type, message) =>{
    setAlert({
      type: type,
      msg: message
    })
    setTimeout(() => {
      setAlert('')
    }, 1500);

  }
  return (
    <div className="App">
      <StateNote>
        <Main>   
          <Navbar />
          <Alert alert={alert}/>
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert}/>} />
            <Route path="/mynotes" element={<MyNotes showAlert={showAlert}/>} />
            <Route path="/login" element={<Login showAlert={showAlert}/>} />
            <Route path="/signup" element={<Signup showAlert={showAlert}/>} />  
          </Routes>
        </Main>
      </StateNote>
      </div>
   
  );
}

export default App;
