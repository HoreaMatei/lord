import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SingleCard from "../components/SingleCard";
import Navbar from "../components/Navbar";
import "./MainPage.css";
import backgroundVideo from "../media/2.mp4";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const MainPage = () => {
  const [bestScore, setBestScore] = useState("N/A");
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [userName, setUserName] = useState("");

  const location = useLocation();
  const { item } = location.state || {}; // Access the data passed via state

  const imageFileNames = item.image.map((item) => item.filename);

  const arraysMatched = imageFileNames.map((imgSrc, index) => ({
    imgSrc,
    matched: false,
  }));
  const cardArray2 = [...arraysMatched, ...arraysMatched].map(
    (imgSrc, index) => ({
      imgSrc,
      matched: false,
      index,
    })
  );

  const shuffleCards = () => {
    const shuffledDouble = cardArray2.sort(() => 0.5 - Math.random());
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledDouble);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (
        choiceOne.imgSrc === choiceTwo.imgSrc &&
        choiceOne.index != choiceTwo.index
      ) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.imgSrc === choiceOne.imgSrc) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    const fetchBestScore = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/api/users/best-score`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBestScore(response.data.bestScore || "N/A");
        setUserName(
          response.data.userName
            ? response.data.userName.charAt(0).toUpperCase() +
                response.data.userName.slice(1).toLowerCase()
            : "Guest"
        );
      } catch (error) {
        console.error("Error fetching best score:", error);
      }
    };

    fetchBestScore();
  }, []);

  useEffect(() => {
    const saveBestScore = async () => {
      // Check if all cards are matched
      if (cards.length > 0 && cards.every((card) => card.matched)) {
        console.log("All cards matched! Total turns:", turns);

        try {
          const token = localStorage.getItem("token");
          const response = await axios.put(
            `${BASE_URL}/api/users/best-score`,
            { score: turns },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          // Update best score in state
          setBestScore(response.data.bestScore);
          alert(`You matched all the cards in ${turns} turns!`);
        } catch (error) {
          console.error("Error saving best score:", error);
        }
      }
    };

    // Call saveBestScore whenever `cards` or `turns` change
    saveBestScore();
  }, [cards, turns]);

  return (
    <main className="main2">
      <video playsInline autoPlay loop muted className="videoBg">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <Navbar />

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.index}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <div className="shuffleDiv">
        <p className="turns">Turns: {turns}</p>
        <button className={`shuffleBtn `} onClick={shuffleCards}>
          Shuffle{" "}
        </button>

        <p className="turns">
          {" "}
          {userName}, Your Best Score is: {bestScore}
        </p>
      </div>
    </main>
  );
};

export default MainPage;
