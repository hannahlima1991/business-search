import React, { useState, useEffect } from "react";
import "./Details.css";
import catGif from "../assets/catGif.gif";
import { doCORSRequest, detailsHandler } from "../../utilities/utility";

function Details(props) {
  const [loading, setLoading] = useState(true);
  console.log(loading);
  const [businessDetailsObject, setbusinessDetailsObject] = useState({
    name: "",
    image_url: "",
    rating: "",
    price: "",
    location: {
      address1: "",
      city: "",
      state: "",
      zip_code: "",
    },
    display_phone: "",
  });

  useEffect(() => {
    getBusinessDetails();
  }, []);

  const getBusinessDetails = async () => {
    const detailsApiRequest = `https://api.yelp.com/v3/businesses/${props.match.params.id}`;
    const options = {
      method: "GET",
      url: detailsApiRequest,
    };
    const details = await doCORSRequest(options, detailsHandler).then(
      (data) => data
    );
    setLoading(false);
    setbusinessDetailsObject(details);
  };
  console.log(businessDetailsObject);

  const {
    name,
    image_url,
    rating,
    price,
    location,
    display_phone,
  } = businessDetailsObject;
  const { address1, city, state, zip_code } = location;

  return (
    <div className="container imageContainer">
      {loading ? (
        // Loading gif
        <img className="lodingGif" src={catGif} />
      ) : (
        // Business Details
        <div class="card mb-3 cardSize">
          <div class="row no-gutters">
            <div class="col-md-6">
              <img
                src={image_url}
                class="card-img businessPicture"
                alt="Food Plate"
              />
            </div>
            <div class="col-md-6">
              <div class="card-body businessDetails">
                <h5 class="card-title businessName">
                  <b>{name}</b>
                </h5>
                <p class="card-text">
                  <b>Address:</b>{" "}
                  <a
                    target="_blank"
                    href={`https://maps.google.com/?q=${address1},${city},${state},${zip_code}`}
                  >
                    {address1}, {city}, {state} {zip_code}
                  </a>
                </p>
                <p class="card-text">
                  <b>Phone:</b>
                  <a href={`tell:${display_phone}`}>{display_phone}</a>
                </p>
                <p class="card-text">
                  <b>Price:</b> {price}
                </p>
                <p class="card-text">
                  <b>Rate:</b> {rating}
                </p>
                <p class="card-text">
                  <b>Rate this business:</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
