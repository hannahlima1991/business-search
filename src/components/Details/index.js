import React, { useState, useEffect } from "react";
import "./Details.css";

var cors_api_url = "https://cors-anywhere.herokuapp.com/";
const yelpApiKey =
  "K0gHrVfelnkUTxxEMFYLNP1rbg0ZsJjsST4-ge5F31B-5KQVvUs496_jVAU1fsvi1qM4GbAFWF26Fk01vLrQWfWNd5HPfmPcC40EAumLZhCBu0ooycf_DjCMvlxNX3Yx";

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

function Details(props) {
  useEffect(() => {
    getBusinessDetails();
  }, []);

  const getBusinessDetails = async () => {
    const detailsApiRequest = `https://api.yelp.com/v3/businesses/${props.match.params.id}`;
  };
  return <div className="details">This is details</div>;
}

export default Details;
