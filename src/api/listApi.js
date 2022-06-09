import jwtDecode from "jwt-decode";

const urlPrefix = "http://levoyageur.mathieuv.pro:3630/api/";

const listAPI = {
  //Listes des voyages pour un utilisateurs
  GetTrips: () => {
    const urlSuffix = `user/${
      jwtDecode(localStorage.getItem("token")).id
    }/trip`;

    return fetch(urlPrefix + urlSuffix, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      //body: JSON.stringify({'search' : data.email})
    }).then((res) => res.json());
  },

  GetTrip: (id) => {
    const urlSuffix = `user/${
      jwtDecode(localStorage.getItem("token")).id
    }/trip/${id}`;

    return fetch(urlPrefix + urlSuffix, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      //body: JSON.stringify({'search' : data.email})
    }).then((res) => res.json());
  },

  CreateTrip: (data) => {
    const urlSuffix = `user/${
      jwtDecode(localStorage.getItem("token")).id
    }/trip`;
    return fetch(urlPrefix + urlSuffix, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },

      body: JSON.stringify({
        title: data.tripName,
        description: data.description,
      }),
    }).then((res) => res.json());
  },
  
  UpdateTrip: (data) => {
    const urlSuffix = `user/${
      jwtDecode(localStorage.getItem("token")).id
    }/trip/${data.id}`;
    return fetch(urlPrefix + urlSuffix, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },

      body: JSON.stringify({
        title: data.tripName,
        description: data.description,
      }),
    }).then((res) => res.json());
  },
  DeleteTrip: (id) => {
    const urlSuffix = `user/${
      jwtDecode(localStorage.getItem("token")).id
    }/trip/${id}`;
    return fetch(urlPrefix + urlSuffix, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
  },
  //Listes des marker d'un voyage
  GetPOIsFromTrip: (id) => {
    const urlSuffix = `user/${
      jwtDecode(localStorage.getItem("token")).id
    }/trip/${id}/poi`;

    return fetch(urlPrefix + urlSuffix, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      //body: JSON.stringify({"idTrip" : data.idTrip})
    }).then((res) => res.json());
  },

  GetPOIsFromDay: (data) => {
    const urlSuffix = `user/${
      jwtDecode(localStorage.getItem("token")).id
    }/trip/${data.tripId}/step/${data.idStep}/day/${data.idDay}`;

		return fetch(urlPrefix + urlSuffix, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
		//body: JSON.stringify({"idTrip" : data.idTrip})
		}).then((res) => res.json());
	
	},


  CreatePOI: (data) => {
    const urlSuffix = `user/${
      jwtDecode(localStorage.getItem("token")).id
    }/trip/${data.tripId}/poi`;
    return fetch(urlPrefix + urlSuffix, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        latitude: data.latitude,
        longitude: data.longitude,
      }),
    }).then((res) => {
      return res.json();
    });
  },

  UpdatePOI: (data) => {
    const urlSuffix = `user/${
      jwtDecode(localStorage.getItem("token")).id
    }/trip/${data.tripId}/poi/${data.id}`;
    return fetch(urlPrefix + urlSuffix, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
        poiType: data.poiType,
        tripId: data.tripId,
        stepId: data.stepId,
        dayId: data.dayId,
      }),
    }).then((res) => res.json());
  },
  DeletePOI: (data) => {
    const urlSuffix = `user/${
      jwtDecode(localStorage.getItem("token")).id
    }/trip/${data.tripId}/poi/${data.id}`;
    return fetch(urlPrefix + urlSuffix, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => res);
  },
  UpdateStep: (data) => {
    const urlSuffix = `user/${
      jwtDecode(localStorage.getItem("token")).id
    }/trip/${data.tripId}/step/${data.id}`;
    return fetch(urlPrefix + urlSuffix, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
        duration: data.duration,
      }),
    }).then((res) => res.json());
  },
  DeleteStep: (data) => {
    const urlSuffix = `user/${
      jwtDecode(localStorage.getItem("token")).id
    }/trip/${data.tripId}/step/${data.id}`;
    return fetch(urlPrefix + urlSuffix, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => res);
  },
  CreateStep: (data) => {
    const urlSuffix = `user/${
      jwtDecode(localStorage.getItem("token")).id
    }/trip/${data.tripId}/step`;
    return fetch(urlPrefix + urlSuffix, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        latitude: data.latitude,
        longitude: data.longitude,
      }),
    }).then((res) => res.json());
  },

  //list des steps d'un voyage
  GetStepsFromTrip: (id) => {
    const urlSuffix = `user/${
      jwtDecode(localStorage.getItem("token")).id
    }/trip/${id}/step`;

    return fetch(urlPrefix + urlSuffix, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      }, //body: JSON.stringify({"idTrip" : data.idTrip})
    }).then((res) => res.json());
  },

  GetDaysfromStep: (data) => {
    const urlSuffix = `user/${
      jwtDecode(localStorage.getItem("token")).id
    }/trip/${data.tripId}/step/${data.idStep}/day`;
    return fetch(urlPrefix + urlSuffix, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      }, //body: JSON.stringify({"idTrip" : data.idTrip})
    }).then((res) => res.json());
  },

  Login: (username, password) => {
    const urlSuffix = "login";
    return fetch(urlPrefix + urlSuffix, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((res) => res.json());
  },
  Register: (username, password) => {
    const urlSuffix = "signup";
    console.log(urlPrefix + urlSuffix);
    return fetch(urlPrefix + urlSuffix, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((res) => res.json());
  },

  GetUser: () => {
    const urlSuffix = `user/${jwtDecode(localStorage.getItem("token")).id}`;
    return fetch(urlPrefix + urlSuffix, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("token"),
		}, 
		}).then((res) => res.json());
  },

  UpdateUser: (data) => {
	  console.log(data);
    const urlSuffix = `user/${jwtDecode(localStorage.getItem("token")).id}`;
    return fetch(urlPrefix + urlSuffix, {
		method: "PUT",
      	headers: {
			"Content-Type": "application/json",
		  	Authorization: "Bearer " + localStorage.getItem("token"),
      	},
      	body: JSON.stringify({
        username: data.username,
        password: data.password,
		avatar:data.avatar
      }),
    }).then((res) => res.json());
  },

};

export default listAPI;
