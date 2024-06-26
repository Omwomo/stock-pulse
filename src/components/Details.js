import React, { useEffect } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { singleCompanyData } from '../redux/companySlice';
import NavBar from './Navbar';
import '../styles/details.css';

const Details = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const companyDetails = useSelector((state) => state.companies.companyDetails);

  useEffect(() => {
    dispatch(singleCompanyData(symbol));
  }, [dispatch, symbol]);

  const handleBack = () => {
    navigate('/');
  };

  // Function to format market cap with comma digits
  const formatMarketCap = (mktCap) => {
    if (mktCap) {
      return mktCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return ''; // Return an empty string if mktCap is undefined
  };

  // Function to change the color of negative and positive stock price changes
  const getColorClass = (changes) => {
    if (changes > 0) {
      return 'positive';
    }
    return 'negative';
  };

  if (!companyDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details">
      <div className="nav-area">
        <button
          className="back-button"
          type="button"
          onClick={handleBack}
          aria-label="Go back"
        >
          <FaAngleLeft className="nav-arrow" data-testid="navcons-arrow" />
        </button>
        <NavBar />
      </div>
      <div className="headers">
        <img className="logo" alt="logo" src={companyDetails.image} />
        <div className="company-info">
          <h2>{companyDetails.companyName}</h2>
          <p>{companyDetails.description}</p>
        </div>
      </div>
      <div className="detail">
        <div className="table-container">
          <div className="table-row">
            <h3>Industry</h3>
            <p>{companyDetails.industry}</p>
          </div>
          <div className="table-row">
            <h3>Website</h3>
            <a className="weblink" href={companyDetails.website} target="_blank" rel="noreferrer">{companyDetails.website}</a>
          </div>
          <div className="table-row">
            <h3>Stock Price</h3>
            <p>
              $
              {companyDetails.price}
            </p>
          </div>
          <div className="table-row">
            <h3>Daily Changes</h3>
            <p className={`${getColorClass(companyDetails.changes)}`}>
              $
              {companyDetails.changes}
            </p>
          </div>
          <div className="table-row">
            <h3>Daily Avg Trading Vol</h3>
            <p>
              $
              {formatMarketCap(companyDetails.volAvg)}
            </p>
          </div>
          <div className="table-row">
            <h3>Volatility Index</h3>
            <p>
              {companyDetails.beta}
            </p>
          </div>
          <div className="table-row">
            <h3>Market Cap</h3>
            <p>
              $
              {formatMarketCap(companyDetails.mktCap)}
            </p>
          </div>
          <div className="table-row">
            <h3>C . E . O</h3>
            <p>{companyDetails.ceo}</p>
          </div>
          <div className="table-row">
            <h3>Exchange</h3>
            <p>{companyDetails.exchange}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Details;
