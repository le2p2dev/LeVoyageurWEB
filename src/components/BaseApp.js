import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import PushPinIcon from "@mui/icons-material/PushPin";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Grid } from "@mui/material";

//import files*

import TripInfo from "./trip/TripInfo";
import listAPI from "../api/listApi";
import TripList from "./trip/TripList";
import LogoHeader from "./LogoHeader";
import Map from "./map/Map";
import NavigationMap from "./map/NavigationMap";
import StepListItems from "./step/StepListItems";
import Filter from "./map/Filter";
import ListView from "./map/ListView";

const BaseApp = () => {
  const { id } = useParams();

  const [poisForDay, setPoisForDay] = useState([]);
  const [poiTypes, setPoiTypes] = useState([
    { name: "Shopping", value: false, mapName: "poi.business.Shopping" },
    { name: "Attractions", value: false, mapName: "poi.attraction" },
    { name: "All Businesses", value: false, mapName: "poi.business" },
    { name: "Lodging", value: false, mapName: "poi.business.Lodging" },
    { name: "Park", value: false, mapName: "poi.park" },
    { name: "Place of worship", value: false, mapName: "poi.place_of_worship" },
    { name: "Medical", value: false, mapName: "poi.medical" },
    /*{name:"Restaurants and Bars",value:false,mapName:"poi.food_drink"}*/
  ]);

  const addPoiToDay = (poi) => {
    setPoisForDay((oldList) => [...oldList, poi]);
  };

  const handleCheckBoxPoi = (event, i) => {
    let poiTypesCopy = [...poiTypes];
    poiTypesCopy[i].value = poiTypesCopy[i].value === true ? false : true;
    setPoiTypes(poiTypesCopy);
  };

  const [navWidth, setNavWidth] = useState("10vh");

  const removePoiOfDay = (poiId) => {
    poiId == 0
      ? setPoisForDay([])
      : setPoisForDay((oldList) => oldList.filter((poi) => poi.id !== poiId));
  };

  const [value, setValue] = useState("1");

  const { isLoading, data } = useQuery(id + "trip", () => listAPI.GetTrip(id));

  if (isLoading) return "Loading..";

  return (
    <>
      {/* <TripInfo
		name={data.response[0]?.title}
		desc={data.response[0]?.description}
		id={data.response[0]?.id}
		/> */}

    
      

      

      <div
        style={{
          
          display: "flex",
          flexDirection: "row",
     
        }}
      >
        <div>
          <BottomNavigation
            style={{
              width: navWidth,
              height: "70vh",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              style={{ width: navWidth }}
              value="1"
              label="Navigation"
              icon={<MapIcon />}
            />
            <BottomNavigationAction
              style={{ width: navWidth }}
              value="2"
              label="POI"
              icon={<LocationOnIcon />}
            />
            <BottomNavigationAction
              style={{ width: navWidth }}
              value="3"
              label="Step"
              icon={<PushPinIcon />}
            />
            <BottomNavigationAction
              style={{ width: navWidth }}
              value="4"
              label="List View"
              icon={<FormatListBulletedIcon />}
            />
          </BottomNavigation>
        </div>
        <div style={{  height: "90vh" }}>
        
            <><Filter checkBoxPOI={handleCheckBoxPoi} poiTypes={poiTypes}></Filter>
            <Map
              idTrip={id}
              mode={value}
              changeMode={setValue}
              addPoiToDay={addPoiToDay}
              poisForDay={poisForDay}
              removePoiOfDay={removePoiOfDay}
              poiTypes={poiTypes}
              
            />
            </>
          
        </div>
      </div>

      {/* <StepList idTrip={id} titleTrip={data.response[0]?.title} /> */}
    </>
  );
};

export default BaseApp;
