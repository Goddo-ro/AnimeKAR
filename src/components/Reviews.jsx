import React from 'react';
import Review from "./Review/Review";

const Reviews = ({ reviews,count }) => {
  if (!reviews) return;
  console.log(reviews)
  return (
    <>
      {reviews.filter((r, i) => i < count).map(review =>
        <Review key={review.mal_id} review={review} />
      )}
    </>
  );
};

export default Reviews;