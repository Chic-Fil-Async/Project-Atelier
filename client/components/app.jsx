/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ProductDetail from './productDetail/ProductDetail.jsx';
import Reviews from './reviews/Reviews.jsx';
import RelatedItems from './relatedItems/RelatedItems.jsx';

const Title = styled.h1`
  font-family: mate;
  text-align: center;
  font-style: italic;
  font-weight: bold;
`;
const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: mate;
`;

function App() {
  const [metadata, setMetadata] = useState({});
  const [currentProductData, setCurrentProductData] = useState({});
  const [currentProductID, setCurrentProductID] = useState(40346);
  const [numReviewsAdded, setNumReviewsAdded] = useState(0);

  /* ----- Function tells reviews to refresh when new review is added ----- */
  const reloadReviews = () => {
    setNumReviewsAdded(numReviewsAdded + 1);
  };
  /* ----- Functions for grabbing review data and computing averges ----- */

  const getMetadata = async () => {
    const data = await axios.get('/api/reviews/meta', {
      params: {
        product_id: currentProductID,
      },
    }).catch((err) => err);
    return data;
  };
  const scaleRatings = (ratings) => {
    const result = {};
    let sum = 0;
    Object.keys(ratings)?.forEach((key) => {
      sum += Number(ratings[key]);
    });
    Object.keys(ratings).forEach((key) => {
      result[key] = (Number(ratings[key]) / sum);
    });
    return result;
  };
  const computeAverage = (scaledRatings) => {
    let result = 0;
    Object?.keys(scaledRatings)?.forEach((key) => {
      result += Number(key) * Number(scaledRatings[key]);
    });
    return result;
  };
  /* ----- Rendering Initial State ----- */
  useEffect(() => {
    axios.get(`/api/products/${currentProductID}`)
      .then((results) => {
        setCurrentProductData(results.data);
      });
  }, [currentProductID]);

  useEffect(() => {
    getMetadata()
      .then((res) => {
        const { data } = res;
        const meta = { ...res.data };
        meta.rec = Number(data?.recommended?.true);
        meta.noRec = Number(data?.recommended?.false);
        meta.percentRecommend = 100 * (meta.rec / (meta.rec + meta.noRec));
        meta.scaled = scaleRatings(meta.ratings);
        meta.average = computeAverage(meta.scaled);
        setMetadata(meta);
      });
  }, [currentProductID, numReviewsAdded]);

  /* ----- Function for user navigation ----- */
  const scrollToReviews = () => {
    const reviewsSection = document.getElementById('reviews-section');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* ----- Function for changing product ----- */
  const handleProductChange = (newID) => {
    setCurrentProductID(newID);
  };

  return (
    <>

      <Title>
        Project Atelier
      </Title>

      <ProductDetail currentProductID={currentProductID} scrollToReviews={scrollToReviews} scaleRatings={scaleRatings} computeAverage={computeAverage} />
      <RelatedItems scaleRatings={scaleRatings} computeAverage={computeAverage} currentProductData={currentProductData} currentProductID={currentProductID} handleProductChange={handleProductChange} />
      <ReviewsContainer id="reviews-section">
        <Reviews metadata={metadata} reloadReviews={reloadReviews} numReviewsAdded={numReviewsAdded} />
      </ReviewsContainer>
    </>
  );
}

export default App;
