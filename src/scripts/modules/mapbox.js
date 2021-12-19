let lat;
let lon;

let query = document.querySelectorAll("input");
let originsList = document.getElementById("origins");
let destinationsList = document.getElementById("destinations");

const getGeocode = (url) => {
  return fetch(url).then((response) => response.json());
};

query[0].addEventListener("keydown", handleOriginGeocode);
query[1].addEventListener("keydown", handleDestinationGeocode);

const renderDestinationsList = (geocodeDestinationsList) => {
  if (geocodeDestinationsList !== "") {
    destinationsList.insertAdjacentHTML(
      "afterbegin",
      `<li data-long="${geocodeDestinationsList.center[0]}" data-lat="${geocodeDestinationsList.center[1]}">
      <div class="name">${geocodeDestinationsList.text}</div>
      <div>${geocodeDestinationsList.place_name}</div>
    </li>`
    );
  }
};

const renderOriginsList = (geocodeOriginsList) => {
  if (geocodeOriginsList !== "") {
    originsList.insertAdjacentHTML(
      "afterbegin",
      `<li data-long="${geocodeOriginsList.center[0]}" data-lat="${geocodeOriginsList.center[1]}">
        <div class="name">${geocodeOriginsList.text}</div>
        <div>${geocodeOriginsList.place_name}</div>
      </li>`
    );
  }
};

function handleOriginGeocode(e) {
  let origin = query[0].value;
  if (e.key === "Enter" && origin !== "") {
    originsList.innerHTML = "";
    e.preventDefault();
    getGeocode(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${origin}.json?bbox=-97.325875,49.766204,-96.953987,49.99275&access_token=pk.eyJ1Ijoic3VwZXItZ29nZ2xlcyIsImEiOiJja3hiOTB4bTAwa2l1MnlxOWxjMTFjMmZ1In0.XsbEvgcsEukc_TyS67xL7w`
    ).then((geocodeData) =>
      geocodeData.features.forEach((geocode) => {
        renderOriginsList(geocode);
      })
    );
  }
}

function handleDestinationGeocode(e) {
  let destination = query[1].value;
  if (e.key === "Enter" && destination !== "") {
    destinationsList.innerHTML = "";
    e.preventDefault();
    getGeocode(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${destination}.json?bbox=-97.325875,49.766204,-96.953987,49.99275&access_token=pk.eyJ1Ijoic3VwZXItZ29nZ2xlcyIsImEiOiJja3hiOTB4bTAwa2l1MnlxOWxjMTFjMmZ1In0.XsbEvgcsEukc_TyS67xL7w`
    ).then((geocodeData) =>
      geocodeData.features.forEach((geocode) => {
        renderDestinationsList(geocode);
      })
    );
  }
}

// if (!navigator.geolocation) {
//   console.log("Geolocation is not supported by your browser");
// } else {
//   navigator.geolocation.getCurrentPosition((position) => {
//     lat = position.coords.latitude;
//     lon = position.coords.longitude;
//   });
// }
