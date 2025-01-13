import React from "react";
import "./SingleCard.css";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
      // start();
    }
  };
  //let audio = new Audio("./flip2.mp3");
  //const start = () => {
  //audio.play();
  // };

  return (
    <div className="card">
      <div className={flipped ? "flipped " : ""} onClick={handleClick}>
        <div className="front ">
          <img
            height={200}
            width={200}
            className="front2 absolute index10 "
            alt="card front"
            src="back4.png"
          />

          <img
            height={200}
            width={200}
            className="front3 absolute "
            alt="card front"
            src={card.imgSrc.imgSrc}
          />
        </div>

        <img
          height={200}
          width={200}
          className="back"
          src="/front.jpeg"
          alt="card back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
