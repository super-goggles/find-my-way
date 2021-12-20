let myTrip = document.getElementById("my-trip");


export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const renderTripPlanning = (tripData) => {
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
    console.log("Error! Not Found");
  }
};
