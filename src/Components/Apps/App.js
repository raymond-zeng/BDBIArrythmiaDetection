import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../Layout';
import Home from '../Home';
import Login from '../Login/Login';
import Register from '../Login/Register';
import FileUpload from '../FileUpload/FileUpload';

function App() {
  // return(
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path = "/" element = {<Layout/>} >
  //         <Route index element = {<Home/>} />
  //         <Route path = "upload" element = {<FileUpload/>} />
  //         <Route path = "login" element = {<Login/>} />
  //         <Route path = "register" element = {<Register/>} />
  //       </Route>
  //     </Routes>
  //   </BrowserRouter>
  // )
  return(
    <div className="App">
      <FileUpload />
    </div>)
}

export default App;