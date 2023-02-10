import React from 'react';
import { BsStar, BsStarFill, BsStarHalf} from "react-icons/bs";

const Rate = ({ rate }) => {
  const rates = {
    "Recommended": <BsStarFill/>,
    "Mixed Feelings": <BsStarHalf/>,
  }

  return (
    <div className={`mt-2 flex items-center border px-1 bg-gray-200 ${rate === "Recommended" ? "text-blue-500" : "text-gray-400"}`}>
      {rates[rate] ? rates[rate] : <BsStar />}
      <p className="m-0 ml-1">
        {rate}
      </p>
    </div>
  );
};

export default Rate;