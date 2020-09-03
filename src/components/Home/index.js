import React, { useState } from "react";
import "./Home.css";
import catGif from "../assets/catGif.gif";
import {
  doCORSRequest,
  zipCodeDataHandler,
  yelpDataHandler,
} from "../../utilities/utility";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  //ZIPCODE API
  const zipCodeLocation = async (userInput) => {
    const zipCodeApiKey = "UnWxhm2IIMISFP3afI7j";
    const apiRequest = `https://api.geolake.com/geocode?api_key=${zipCodeApiKey}&country=US&q=${userInput}`;
    const options = {
      method: "GET",
      url: apiRequest,
    };

    const locationData = await doCORSRequest(options, zipCodeDataHandler).then(
      (data) => data
    );
    if (locationData) {
      getBusinessesApiCall(locationData);
    } else {
      setLoading(false);
      alert("Zip Code in invalid!");
    }
  };

  //YELP BUSINESS API
  const getBusinessesApiCall = async (locationData) => {
    const yelpApiRequest = "https://api.yelp.com/v3/businesses";
    const { latitude, longitude } = locationData;
    const options = {
      method: "GET",
      url:
        yelpApiRequest +
        `/search?latitude=${latitude}&longitude=${longitude}&sort_by=distance`,
    };
    const listOfBusinesses = await doCORSRequest(options, yelpDataHandler).then(
      (data) => data
    );
    setLoading(false);
    setBusinessList(listOfBusinesses);
  };

  return (
    <div
      className="wrapper"
      style={{ height: businessList.length === 0 ? "100vh" : "100%" }}
    >
      <div className="userInput">
        <input
          className="textBox"
          placeholder="Insert Zip Code"
          type="number"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        ></input>
        <button
          className="searchButton"
          onClick={() => {
            setLoading(true);
            zipCodeLocation(inputValue);
          }}
        >
          Search
        </button>
      </div>
      <div className="container">
        {loading ? (
          <img className="lodingGif" src={catGif} />
        ) : (
          <div className="row businessCard">
            {businessList.map((business, i) => {
              const businessId = "/business/" + business.id;
              const { id, name, rating, distance } = business;

              return (
                <div className="col-lg-4 businessCardList" key={i}>
                  <div className="card">
                    <div className="card-body verticalCenter text-center w-100">
                      <Link to={businessId}>
                        <h4 className="card-title">
                          <b>{name}</b>
                          <p className="distanceMarker">
                            {Math.round(distance)}m.
                          </p>
                        </h4>
                      </Link>
                      <div className="d-flex justify-content-center">
                        <ReactStars
                          count={5}
                          value={rating}
                          size={24}
                          color2="#ffd700"
                          edit={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
