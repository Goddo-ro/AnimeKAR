import React from 'react';
import { Link } from "react-router-dom";

const StaffItem = ({staff}) => {
  return (
    <div className="personContainer">
      <div key={staff.mal_id} className="person">
        <div className="personLeft">
          <Link><img className="w-10" src={staff.person?.images?.jpg?.image_url} /></Link>
          <Link>{staff.person?.name}</Link>
          <h5>{staff.positions[0]}</h5>
        </div>
      </div>
    </div>
  );
};

export default StaffItem;