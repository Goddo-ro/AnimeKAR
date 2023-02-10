import React from 'react';
import { Link } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import classes from "./CarouselButton.module.css";

const CarouselButton = ({ link, width }) => {
  return (
    <Link to={link}>
      <div className={classes.carouselButton} style={{width: width}}>
        <p>View All</p>
        <BsFillArrowRightCircleFill />
      </div>
    </Link>
  );
};

export default CarouselButton;