const urlPrefix = "http://54.36.191.192:3630/api";

const listAPI = {
  //Listes des voyages pour un utilisateurs
  GetTrips: () => {
    const urlSuffix = "/trip/all";

    return fetch(urlPrefix + urlSuffix, {
      method: "GET",
      //headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data.token },
      //body: JSON.stringify({'search' : data.email})
    }).then((res) => res.json());
  },
  //Voyage pour un id donné
  GetTrip: (id) => {
    const urlSuffix = `/trip/find?id=${id}`;

    return fetch(urlPrefix + urlSuffix, {
      method: "GET",
      //headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data.token },
      //body: JSON.stringify({'search' : data.email})
    }).then((res) => res.json());
  },

  CreateTrip: (data) => {
    const urlSuffix = "/trip/create";
    return fetch(urlPrefix + urlSuffix, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.tripName,
        description: data.description,
      }),
    }).then((res) => res.json());
  },
  //Listes des étapes d'un voyage
  GetSteps: (data) => {
    const urlSuffix = "";

    return fetch(urlPrefix + urlSuffix, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
      body: JSON.stringify({ idTrip: data.idTrip }),
    }).then((res) => res.json());
  },
  //Listes des marker
  GetMarkers: (data) => {
    const urlSuffix = "/marker/all";

    return fetch(urlPrefix + urlSuffix, {
      method: "GET",
      //headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data.token },
      //body: JSON.stringify({"idTrip" : data.idTrip})
    }).then((res) => res.json());
  },
  //Listes des marker d'un voyage
  GetMarkersFromTrip: (id) => {
    const urlSuffix = `/marker/findbytrip?id=${id}`;

    return fetch(urlPrefix + urlSuffix, {
      method: "GET",
      //headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data.token },
      //body: JSON.stringify({"idTrip" : data.idTrip})
    }).then((res) => res.json());
  },

  CreateMarker: (data) => {
    const urlSuffix = "/marker/create";
    console.log(data);
    return fetch(urlPrefix + urlSuffix, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pinNumber: data.pinNumber,
        title: data.title,
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
        tripId: data.idTrip,
      }),
    }).then((res) => res.json());
  },
  Login: (username, password) => {
    const urlSuffix = "/login";
    return fetch("http://54.36.191.192:3630/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((res) => res.json());
  },
};

export default listAPI;
