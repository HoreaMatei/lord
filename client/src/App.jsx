import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import photo from "./media/search.png";
import backgroundVideo from "./media/2.mp4";
import Storyblok from "./services/storyblok";
import Navbar from "./components/Navbar";

const App = () => {
  const [story, setStory] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    setInputValue(document.getElementById("input").value);
  };

  function enterPressed(e) {
    if (e.key === "Enter") {
      handleClick();
    }
  }

  const handleItemClick = (item) => {
    const token = localStorage.getItem("token"); // Check if the user is logged in
    if (!token) {
      alert("You need to log in to access this content!");
      navigate("/login", { state: { redirectTo: "/main", item } }); // Navigate to the login page if no token is found
    } else {
      navigate("/main", { state: { item } });
      console.log(`Navigating to item: ${item.title}`);
      // Here, you can implement further logic (e.g., navigating to a specific page for the item)
    }
  };

  useEffect(() => {
    Storyblok.get("cdn/stories/rings", {
      version: "draft",
    })
      .then((response) => {
        setStory(response.data.story.content.body[0]);
      })
      .catch((error) => {
        console.error("Error fetching data from Storyblok:", error);
      });
  }, [inputValue]);

  return (
    <div className="page">
      <Navbar />
      <video playsInline autoPlay loop muted className="videoBg">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div></div>
      <div className="content">
        <div className="subDiv">
          <p className={`title `}>Choose a character and start playing</p>
          <div className="searchDiv">
            <input
              autoComplete="off"
              type="search"
              placeholder="search for a character..."
              id="input"
              onKeyDown={enterPressed}
              required
            ></input>

            <button onClick={handleClick} className="searchBtn">
              <img
                className="search-img"
                src={photo}
                priority="true"
                width={30}
                height={30}
                alt="search"
              />
            </button>
          </div>
        </div>

        {story &&
        story.columns.filter((item) =>
          item.title.toLowerCase().includes(inputValue.toLowerCase())
        ) ? (
          <div className="linksContainer">
            {story.columns.map((item, index) => (
              <div key={index}>
                {item.title.toLowerCase().includes(inputValue.toLowerCase()) ? (
                  <button
                    onClick={() => handleItemClick(item)}
                    className="links"
                  >
                    <p className="noDec" id={index}>
                      {" "}
                      {item.title}
                    </p>
                  </button>
                ) : null}{" "}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
