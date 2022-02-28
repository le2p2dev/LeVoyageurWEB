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
    GetMarkers: (data) => {

        const urlSuffix = '/marker/all';

		return fetch(urlPrefix+urlSuffix, {
            method: "GET",
            //headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + data.token },
            //body: JSON.stringify({"idTrip" : data.idTrip})
        })
        .then((res) => res.json())
       //.then((res)=>console.log("res=",res))
	
	}

};

export default listAPI;