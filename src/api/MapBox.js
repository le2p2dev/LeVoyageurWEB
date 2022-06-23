
const mapBoxToken = "&access_token=pk.eyJ1IjoiNTczZiIsImEiOiJja3l5Z2JoMWQwcnlsMnJzM2pxN29md2RnIn0.YnpLDRmULNCqnV2XLcmgCQ";
const urlPrefixGeocoding = "https://api.mapbox.com/geocoding/v5/mapbox";
const urlPrefixDirections = "https://api.mapbox.com/directions/v5/mapbox/";

const MapBox = {

    //*Get coords of place by search word input
    fetchCoords : (input) => {
        const userInputLocation = input.queryKey[1];
        const urlSettings = "limit=1&types=place";

        const url = urlPrefixGeocoding + ".places/" + userInputLocation + ".json?" + urlSettings + mapBoxToken;
        return fetch(url, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                return data;
        })
            .catch((error) => {
                return error;
        });
    },

    getRidesInfo : (A) => {

        const directionType = A.queryKey[1][0];
        const coords = A.queryKey[1][1];
        const coordsUrl = "/" + coords[0] + "%2C" + coords[1] + "%3B" + coords[2] + "%2C" + coords[3] ;
        const urlSuffix = "?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&";
        const url = urlPrefixDirections + directionType + coordsUrl + urlSuffix + mapBoxToken;
        return fetch(url, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data=",data);
                return data;
        })
            .catch((error) => {
                return error;
        });
    }

};

export default MapBox;