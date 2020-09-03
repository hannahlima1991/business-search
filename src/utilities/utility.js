//Yelp's api doesn't accept requests from the client side, so I had to get around that, it could also
//be fixed by me having a proxy server.
var cors_api_url = "https://cors-anywhere.herokuapp.com/";

const yelpApiKey =
  "K0gHrVfelnkUTxxEMFYLNP1rbg0ZsJjsST4-ge5F31B-5KQVvUs496_jVAU1fsvi1qM4GbAFWF26Fk01vLrQWfWNd5HPfmPcC40EAumLZhCBu0ooycf_DjCMvlxNX3Yx";

//This function feeds to Home and Details components,it gets the promise and points to the heroku
//url and uses their server side to make a request and it returns the information it receives back to me.
export function doCORSRequest(options, dataHandler) {
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

//The data handlers help me decide what data I want to pass back to my UI
//I deconstructed the objects in a way where I could have acess only to the keys i needed.
export const zipCodeDataHandler = (data) => {
  const { latitude, longitude } = JSON.parse(data.target.response);
  if (latitude && longitude) {
    return {
      longitude,
      latitude,
    };
  } else {
    return null;
  }
};
export const yelpDataHandler = (data) => {
  const { businesses } = JSON.parse(data.target.response);
  return businesses;
};
export const detailsHandler = (data) => {
  const businessObject = JSON.parse(data.target.response);
  return businessObject;
};
