var cors_api_url = "https://cors-anywhere.herokuapp.com/";
const yelpApiKey =
  "K0gHrVfelnkUTxxEMFYLNP1rbg0ZsJjsST4-ge5F31B-5KQVvUs496_jVAU1fsvi1qM4GbAFWF26Fk01vLrQWfWNd5HPfmPcC40EAumLZhCBu0ooycf_DjCMvlxNX3Yx";

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
