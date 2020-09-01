import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

var cors_api_url = "https://cors-anywhere.herokuapp.com/";
const yelpApiKey =
  "K0gHrVfelnkUTxxEMFYLNP1rbg0ZsJjsST4-ge5F31B-5KQVvUs496_jVAU1fsvi1qM4GbAFWF26Fk01vLrQWfWNd5HPfmPcC40EAumLZhCBu0ooycf_DjCMvlxNX3Yx";
const zipCodeApiKey =
  "McNZfUa7WkXtXq6pUfx0PuT6DGRX9CY1sJKkuIVB18pp195KcHwh7Hl7IuTqw3Ss";

function doCORSRequest(options, dataHandler) {
  var x = new XMLHttpRequest();
  return new Promise(function (resolve, reject) {
    x.open(options.method, cors_api_url + options.url);
    x.onload = function (data) {
      resolve(dataHandler(data));
    };
    if (/^POST/i.test(options.method)) {
      x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    x.setRequestHeader("Authorization", `Bearer ${yelpApiKey}`);
    x.send(options.data);
  });
}

const zipCodeDataHandler = (data) => {
  const { lat, lng } = JSON.parse(data.target.response);
  return {
    longitude: lng,
    latitude: lat,
  };
};
const yelpDataHandler = (data) => {
  const { businesses } = JSON.parse(data.target.response);
  return businesses;
};

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [businessList, setBusinessList] = useState([]);

  //ZIPCODE API
  const zipCodeLocation = async (userInput) => {
    const apiRequest = `https://www.zipcodeapi.com/rest/${zipCodeApiKey}/info.json/${userInput}/degrees`;
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
    const listOfBusinesses = await doCORSRequest(options, yelpDataHandler).then(
      (data) => data
    );
    setBusinessList(listOfBusinesses);
  };

  console.log(businessList);

  return (
    <div className="wrapper userInput">
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
        onClick={() => zipCodeLocation(inputValue)}
      >
        Search
      </button>
      <div className="row businessCard">
        {businessList.map((business, i) => {
          const businessId = "/business/" + business.id;
          const { id, name } = business;
          return (
            <div className="col-lg-4 businessCardList" key={i}>
              <Link to={businessId}>
                <div className="card">
                  <div className="card-body">
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
    </div>
  );
}

export default Home;
