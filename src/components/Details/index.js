import React, { useState, useEffect } from "react";
import "./Details.css";
import catGif from "../assets/catGif.gif";
import backArrow from "../assets/backArrow.svg";
import { doCORSRequest, detailsHandler } from "../../utilities/utility";
import ReactStars from "react-stars";

//My hooks to manage states and setting their initial state.
function Details(props) {
  const [loading, setLoading] = useState(true);
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

  //every time the component mounts,useEffect will rerender the information.
  useEffect(() => {
    getBusinessDetails();
  }, []);

  // I use props to read from the id on the specific object and display the information for the nested object
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

  //deconstruction to get only the pertinent information from the details endpoint
  const {
    name,
    image_url,
    rating,
    price,
    location,
    display_phone,
    id,
  } = businessDetailsObject;
  const { address1, city, state, zip_code } = location;
  console.log(businessDetailsObject);

  return (
    <div className="image-container">
      <div className="container">
        {loading ? (
          // Loading gif
          <img className="loding-gif" src={catGif} />
        ) : (
          // Business Details
          <div class="card mb-3 cardSize">
            <div class="row no-gutters">
              <div class="col-md-6">
                <img
                  src={image_url}
                  class="card-img business-picture"
                  alt="Food Plate"
                />
              </div>
              <div class="col-md-6">
                <div class="card-body business-details">
                  <h5 class="card-title business-name">
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
                    <b>General Rate:</b>{" "}
                    <div className="d-flex justify-content-center">
                      <ReactStars
                        count={5}
                        value={rating}
                        size={24}
                        color2="#ffd700"
                        edit={false}
                      />
                    </div>
                  </p>
                  <p class="card-text">
                    <b>Rate this business:</b>
                    <div className="d-flex justify-content-center">
                      <ReactStars
                        count={5}
                        value={
                          localStorage.getItem(id)
                            ? localStorage.getItem(id)
                            : 0
                        }
                        size={24}
                        color2="#ffd700"
                        edit={true}
                        onChange={(stars) => localStorage.setItem(id, stars)}
                      />
                    </div>
                    <div className="back-arrow">
                      <img
                        src={backArrow}
                        onClick={() => props.history.push("/")}
                      />
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;
