import React, { useState } from 'react';
import "./Carousel.css";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

const Carousel = ({ elements, count, elementReturner, elementWidth }) => {
  const [elementsState, setElementState] = useState(elements.filter((el, i) => i < count));
  if (!elements) return;

  const moveToLeft = () => {
    setElementState(prevEls => {
      let shiftedEls = [];
      for (let i = 0; i < Math.floor(document.querySelector(".carousel").offsetWidth / elementWidth); i++) {
        shiftedEls.push(prevEls.shift());
      }

      return [...prevEls, ...shiftedEls];
    })
  }

  const moveToRight = () => {
    setElementState(prevEls => {
      let popEls = [];
      for (let i = 0; i < Math.floor(document.querySelector(".carousel").offsetWidth / elementWidth); i++) {
        popEls.unshift(prevEls.pop());
      }

      return [...popEls, ...prevEls];
    })
  }

  return (
    <div className="carouselContainer">
      <button className="buttonLeft" onClick={moveToLeft}>
        <MdOutlineArrowBackIos/>
      </button>
      <button className="buttonRight" onClick={moveToRight}>
        <MdOutlineArrowForwardIos/>
      </button>
      <div className="carousel">
        {elementsState.map(el => elementReturner({ element: el, width: elementWidth }))}
      </div>
    </div>
  );
};

export default Carousel;