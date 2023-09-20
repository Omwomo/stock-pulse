import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/sp500">SP 500</Link>
      <Link to="/nasdaq">Nasdaq</Link>
      <Link to="/dow-jones">DOW JONES</Link>
    </>
  );
}
