let query = document.querySelectorAll("input");
let originsList = document.querySelector(".origins");
let destinationsList = document.querySelector(".destinations");
let myTrip = document.getElementById("my-trip");
let planTripButton = document.querySelector(".plan-trip");
var originLat;
var originLon;
var destinationLon;
var destinationLat;

const getGeocode = (url) => {
  return fetch(url).then((response) => response.json());
};

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

const handleOriginGeocode = (e) => {
  let origin = query[0].value;
  if (e.key === "Enter" && origin !== "") {
    originsList.innerHTML = "";
    e.preventDefault();
    getGeocode(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${origin}.json?bbox=-97.325875,49.766204,-96.953987,49.99275&limit=10&access_token=pk.eyJ1Ijoic3VwZXItZ29nZ2xlcyIsImEiOiJja3hiOTB4bTAwa2l1MnlxOWxjMTFjMmZ1In0.XsbEvgcsEukc_TyS67xL7w`
    ).then((geocodeData) =>
      geocodeData.features.forEach((geocode) => {
        renderOriginsList(geocode);
      })
    );
  }
};

const handleDestinationGeocode = (e) => {
  let destination = query[1].value;
  if (e.key === "Enter" && destination !== "") {
    destinationsList.innerHTML = "";
    e.preventDefault();
    getGeocode(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${destination}.json?bbox=-97.325875,49.766204,-96.953987,49.99275&limit=10&access_token=pk.eyJ1Ijoic3VwZXItZ29nZ2xlcyIsImEiOiJja3hiOTB4bTAwa2l1MnlxOWxjMTFjMmZ1In0.XsbEvgcsEukc_TyS67xL7w`
    ).then((geocodeData) =>
      geocodeData.features.forEach((geocode) => {
        renderDestinationsList(geocode);
      })
    );
  }
};

const handleSelectedLocation = (e) => {
  const li = e.path.filter((el) => el.nodeName === "LI")[0];
  li.classList.add("selected");
  const ul = e.path.filter((el) => el.nodeName === "UL")[0];
  if (ul.className === "origins") {
    originLon = li.dataset.long;
    originLat = li.dataset.lat;
  } else if (ul.className === "destinations") {
    destinationLon = li.dataset.long;
    destinationLat = li.dataset.lat;
  }
};

query[0].addEventListener("keydown", handleOriginGeocode);
query[1].addEventListener("keydown", handleDestinationGeocode);
originsList.addEventListener("click", (e) => {
  let originList = document.querySelector(".origins").children;
  for (let children of originList) {
    children.classList.remove("selected");
  }
  handleSelectedLocation(e);
});
destinationsList.addEventListener("click", (e) => {
  let destinationList = document.querySelector(".destinations").children;
  for (let children of destinationList) {
    children.classList.remove("selected");
  }
  handleSelectedLocation(e);
});

planTripButton.addEventListener("click", (e) => {
  if (
    originLat !== undefined &&
    originLon !== undefined &&
    destinationLat !== undefined &&
    destinationLon !== undefined
  ) {
  planTrip();
  } else {
    console.log("Fill all required fields");
  }
});


const planTrip = () => {
  myTrip.innerHTML = "";
  return fetch(
    `https://api.winnipegtransit.com/v3/trip-planner.json?api-key=KSqHBqfL3yaUR9M-u75p&origin=geo/${originLat},${originLon}&destination=geo/${destinationLat},${destinationLon}`
  )
    .then((response) => response.json())
    .then((tripPlanningData) => {
      renderTripPlanning(tripPlanningData);
    });
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const renderTripPlanning = (tripData) => {
    if (tripData !== "") {
      if (tripData.plans[0].segments.length === 3) {
        myTrip.insertAdjacentHTML(
          "beforeend",
          `<li>
      <i class="fas fa-walking" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[0].type
      )} for ${tripData.plans[0].segments[0].times.durations.walking} minutes
      to stop #${tripData.plans[0].segments[0].to.stop.key} - ${
            tripData.plans[0].segments[0].to.stop.name
          }
      </li>
      <li>
      <i class="fas fa-bus" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[1].type
      )} the ${tripData.plans[0].segments[1].route.name} for ${
            tripData.plans[0].segments[1].times.durations.riding
          } minutes.
      </li>
      <li>
      <i class="fas fa-walking" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[2].type
      )} for ${tripData.plans[0].segments[2].times.durations.walking} minutes to
      your destination.
      </li>`
        );
      } else if (tripData.plans[0].segments.length === 4) {
        myTrip.insertAdjacentHTML(
          "beforeend",
          `<li>
      <i class="fas fa-walking" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[0].type
      )} for ${tripData.plans[0].segments[0].times.durations.walking} minutes
      to stop #${tripData.plans[0].segments[0].to.stop.key} - ${
            tripData.plans[0].segments[0].to.stop.name
          }
    </li>
    <li>
      <i class="fas fa-bus" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[1].type
      )} the ${tripData.plans[0].segments[1].route.name} for ${
            tripData.plans[0].segments[1].times.durations.riding
          } minutes.
    </li>
    <li>
    <i class="fas fa-bus" aria-hidden="true"></i>${capitalizeFirstLetter(
      tripData.plans[0].segments[2].type
    )} the ${tripData.plans[0].segments[2].route.name} for ${
            tripData.plans[0].segments[2].times.durations.riding
          } minutes.
  </li>
          <li>
      <i class="fas fa-walking" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[3].type
      )} for ${tripData.plans[0].segments[3].times.durations.walking} minutes to
      your destination.
    </li>`
        );
      } else if (tripData.plans[0].segments.length === 5) {
        myTrip.insertAdjacentHTML(
          "beforeend",
          `<li>
      <i class="fas fa-walking" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[0].type
      )} for ${tripData.plans[0].segments[0].times.durations.walking} minutes
      to stop #${tripData.plans[0].segments[0].to.stop.key} - ${
            tripData.plans[0].segments[0].to.stop.name
          }
    </li>
    <li>
      <i class="fas fa-bus" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[1].type
      )} the ${tripData.plans[0].segments[1].route.name} for ${
            tripData.plans[0].segments[1].times.durations.riding
          } minutes.
    </li>
    <li>
      <i class="fas fa-ticket-alt" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[2].type
      )} from stop
      #${tripData.plans[0].segments[2].from.stop.key} - ${
            tripData.plans[0].segments[2].from.stop.name
          } to stop #${tripData.plans[0].segments[2].to.stop.key} - ${
            tripData.plans[0].segments[2].to.stop.name
          }
    </li>
    <li>
      <i class="fas fa-bus" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[3].type
      )} the ${tripData.plans[0].segments[3].route.name} for ${
            tripData.plans[0].segments[3].times.durations.riding
          } minutes.
    </li>
    <li>
      <i class="fas fa-walking" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[4].type
      )} for ${tripData.plans[0].segments[4].times.durations.walking} minutes to
      your destination.
    </li>`
        );
      } else if (tripData.plans[0].segments.length === 6) {
        myTrip.insertAdjacentHTML(
          "beforeend",
          `<li>
      <i class="fas fa-walking" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[0].type
      )} for ${tripData.plans[0].segments[0].times.durations.walking} minutes
      to stop #${tripData.plans[0].segments[0].to.stop.key} - ${
            tripData.plans[0].segments[0].to.stop.name
          }
    </li>
    <li>
      <i class="fas fa-bus" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[1].type
      )} the ${tripData.plans[0].segments[1].route.name} for ${
            tripData.plans[0].segments[1].times.durations.riding
          } minutes.
    </li>
    <li>
      <i class="fas fa-bus" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[2].type
      )} the ${tripData.plans[0].segments[2].route.name} for ${
            tripData.plans[0].segments[2].times.durations.riding
          } minutes.
    </li>
    <li>
      <i class="fas fa-ticket-alt" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[3].type
      )} from stop
      #${tripData.plans[0].segments[3].from.stop.key} - ${
            tripData.plans[0].segments[3].from.stop.name
          } to stop #${tripData.plans[0].segments[3].to.stop.key} - ${
            tripData.plans[0].segments[3].to.stop.name
          }
    </li>
    <li>
      <i class="fas fa-bus" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[4].type
      )} the ${tripData.plans[0].segments[4].route.name} for ${
            tripData.plans[0].segments[4].times.durations.riding
          } minutes.
    </li>
    <li>
      <i class="fas fa-walking" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[5].type
      )} for ${tripData.plans[0].segments[5].times.durations.walking} minutes to
      your destination.
    </li>`
        );
      } else if (tripData.plans[0].segments.length === 7) {
        myTrip.insertAdjacentHTML(
          "beforeend",
          `<li>
      <i class="fas fa-walking" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[0].type
      )} for ${tripData.plans[0].segments[0].times.durations.walking} minutes
      to stop #${tripData.plans[0].segments[0].to.stop.key} - ${
            tripData.plans[0].segments[0].to.stop.name
          }
    </li>
    <li>
      <i class="fas fa-bus" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[1].type
      )} the ${tripData.plans[0].segments[1].route.name} for ${
            tripData.plans[0].segments[1].times.durations.riding
          } minutes.
    </li>
    <li>
      <i class="fas fa-ticket-alt" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[2].type
      )} from stop
      #${tripData.plans[0].segments[2].from.stop.key} - ${
            tripData.plans[0].segments[2].from.stop.name
          } to stop #${tripData.plans[0].segments[2].to.stop.key} - ${
            tripData.plans[0].segments[2].to.stop.name
          }
    </li>
    <li>
      <i class="fas fa-bus" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[3].type
      )} the ${tripData.plans[0].segments[3].route.name} for ${
            tripData.plans[0].segments[3].times.durations.riding
          } minutes.
    </li>
    <li>
      <i class="fas fa-ticket-alt" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[4].type
      )} from stop
      #${tripData.plans[0].segments[4].from.stop.key} - ${
            tripData.plans[0].segments[4].from.stop.name
          } to stop #${tripData.plans[0].segments[4].to.stop.key} - ${
            tripData.plans[0].segments[4].to.stop.name
          }
    </li>
    <li>
      <i class="fas fa-bus" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[5].type
      )} the ${tripData.plans[0].segments[5].route.name} for ${
            tripData.plans[0].segments[5].times.durations.riding
          } minutes.
    </li>
    <li>
      <i class="fas fa-walking" aria-hidden="true"></i>${capitalizeFirstLetter(
        tripData.plans[0].segments[6].type
      )} for ${tripData.plans[0].segments[6].times.durations.walking} minutes to
      your destination.
    </li>`
        );
      }
    } else {
      console.log('Error! Not Found')
    }
};