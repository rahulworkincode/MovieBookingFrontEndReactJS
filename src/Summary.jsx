import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";

const Summary = () => {
  const location = useLocation();
  const { showData } = location.state;

  const [showForm, setShowForm] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const [formData, setFormData] = useState({
    movieName: showData.name,
    numberOfTickets: 1,
    ticketType: "",
    totalAmount: 0,
  });

  const ticketTypes = {
    premium: 400,
    executive: 200,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let totalAmount = formData.totalAmount;
    console.log("tttt", totalAmount);

    if (name === "numberOfTickets") {
      totalAmount = parseInt(value) * ticketTypes[formData.ticketType];
    } else if (name === "ticketType") {
      totalAmount = formData.numberOfTickets * ticketTypes[value];
    }

    setFormData({
      ...formData,
      [name]: value,
      totalAmount,
    });
  };

  const handleBookClick = () => {
    setShowForm(true);
    setButtonClicked(true);
  };

  const handleBook = () => {
    setButtonClicked(false);
    const existingBookings =
      JSON.parse(localStorage.getItem("bookingDetails")) || [];
    const updatedBookings = Array.isArray(existingBookings)
      ? existingBookings
      : [];
    updatedBookings.push(formData);

    localStorage.setItem("bookingDetails", JSON.stringify(updatedBookings));
    alert("Booking successful! Check local storage for details.");
    setShowForm(false);
  };

  return (
    <div>
      <h1>Summary</h1>
      <div className="viewstyle2">
        <img src={showData.show.image?.medium} alt={showData?.show.name} />
        <div className="detailsstyle2">
          <p>
            Name: <b>{showData.show.name}</b>
          </p>
          <p>Summary{parse(showData.show.summary)}</p>

          <div className="buttonbooking">
            {!buttonClicked && (
              <button type="button" onClick={handleBookClick}>
                Book Tickets
              </button>
            )}
            {showForm && (
              <form className="formgroup">
                <label>
                  Number of Tickets :
                  <input
                    type="number"
                    name="numberOfTickets"
                    value={formData.numberOfTickets}
                    onChange={handleChange}
                  />
                </label>
                <br />
                <label>
                  Ticket Type :
                  <select
                    name="ticketType"
                    value={formData.ticketType}
                    onChange={handleChange}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Please select an option
                    </option>
                    <option value="premium">Premium (Cost: $400)</option>
                    <option value="executive">Executive (Cost: $200)</option>
                  </select>
                </label>
                <br />
                <label>
                  Total Amount : ${" "}
                  {isNaN(formData.totalAmount) ? 0 : formData.totalAmount}
                </label>
                <br />
                <button type="button" onClick={handleBook}>
                  Book
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
