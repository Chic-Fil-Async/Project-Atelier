/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Carousel Styling
const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 650px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const CarouselWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%
  position: relative;
  box-sizing: border-box;
`;

const CarouselContentWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
`;
const CarouselContent = styled.div`
  display: flex;
  transition: all 150ms linear;
  scrollbar-width: none;
  width: 100%;
  height: 100%;
  justify-content: left;
  box-sizing: border-box;
`;
const Arrow = styled.button`
  position: absolute;
  z-index: 1;
  top: 50%;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #ddd;
`;
const LeftArrow = styled(Arrow)`
  left: 24px;
`;
const RightArrow = styled(Arrow)`
  right: 24px;
`;

// Carousel
export default function ItemCarousel(props) {
  const { children } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    Array.isArray(children[1]) ? setLength(children[1].length + 1) : setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < (length - 1)) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  return (
    <CarouselContainer>
      <CarouselWrapper>
        {
          currentIndex > 0
          && <LeftArrow onClick={prev}>&lt;</LeftArrow>
        }
        <CarouselContentWrapper>
          <CarouselContent style={{ transform: `translateX(-${currentIndex * 20}%)` }}>
            {children}
          </CarouselContent>
        </CarouselContentWrapper>
        {
          currentIndex < (length - 5)
          && <RightArrow onClick={next}>&gt;</RightArrow>
        }
      </CarouselWrapper>
    </CarouselContainer>
  );
}
