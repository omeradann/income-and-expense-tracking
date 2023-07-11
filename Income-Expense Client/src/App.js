import "./App.css";
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Headers from './components/Navbar/index';
import ProtectedRoute from './pages/ProtectedRoute';

import Signup from './pages/Auth/Signup/index';
import Signin from './pages/Auth/Signin/index';
import Income from './pages/Auth/Income/Income';
import Expense from './pages/Auth/Expense/Expense';
import Profile from './pages/Auth/Profile/Profile';
import HomePage from './pages/Auth/HomePage'
import Admin from "./pages/Admin/Admin";
import Deneme from './pages/Auth/deneme';



function App() {
  return (
    <Router>
      <div className="App">
        
        
        
        <Headers />

        
        
        <div>
          
        <Routes>
          <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<HomePage />} component={HomePage}></Route>
          <Route path="/income" element={<Income />} component={Income}></Route>
          <Route path="/expense" element={<Expense />} component={Expense}></Route>
          <Route path="/profile" element={<Profile />} component={Profile}></Route>
          <Route path="/admin" element={<Admin />} component={Admin} admin={true}></Route>
          <Route path="/deneme" element={<Deneme />} component={Deneme} ></Route>
          </Route>
          <Route path="/signin" element={<Signin />} component={Signin}></Route>
           <Route path="/signup" element={<Signup />} component={Signup}></Route>
        </Routes>
        
        </div>
      
      
      
      </div>
    </Router>
  );
}


export default App;
