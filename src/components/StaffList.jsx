import React from 'react';
import StaffItem from "./StaffItem/StaffItem";
import "../styles/Person.css";

const StaffList = ({staff, count}) => {
  return (
    <div className="persons relative">
      {
        staff.filter((char, i) => i < count).map(staff =>
          <StaffItem key={staff.person?.mal_id}
                     staff={staff} />
        )
      }
    </div>
  );
};

export default StaffList;