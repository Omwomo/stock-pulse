import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Details from './Details';

const MyRoutes = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/details/:symbol" element={<Details />} />
    </Routes>
  </Router>
);

export default MyRoutes;
