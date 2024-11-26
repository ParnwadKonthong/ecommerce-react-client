// rafce = key react fomat
import React from "react";

const LoadingCard = ({ count }) => {
  const loopCard = () => {
    let cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(
        <div
          className="card col"
          style={{ width: "100%", padding: "20px" }}
        >
          <p class="placeholder-glow ">
            <span class="placeholder col-4"></span>
          </p>
          <p class="placeholder-wave">
            <span class="placeholder col-12"></span>
          </p>
          <p class="placeholder-wave">
            <span class="placeholder col-12"></span>
          </p>
          <p class="placeholder-wave">
            <span class="placeholder col-8"></span>
          </p>
        </div>
      );
    }
    return cards;
  };
  return <div className="row pb-6">{loopCard()}</div>;
};

export default LoadingCard;
