import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";
import catGif from "../assets/catGif.gif";
import {
  doCORSRequest,
  zipCodeDataHandler,
  yelpDataHandler,
} from "../../utilities/utility";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

//This are my hooks and usig them I will be able to manage and change states.
function Home() {
  const [inputValue, setInputValue] = useState("");
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  //I have a second api that translates zip code to lat,lng, this was necessary because Yelp's api doens't work with zip code
  //ZIPCODE API- The zip code function works by passing the user input variable as an argument,and wait for doCorsRequest to give me back the data
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
    //if locationData returns true, give the data,if it doesn't stop the loading gif and notify the user
    if (locationData) {
      getBusinessesApiCall(locationData);
    } else {
      setLoading(false);
      alert("Zip Code in invalid!");
    }
  };

  //YELP BUSINESS API-This function works the same way as the zip code one
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
    //setLoading(false) makes the loading gif stops when the fetch request for thelistOfBusinesses comes back.
    setLoading(false);
    setBusinessList(listOfBusinesses);
  };

  return (
    <div
      className="wrapper"
      //programatic style for backgrouwnd image
      style={{ height: businessList.length === 0 ? "100vh" : "100%" }}
    >
      {/* receives the userInput as value by using the hook,once the button is clicked it sets the loding gif */}
      {/* back on and triggers the zip code function using the inputValue as an argument */}
      <div className="user-input">
        <input
          className="text-box"
          placeholder="Insert Zip Code"
          type="number"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        ></input>
        <button
          className="search-button"
          onClick={() => {
            setLoading(true);
            zipCodeLocation(inputValue);
          }}
        >
          Search
        </button>
      </div>
      <div className="container">
        {/* loading Gif ternary,if loading,show me gif,if the response is back, show me the data */}
        {loading ? (
          <img className="loding-gif" src={catGif} />
        ) : (
          <div className="row business-card ">
            {businessList.map((business, i) => {
              const businessId = "/business/" + business.id;
              // getting only the keys i need from the responseObject
              const { id, name, rating, distance } = business;

              return (
                <div
                  className="col-lg-4 business-card-list"
                  key={i}
                  data-aos="fade-up"
                >
                  <div className="card">
                    <div className="card-body vertical-center text-center w-100">
                      <Link to={businessId}>
                        <h4 className="card-title">
                          <b>{name}</b>
                          <p className="distance-marker">
                            {Math.round(distance)}m.
                          </p>
                        </h4>
                      </Link>
                      <div className="d-flex justify-content-center">
                        {/* library I am using for rating stars */}
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
