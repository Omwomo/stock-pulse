import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCompanies, filter, checkTyping } from '../redux/companySlice';
import '../assets/pexels-burak-the-weekender-186461.jpg';
import '../styles/home.css';

const Home = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies.companies);
  const filterCompanies = useSelector((state) => state.companies.filterCompanies);
  const isTyping = useSelector((state) => state.companies.isTyping);

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  const handleFilter = (e) => {
    const { value } = e.target;
    dispatch(filter(value));

    if (value) {
      dispatch(checkTyping(true));
    } else {
      dispatch(checkTyping(false));
    }
  };

  return (
    <div className="home">
      <h1>Company List</h1>
      <input
        type="text"
        placeholder="Search companies..."
        onChange={handleFilter}
      />
      <div className="header">
        <div className="hd-ds">
          <p className="stock-intro">
            Small Intro about stock market.
          </p>
          <button className="header-button" type="button">Learn More</button>
        </div>
        <div className="image" />
      </div>
      <div className="company-list">
        {isTyping ? filterCompanies.map((company) => (
          <div key={company.symbol} className="company">
            <Link to={`/details/${company.symbol}`}>
              <p>
                {company.name}
              </p>
              <p>
                {company.changesPercentage}
              </p>
              <p>
                {company.mktCap}
              </p>
            </Link>
          </div>
        )) : companies.map((company) => (
          <div key={company.symbol} className="company">
            <Link to={`/details/${company.symbol}`}>
              <p>
                {company.name}
              </p>
              <p>
                {company.changesPercentage}
              </p>
              <p>
                {company.mktCap}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
