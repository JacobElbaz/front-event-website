import './App.css';
import React, { useEffect } from 'react';
import { useAppContext } from './context';
import Layout from './components/Layout.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Guests from './pages/Guests';

export default function App() {
  const { fetchGuests } = useAppContext()
  useEffect(() => {
    fetchGuests();
  }, [])
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/myList" element={<Guests/>}></Route>
        </Routes>
      </Layout>
    </Router>
  );
}