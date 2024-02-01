import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewComponent = () => {
  const [shows, setShows] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        setShows(response.data);
      } catch (error) {
        console.error("Error fetching show data:", error);
      }
    };

    fetchData();
  }, []);

  const goToSummary = () => {
    navigate("/summary", { state: { showData: shows[currentIndex] } });
  };

  const goToNextShow = () => {
    if (currentIndex < shows.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPreviousShow = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      <h1>Shows</h1>
      <div className="viewstyle">
        <img
          src={shows[currentIndex]?.show.image?.medium}
          alt={shows[currentIndex]?.show.name}
        />
        <div className="detailsstyle">
          <p>
            Name: <b>{shows[currentIndex]?.show.name}</b>
          </p>
          <p>
            Genres: <b>{shows[currentIndex]?.show.genres?.join(", ")}</b>
          </p>
          <p>
            Language: <b>{shows[currentIndex]?.show.language}</b>
          </p>
          <p>
            Runtime: <b>{shows[currentIndex]?.show.runtime} minutes</b>
          </p>
          <button onClick={goToPreviousShow}>Prev</button>
          <button onClick={goToSummary}>Show Summary</button>
          <button onClick={goToNextShow}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default ViewComponent;
