import React, { useEffect } from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCompanies, filter, checkTyping } from '../redux/companySlice';
import NavBar from './Navbar';
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

  const getColorClass = (changesPercentage) => {
    if (changesPercentage > 0) {
      return 'positive';
    }
    return 'negative';
  };

  return (
    <div className="home">
      <div className="header">
        <NavBar />
        <div className="h">
          <div className="hd-ds">
            <p className="stock-intro">
              Discover detailed company profiles and their stock performance metrics to gain
              valuable insights into their operations and achievements.
            </p>
            <button className="header-button" type="button">Learn More</button>
          </div>
          <div className="image" />
        </div>
      </div>
      <input
        type="text"
        className="search"
        placeholder="SEARCH COMPANIES..."
        onChange={handleFilter}
      />
      <div className="company-list">
        {isTyping ? filterCompanies.map((company) => (
          <div key={company.symbol} className="company">
            <Link to={`/details/${company.symbol}`}>
              <FaArrowCircleRight className="arrow" />
              <p className="company-name" data-testid="company-name">
                {company.name}
              </p>
              <p className={`company-changes ${getColorClass(company.changesPercentage)}`} data-testid="company-changes">
                {company.changesPercentage}
              </p>
            </Link>
          </div>
        )) : companies.map((company) => (
          <div key={company.symbol} className="company">
            <Link to={`/details/${company.symbol}`}>
              <FaArrowCircleRight className="arrow" />
              <p className="company-name" data-testid="company-name">
                {company.name}
              </p>
              <p className={`company-changes ${getColorClass(company.changesPercentage)}`} data-testid="company-changes">
                {company.changesPercentage}
                %
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
