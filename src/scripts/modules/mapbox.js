let lat;
let lon;

let query = document.querySelectorAll("input");

const getGeocode = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((geocodeData) =>
      geocodeData.features.forEach((geocode) => console.log(geocode.center))
    );
};

query[0].addEventListener("keydown", handleOriginGeocode);
query[1].addEventListener("keydown", handleDestinationGeocode);

function handleOriginGeocode(e) {
  let origin = query[0].value;
  if (e.key === "Enter" && origin !== "") {
    e.preventDefault();
    getGeocode(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${origin}.json?bbox=-97.325875,49.766204,-96.953987,49.99275&access_token=pk.eyJ1Ijoic3VwZXItZ29nZ2xlcyIsImEiOiJja3hiOTB4bTAwa2l1MnlxOWxjMTFjMmZ1In0.XsbEvgcsEukc_TyS67xL7w`
    );
  }
}

function handleDestinationGeocode(e) {
  let destination = query[1].value;
  if (e.key === "Enter" && destination !== "") {
    e.preventDefault();
    getGeocode(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${destination}.json?bbox=-97.325875,49.766204,-96.953987,49.99275&access_token=pk.eyJ1Ijoic3VwZXItZ29nZ2xlcyIsImEiOiJja3hiOTB4bTAwa2l1MnlxOWxjMTFjMmZ1In0.XsbEvgcsEukc_TyS67xL7w`
    );
  }
}

//getGeocode(query.value);

// if (!navigator.geolocation) {
//   console.log("Geolocation is not supported by your browser");
// } else {
//   navigator.geolocation.getCurrentPosition((position) => {
//     lat = position.coords.latitude;
//     lon = position.coords.longitude;
//   });
// }
