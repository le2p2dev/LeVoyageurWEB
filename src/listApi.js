const urlPrefix = 'http://mc.outronic.fr:3630/api';



const listAPI = {

    
    //Listes des voyages pour un utilisateurs
    GetTrips : () =>{

        const urlSuffix = '/trip/all';

        console.log(urlPrefix+urlSuffix)

       
    return fetch(urlPrefix+urlSuffix, {
        method: "GET"
        //headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data.token },
        //body: JSON.stringify({'search' : data.email})
    })
    .then(res => res.json())
    


    },
    //Listes des étapes d'un voyage
    GetSteps: (data) => {

        const urlSuffix = '';

		return fetch(urlPrefix+urlSuffix, {
            method: "POST",
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data.token },
            body: JSON.stringify({"idTrip" : data.idTrip})
        })
        .then((res) => res.json())
	
	},
    //Listes des marker
    GetMarkers: () => {

        const urlSuffix = '/marker/all';

		return fetch(urlPrefix+urlSuffix, {
            method: "GET",
            //headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data.token },
            //body: JSON.stringify({"idTrip" : data.idTrip})
        })
        .then((res) => res.json())
	
	},

    CreateMarker :(data) =>{

        const urlSuffix = '/marker/create';
        
        return fetch(urlPrefix+urlSuffix, {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                "pinNumber" : data.pinNumber,
                "Title" : data.title,
                "Description" : data.description,
                "Latitude" :data.latitude,
                "Longitude" : data.longitude})
        })
        .then((res) => res.json())
            

    },
    CreateTrip :(data) =>{

        const urlSuffix = '/trip/create';
        return fetch(urlPrefix+urlSuffix, {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                "tripName" : data.tripName,
                "description" : data.description
                })
        })
        .then((res) => res.json())

    }

};

export default listAPI;