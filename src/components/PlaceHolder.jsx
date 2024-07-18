import React from "react";
import "../css/PlaceHolder.css";

const PlaceHolder = () => {
  const placeholders = Array.from({ length: 5 }, (_, index) => (
    <div key={index} className="letter-placeholder"></div>
  ));

  return <div className="word-placeholder">{placeholders}</div>;
};

export default PlaceHolder;
