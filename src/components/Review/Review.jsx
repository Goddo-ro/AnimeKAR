import React, { useState } from 'react';
import "./Review.css";
import { Link } from "react-router-dom";
import { getFormattedDate } from "../../utils/dateFormating";
import { makeParagraphs } from "../../utils/stringUtils";
import Rate from "../UI/Rate/Rate";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

const Review = ({ review }) => {
  const [close, setClose] = useState(true);

  const user = review.user;
  return (
    <div className="review flex mb-8">
      <img className="h-full w-12 border mr-1.5" src={user.images.jpg.image_url}/>
      <div className="w-full">
        <div className="flex justify-between mb-2">
          <div>
            <Link className="text-blue-400 mb-2">
              {user.username}
            </Link>
            <div>
              <Rate rate={review.tags[0]}/>
            </div>
          </div>
          <div>
            {getFormattedDate(review.date)}
          </div>
        </div>
        <div className={`paragraphs ${close ? "close" : ""}`}>
          {
            makeParagraphs(review.review).map(paragraph => <p>{paragraph}</p>)
          }
        </div>
        <div>
          <button className="flex items-center my-2"
                  onClick={() => setClose(prevClose => !prevClose)}
          >
            {close
              ? <MdOutlineKeyboardArrowDown className="text-lg" />
              : <MdOutlineKeyboardArrowUp className="text-lg" />
            }
            <p className="m-0">{close ? "Show more" : "Show less"}</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;