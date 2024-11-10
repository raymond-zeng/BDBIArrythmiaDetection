import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from '../Layout';
import Home from '../Home';
import Login from '../Login/Login';
import Register from '../Login/Register';
import FileUpload from '../FileUpload/FileUpload';
import { AuthProvider } from '../../AuthProvider';
import ProtectedRoute from '../ProtectedRoute';

export default function App() {
  return(
    <AuthProvider>
      <BrowserRouter>
        <Layout />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<ProtectedRoute element={<Login />} isProtected={true} />} />
            <Route path="register" element={<ProtectedRoute element={<Register />} isProtected={true} />} />
            <Route path="upload" element={<ProtectedRoute element={<FileUpload />} isProtected={false} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
  // return(
  //   <div className="App">
  //     <FileUpload />
  //   </div>)
}

// export default App;