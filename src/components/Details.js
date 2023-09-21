import React, { useEffect } from 'react';
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
    <>
      <div className="nav-area">
        <button className="back-button" type="button" onClick={handleBack}>Back</button>
        <NavBar />
      </div>
      <div className="details">
        <aside className="side-bar">{companyDetails.companyName}</aside>
        <div className="first-div">
          <img className="logo" alt="logo" src={companyDetails.image} />
          <div className="description">{companyDetails.description}</div>
        </div>
        <div className="second-div">
          <div className="industry">
            <h3>Industry</h3>
            <p>{companyDetails.industry}</p>
          </div>
          <div className="exchange">
            <h3>Exchange</h3>
            <p>{companyDetails.exchange}</p>
            <p>{companyDetails.exchangeShortName}</p>
          </div>
          <div className="website">
            <h3>Website</h3>
            <p>{companyDetails.website}</p>
          </div>
        </div>
        <div className="third-div">
          <div className="price">
            <h3>Price</h3>
            <p>{companyDetails.price}</p>
          </div>
          <div className="market-cap">
            <h3>Market Cap</h3>
            <p>{companyDetails.mktCap}</p>
          </div>
          <div className="changes">
            <h3>Changes</h3>
            <p>{companyDetails.changes}</p>
          </div>
          <div className="ceo">
            <h3>C . E . O</h3>
            <p>{companyDetails.ceo}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
