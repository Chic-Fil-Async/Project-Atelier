/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable react/no-deprecated */
import React from 'react';
import {
  render, screen, act, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import AddReviewStarRating from '../AddReviews/AddReviewStarRating.jsx';

const data = { rating: 4 };

describe('review star rating', () => {
  test('render stars', async () => {
    const user = userEvent.setup();
    const handleNewReviewChange = jest.fn((x) => {
      data.rating = x;
    });
    const component = render(
      <AddReviewStarRating
        newReviewData={data}
        handleNewReviewChange={handleNewReviewChange}
      />,
    );
    await user.hover(screen.getByTestId('rsr-1'));
    waitFor(() => {
      expect(component.container.getByText('Poor')).toBeInTheDocument();
      expect(handleNewReviewChange.mock.calls).toHaveLength(1);
    //  expect(component.container).toMatchSnapshot();
    });
    await user.hover(screen.getByTestId('rsr-2'));
    waitFor(() => {
      expect(component.container.getByText('Fair')).not.toBeInTheDocument();
      expect(component.container.getByText('Poor')).not.toBeInTheDocument();
      expect(handleNewReviewChange.mock.calls).toHaveLength(2);
    //  expect(component.container).toMatchSnapshot();
    });
  });
/*
  test('render should show text when hover', async () => {
    const user = userEvent.setup();
    const handleNewReviewChange = jest.fn((x) => {
      data.rating = x;
    });
    const component = render(
      <AddReviewStarRating
        newReviewData={data}
        handleNewReviewChange={handleNewReviewChange}
      />,
    );
    await user.hover(component.getByTestId('rsr-2'));
    waitFor(()=>{
      expect(component.getByTestId('rating-blurb')).toHaveTextContent('Poor');
    })
    await user.hover(component.getByTestId('rsr-3'));
    waitFor(()=>{
      expect(component.getByTestId('rating-blurb')).toHaveTextContent('Average');
    })

  });*/

  test('render should show text when hover', async () => {
    const user = userEvent;
    const reviewData = { };
    const handleNewReviewChange = jest.fn((x) => {
      data.rating = x;
    });
    const component = render(
      <AddReviewStarRating
        newReviewData={reviewData}
        handleNewReviewChange={handleNewReviewChange}
      />,
    );

    await user.hover(component.getByTestId('rsr-2'));
    await waitFor(() => {
      expect(component.getByTestId('rating-blurb')).not.toHaveTextContent('Perfect');
    });

    await user.hover(component.getByTestId('rsr-3'));
    await waitFor(() => {
      expect(component.getByTestId('rating-blurb')).not.toHaveTextContent('Perfect');
    });
  });

});
