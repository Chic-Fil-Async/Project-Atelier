/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaFacebookSquare, FaPinterestSquare } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import ThumbnailOverlay from './ThumbnailOverlay.jsx';
import StarRating from '../reviews/StarRating.jsx';

const { useState, useEffect, useRef } = React;

const InfoSectionContainer = styled.div`
  width: 40%;
  padding: 1.25em;
`;

const Stars = styled.div`
  font-size: 0.875em;
`;

const ProductTitle = styled.h2`
  font-size: 1.5em;
`;

const ProductCategory = styled.p`
  font-size: 1em;
`;

const ProductPrice = styled.div`
  font-size: 1em;
`;

const SalePrice = styled.p`
  font-size: 1em;
  color: red;
`;

const OriginalPrice = styled.p`
  font-size: 1em;
  color: black;
`;

const OriginalPriceSale = styled.p`
  font-size: 1em;
  text-decoration: line-through;
  color: black;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625em;
  width: 20.625em;
`;

const SelectedStyle = styled.div`
  margin-bottom: 0.625em;
  font-size: 1em;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 1.875em;
  margin-bottom: 0.625em;
  width: 100%;
`;

const SelectSizeContent = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 0em;
  width: 10.9375em;
  margin-right: 1.5625em;
`;

const SelectQuantityContent = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 0em;
  width: 10.9375em;
`;

const Select = styled.select`
  width: 10.9375em;
  cursor: pointer;
  font-size: 1em;
  padding: 0.5em;
  transition: background-color 0.7s;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const CartContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 0.625em;
  justify-content: space-between;
  width: 100%;
`;

const AddButton = styled.button`
  position: relative;
  cursor: pointer;
  width: 100%;
  font-size: 1em;
  padding: 0.5em;
  background-color: black;
  color: white;
  border-radius: 1.25em;
  transition: background-color 0.7s;
  &:hover {
    background-color: blue;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 0.3125em;
`;

const SocialMedia = styled.div`
  font-size: 1em;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const FacebookIcon = styled(FaFacebookSquare)`
  margin-right: 0.625em;
  color: white;
`;

const FacebookButton = styled.button`
  display: flex;
  cursor: pointer;
  align-items: center;
  border: none;
  font-size: 16px;
  margin-right: 0.625em;
  color: white;
  background-color: #316ff6;
  border-radius: 0.625em;
  padding: 0.3125em 0.3125em;
  width: 6.875em;
  transition: background-color 0.7s;
  &:hover {
    background-color: #5A7FC9;
  }
`;

const TwitterIcon = styled(FaSquareXTwitter)`
  margin-right: 0.625em;
  color: white;
`;

const TwitterButton = styled.button`
  display: flex;
  cursor: pointer;
  align-items: center;
  border: none;
  font-size: 16px;
  margin-right: 0.625em;
  color: white;
  background-color: #14171A;
  border-radius: 0.625em;
  padding: 0.3125em 0.3125em;
  width: 6.875em;
  transition: background-color 0.7s;
  &:hover {
    background-color: #605857;
  }
`;

const PinterestIcon = styled(FaPinterestSquare)`
  margin-right: 0.625em;
  color: white;
`;

const PinterestButton = styled.button`
  display: flex;
  cursor: pointer;
  align-items: center;
  border: none;
  font-size: 16px;
  color: white;
  background-color: #E60023;
  border-radius: 0.625em;
  padding: 0.3125em 0.3125em;
  width: 6.875em;
  transition: background-color 0.7s;
  &:hover {
    background-color: #FF3347;
  }
`;

// eslint-disable-next-line react/prop-types
function InfoSection({
  productId, onStyleSelect, scrollToReviews, scaleRatings, computeAverage,
}) {
  const [infoSectionProduct, setInfoSectionProduct] = useState([]);
  const [productStyle, setProductStyle] = useState([]);
  const [selectedStyleId, setSelectedStyleId] = useState(null);
  const [styleName, setStyleName] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [salePrice, setSalePrice] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [rating, setRating] = useState([]);
  const [reviewCount, setReviewCount] = useState(0);
  const sizeDropdownRef = useRef(null);

  useEffect(() => {
    axios.get(`/api/products/${productId}`)
      .then((response) => {
        setInfoSectionProduct(response.data);
      })
      .catch((err) => {
        console.error('Error retrieving product information for InfoSection component:', err);
      })
      .then(() => {
        axios.get(`/api/products/${productId}/styles`)
          .then((response) => {
            setProductStyle(response.data.results);
            if (response.data.results.length > 0) {
              onStyleSelect(response.data.results[0].style_id);
              setSelectedStyleId(response.data.results[0].style_id);
              setStyleName(response.data.results[0].name);
              setOriginalPrice(response.data.results[0].original_price);
              if (response.data.results[0].sale_price !== null) {
                setSalePrice(response.data.results[0].sale_price);
              }
            }
          })
          .catch((err) => {
            console.error('Error retrieving product styles:', err);
          });
      });
  }, [productId]);

  useEffect(() => {
    axios.get(`/api/reviews/meta?product_id=${productId}`)
      .then((results) => {
        const scaledRatings = scaleRatings(results.data.ratings);
        setRating([computeAverage(scaledRatings)]);
        const recCount = results.data.recommended;
        const noCount = Number(recCount.false);
        const yesCount = Number(recCount.true);
        setReviewCount(noCount + yesCount);
      });
  }, [productId]);

  // eslint-disable-next-line no-shadow
  const handleStyleSelect = (styleId, styleName, stylePrice, styleSalePrice) => {
    if (styleId !== selectedStyleId) {
      onStyleSelect(styleId);
      setSelectedStyleId(styleId);
      setStyleName(styleName);
      setOriginalPrice(stylePrice);
      setSalePrice(styleSalePrice);
      setSelectedSize('');
      setSelectedQuantity(1);
    }
  };

  // eslint-disable-next-line max-len
  const sizeOptions = Object.values(productStyle.find((style) => style.style_id === selectedStyleId)?.skus || {})
    ?.filter((sku) => sku.quantity > 0)
    ?.map((sku) => sku.size) || [];

  const maxQuantity = selectedSize
    ? Math.min(
      Object.values(productStyle.find((style) => style.style_id === selectedStyleId)?.skus)
        .find((sku) => sku.size === selectedSize)?.quantity || 0,
      15,
    )
    : 0;

  const quantityOptions = selectedSize ? Array.from({ length: maxQuantity }, (_, index) => index + 1) : ['-'];

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setSelectedQuantity(1);
    setErrorMessage('');
    if (quantityOptions.length === 0) {
      setSelectedSize('OUT OF STOCK');
    }
  };

  const handleQuantitySelect = (quantity) => {
    setSelectedQuantity(quantity);
  };

  const handleAddCart = () => {
    if (selectedSize === '') {
      setErrorMessage('Please select size');
      sizeDropdownRef.current.focus();
    } else {
      console.log(`Adding to cart Size: ${selectedSize} Quantity: ${selectedQuantity}`);
      setSelectedSize('');
    }
  };

  return (

    <InfoSectionContainer>
      <Stars scrollToReviews={scrollToReviews}>
        <StarRating rating={rating || 0} />
        <a href="#" onClick={scrollToReviews} data-testid="scroll-to-reviews">
          Read
          {' '}
          all
          {' '}
          {reviewCount}
          {' '}
          reviews
        </a>
      </Stars>

      <ProductCategory>{infoSectionProduct.category}</ProductCategory>

      <ProductTitle>{infoSectionProduct.name}</ProductTitle>

      <ProductPrice>
        {salePrice !== null && (
          <>
            <SalePrice>
              $
              {salePrice}
            </SalePrice>
            <OriginalPriceSale>
              $
              {originalPrice}
            </OriginalPriceSale>
          </>
        )}
        {salePrice === null && (
          <OriginalPrice>
            $
            {originalPrice}
          </OriginalPrice>
        )}
      </ProductPrice>

      <SelectedStyle>
        Style:
        {' '}
        {styleName}
      </SelectedStyle>

      <ThumbnailContainer data-testid="thumbnail-overlay">
        {productStyle.map((style) => (
          <ThumbnailOverlay
            key={style.style_id}
            src={style.photos[0].thumbnail_url}
            alt={style.name}
            selected={selectedStyleId === style.style_id}
            onClick={() => handleStyleSelect(
              style.style_id,
              style.name,
              style.original_price,
              style.sale_price,
            )}
          />
        ))}
      </ThumbnailContainer>

      <DropdownContainer>
        <SelectSizeContent>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

          <label htmlFor="sizeSelect">Size:</label>
          <Select
            ref={sizeDropdownRef}
            value={selectedSize || ''}
            onChange={(e) => handleSizeSelect(e.target.value)}
          >
            <option value="">Select Size:</option>
            {sizeOptions.length > 0 ? (
              sizeOptions.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))
            ) : (
              <option value="" disabled>OUT OF STOCK</option>
            )}
          </Select>
        </SelectSizeContent>

        <SelectQuantityContent>

          <label htmlFor="quantitySelect">Quantity:</label>
          <Select
            value={selectedQuantity}
            onChange={(e) => handleQuantitySelect(Number(e.target.value))}
            disabled={!selectedSize}
          >
            {quantityOptions.map((quantity) => (
              <option key={quantity} value={quantity}>{quantity}</option>
            ))}
          </Select>
        </SelectQuantityContent>
      </DropdownContainer>

      <CartContainer>
        {quantityOptions.length !== 0 && (
          <AddButton onClick={handleAddCart}>
            Add To Cart
          </AddButton>
        )}
      </CartContainer>

      <SocialMedia>
        <FacebookButton type="button" aria-label="Facebook Share">
          <FacebookIcon />
          Facebook
        </FacebookButton>
        <TwitterButton type="button" aria-label="Twitter Share">
          <TwitterIcon />
          Twitter
        </TwitterButton>
        <PinterestButton type="button" aria-label="Pinterest Share">
          <PinterestIcon />
          Pinterest
        </PinterestButton>
      </SocialMedia>

    </InfoSectionContainer>
  );
}

export default InfoSection;
