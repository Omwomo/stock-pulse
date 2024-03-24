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

  if (!companyDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details">
      <div className="nav-area">
        <label htmlFor="back-button" className="back-button-label">
          <button className="back-button" type="button" onClick={handleBack}>
            <FaAngleLeft className="nav-arrow" data-testid="navcons-arrow" />
          </button>
        </label>
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
            <p>{companyDetails.website}</p>
          </div>
          <div className="table-row">
            <h3>Price</h3>
            <p>{companyDetails.price}</p>
          </div>
          <div className="table-row">
            <h3>Market Cap</h3>
            <p>{companyDetails.mktCap}</p>
          </div>
          <div className="table-row">
            <h3>Changes</h3>
            <p>{companyDetails.changes}</p>
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
