import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from '../Layout';
import Home from '../Home';
import Login from '../Login/Login';
import Register from '../Login/Register';
import FileUpload from '../FileUpload/FileUpload';

export default function App() {
  return(
    <BrowserRouter>
      <nav>
        <Link to = "/">Home</Link>
        <Link to = "/upload">Upload</Link>
        <Link to = "/login">Login</Link>
        <Link to = "/register">Register</Link>
      </nav>
      <Routes>
        {/* <Route path = "/" element = {<Layout/>} > */}
          <Route index element = {<Home/>} />
          <Route path = "upload" element = {<FileUpload/>} />
          <Route path = "login" element = {<Login/>} />
          <Route path = "register" element = {<Register/>} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  )
  // return(
  //   <div className="App">
  //     <FileUpload />
  //   </div>)
}

// export default App;