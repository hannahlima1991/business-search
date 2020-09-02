import React, { useState } from "react";
import "./Home.css";
import catGif from "../assets/catGif.gif";
import {
  doCORSRequest,
  zipCodeDataHandler,
  yelpDataHandler,
} from "../../utilities/utility";
import { Link } from "react-router-dom";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(loading);

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
    getBusinessesApiCall(locationData);
  };

  //YELP BUSINESS API
  const getBusinessesApiCall = async (locationData) => {
    const yelpApiRequest = "https://api.yelp.com/v3/businesses";
    const { latitude, longitude } = locationData;
    const options = {
      method: "GET",
      url:
        yelpApiRequest + `/search?latitude=${latitude}&longitude=${longitude}`,
    };
    console.log(options.url);
    const listOfBusinesses = await doCORSRequest(options, yelpDataHandler).then(
      (data) => data
    );
    setLoading(false);
    setBusinessList(listOfBusinesses);
  };

  console.log(businessList);

  return (
    <div className="wrapper">
      <div className="userInput">
        <input
          className="textBox"
          placeholder="Insert Zip Code"
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
              const { id, name } = business;
              return (
                <div className="col-lg-4 businessCardList" key={i}>
                  <Link to={businessId}>
                    <div className="card">
                      <div className="card-body verticalCenter text-center w-100">
                        <h4 className="card-title">
                          <b>{name}</b>
                        </h4>
                      </div>
                    </div>
                  </Link>
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
