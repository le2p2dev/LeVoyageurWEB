import React, {useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import PushPinIcon from '@mui/icons-material/PushPin';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

//import files*

import TripInfo from "./trip/TripInfo";
import listAPI from "../api/listApi";
import TripList from "./trip/TripList";
import LogoHeader from "./LogoHeader";
import Map from "./map/Map";
import NavigationMap from "./map/NavigationMap";
import StepList from "./step/StepList"

const BaseApp = () => {
  const { id } = useParams();


  const [value, setValue] = useState(0);

  const { isLoading, data } = useQuery(id + "trip", () => listAPI.GetTrip(id));

  if (isLoading) return "Loading..";

  return (
    <>
      <LogoHeader />

      <TripInfo
        name={data.response[0]?.title}
        desc={data.response[0]?.description}
        id={data.response[0]?.id}
      />
      <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
              setValue(newValue)
              }}
          >

          <BottomNavigationAction value = "1" label="Navigation" icon={<MapIcon />} />
          <BottomNavigationAction value = "2" label="POI" icon={<LocationOnIcon />} />
          <BottomNavigationAction value = "3" label="Step" icon={<PushPinIcon/>} />
          <BottomNavigationAction value = "4" label="List View" icon={<FormatListBulletedIcon/>} />

      </BottomNavigation>
      {value==4 ?       
      <StepList idTrip={id} titleTrip={data.response[0]?.title} />
      :
      <Map idTrip={id} mode = {value} />
      }
      



    </>
  );
};

export default BaseApp;
