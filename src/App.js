import React from "react";
import "./App.css";
import Home from "./components/Home";
import Details from "./components/Details";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/business/:id" component={Details} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//DETAILS API
// const apiRequest = "https://api.yelp.com/v3/businesses/TqbzDpUI9_SREzH_AfejlQ";
// alias: "nancys-hustle-houston"
// categories: [{alias: "newamerican", title: "American (New)"},…]
// coordinates: {latitude: 29.74551, longitude: -95.3520999}
// display_phone: "(346) 571-7931"
// hours: [{open: [{is_overnight: false, start: "1700", end: "0000", day: 1},…], hours_type: "REGULAR",…}]
// id: "TqbzDpUI9_SREzH_AfejlQ"
// image_url: "https://s3-media1.fl.yelpcdn.com/bphoto/IxNLxzAEKm1L4cWRx2suCg/o.jpg"
// is_claimed: true
// is_closed: false
// location: {address1: "2704 Polk St", address2: "", address3: null, city: "Houston", zip_code: "77003",…}
// name: "Nancy's Hustle"
// phone: "+13465717931"
// photos: ["https://s3-media1.fl.yelpcdn.com/bphoto/IxNLxzAEKm1L4cWRx2suCg/o.jpg",…]
// price: "$$"
// rating: 4.5
// review_count: 567
// transactions: []
// url: "https://www.yelp.com/biz/nancys-hustle-houston?adjust_creative=rF8q9DXM-pB2sRjkxkK0Gg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=rF8q9DXM-pB2sRjkxkK0Gg"
