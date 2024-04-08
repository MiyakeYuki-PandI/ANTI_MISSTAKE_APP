import React, { } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from "./pages/Login/Login";
import Home from './pages/Home/Home';
import { RequireToken } from './functions/Auth';
import { AuthProvider } from "./pages/Login/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <RequireToken>
                <Home />
              </RequireToken>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
};

export default App;