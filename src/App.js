import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import TaskManagement from './components/TaskManagement';
import ForgotPassword from './components/ForgotPassword';


function App() {
  const url = useLocation()
  console.log(url,"url")
  return (
    <Provider store={store}>
      {url.pathname !== "/" &&  url.pathname !== "/register" &&url.pathname !== "/forgot-password" && <Header/>}
     
      {/* <Router> */}
        <div className="container">
          <Routes>
            <Route path="/register" element={<Register  />} />
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
             <Route 
              path="/tasks" 
              element={
                <PrivateRoute>
                  <TaskManagement />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      {/* </Router> */}
    </Provider>
  );
}

export default App;
