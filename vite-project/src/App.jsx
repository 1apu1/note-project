import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddNote from "./components/AddNote";
import Mynotes from "./components/Mynotes";
import ReCycleBin from "./components/ReCycleBin";
import Rsidebar from "./components/Sidebar";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import 'bootstrap/dist/css/bootstrap.min.css';
const themes = {
  default: {
    background: 'white',
    color: 'black'
  },
  lightPink: {
    background: 'pink',
    color: 'black'
  },
  dark: { 
    background: 'black',
    color: 'white'
  }
};

function App() {
  const [theme, setTheme] = useState('default');

  const setLightTheme = () => {
    setTheme('lightPink');
  };

  const setDarkTheme = () => {
    setTheme('dark');
  };

  return (
        <div className="container-fluid p-0" style={{ backgroundColor: themes[theme].background, color: themes[theme].color }}>
      <div className="row p-0">
        <div className="col-2 p-0">
          <Rsidebar />
          <QRCode
            className="qr"
            bgColor="transparent"
            value="http://192.168.99.91:5173/"
            level="L"
            size={60}
            id={"apujain178@gmail.com"}
          />

        </div>

        <div className="col-10 p-0">
          <div className="theme-toggle-buttons text-center">
            <button className="theme-btn m-2" onClick={setLightTheme}>
              Light Theme 
            </button>
            <button className="theme-btn" onClick={setDarkTheme}>
              Dark Theme
            </button>
          </div>

          <Routes>
            <Route path="/addnotes" element={<AddNote />} />
            <Route path="/" element={<Mynotes />} />
            <Route path="/recyclebin" element={<ReCycleBin />} />
          </Routes>
        </div>
      </div>
    </div>


  );
}

export default App;
