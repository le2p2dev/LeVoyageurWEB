
const mapBoxToken = "&access_token=pk.eyJ1IjoiNTczZiIsImEiOiJja3l5Z2JoMWQwcnlsMnJzM2pxN29md2RnIn0.YnpLDRmULNCqnV2XLcmgCQ";
const urlPreFix = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

const MapBox = {

    //*Get coords of place by search word input
    fetchCoords : (input) => {
        const userInputLocation = input.queryKey[1];
        const urlSettings = "limit=1&types=place";

        const url = urlPreFix + userInputLocation + ".json?" + urlSettings + mapBoxToken;

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
    }

};

export default MapBox;