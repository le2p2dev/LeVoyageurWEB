const urlPrefix = "http://54.36.191.192:3630/api/";

const listAPI = {

	//*List of trips by user
	GetTrips: () => {
		const urlSuffix = "trip/";
		return fetch(urlPrefix + urlSuffix, {
		method: "GET",
		//headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data.token },
		//body: JSON.stringify({'search' : data.email})
		}).then((res) => res.json());
	},

	//*Trip for an ID
	GetTrip: (id) => {
		const urlSuffix = `trip/${id}`;

		return fetch(urlPrefix + urlSuffix, {
		method: "GET",
		//headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data.token },
		//body: JSON.stringify({'search' : data.email})
		}).then((res) => res.json());
	},


	CreateTrip: (data) => {
		const urlSuffix = "trip/";
		return fetch(urlPrefix + urlSuffix, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			title: data.tripName,
			description: data.description,
		}),
		}).then((res) => res.json());
	},

	//* List of steps by trip
	GetStepsFromTrip: (data) => {
		const urlSuffix = "step/trip/?tripId=${id}";

		return fetch(urlPrefix + urlSuffix, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + data.token,
		},
		body: JSON.stringify({ idTrip: data.idTrip }),
		}).then((res) => res.json());
	},

	//*Info of POI
	GetPOI: (id) => {
		const urlSuffix = `poi/${id}`;

		return fetch(urlPrefix + urlSuffix, {
		method: "GET",
		//headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data.token },
		//body: JSON.stringify({"idTrip" : data.idTrip})
		}).then((res) => res.json());
	},

	//*List of POI
	GetPOIs: () => {
		const urlSuffix = "poi/";

		return fetch(urlPrefix + urlSuffix, {
		method: "GET",
		//headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data.token },
		//body: JSON.stringify({"idTrip" : data.idTrip})
		}).then((res) => res.json());
	},

	//*List of POIs of a trip
	GetPOIsFromTrip: (id) => {
		const urlSuffix = `poi/trip/${id}`;

		return fetch(urlPrefix + urlSuffix, {
		method: "GET",
		//headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data.token },
		//body: JSON.stringify({"idTrip" : data.idTrip})
		}).then((res) => res.json());
	},

	//*List of POIs of a step
	GetStepsFromTrip: (id) => {
		const urlSuffix = `poi/step/?stepId=${id}`;

		return fetch(urlPrefix + urlSuffix, {
		method: "GET",
		//headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data.token },
		//body: JSON.stringify({"idTrip" : data.idTrip})
		}).then((res) => res.json());
	},

	CreatePOI: (data) => {
		const urlSuffix = "poi";
		return fetch(urlPrefix + urlSuffix, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			//title: data.title,
			//description: data.description,
			latitude: data.latitude,
			longitude: data.longitude,
			//poiType: data.poiType,
			tripId: data.tripId,


		}),
		}).then((res) => res.json());
	},

	UpdatePOI: (data) => {
		const urlSuffix = "poi";
		return fetch(urlPrefix + urlSuffix, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			id:data.id,
			title: data.title,
			description: data.description,
			latitude: data.latitude,
			longitude: data.longitude,
			poiType: data.poiType,
			tripId: data.idTrip,
			stepId: data.stepId

		}),
		}).then((res) => res.json());

	},

	CreateStep: (data) => {
		const urlSuffix = "step";
		return fetch(urlPrefix + urlSuffix, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			title: data.title,
			//description: data.description,
			latitude: data.latitude,
			longitude: data.longitude,
			//duration: data.duration,
			tripId: data.tripId,


		}),
		}).then((res) => res.json());
	},
	

	Login: (username, password) => {
		const urlSuffix = "login";
		return fetch("http://54.36.191.192:3630/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			username: username,
			password: password,
		}),
		}).then((res) => res.json());
	},

	Register: (username, password) => {
		const urlSuffix = "register";
		return fetch("http://54.36.191.192:3630/register", {
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