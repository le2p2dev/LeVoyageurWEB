import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MapIcon from "@mui/icons-material/Map";
import DirectionsIcon from "@mui/icons-material/Directions";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import listAPI from "../api/listApi";
import Map from "./map/Map";
import Filter from "./map/Filter";
import { Message, People } from "@mui/icons-material";

const BaseApp = () => {
  const { id } = useParams();

  const [poisForDay, setPoisForDay] = useState([]);

  const addPoiToDay = (poi) => {
    setPoisForDay((oldList) => [...oldList, poi]);
  };

  const [navWidth, setNavWidth] = useState("5vw");

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div>
          <BottomNavigation
            sx={{
              width: navWidth,
              height: "85vh",
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
              sx={{ width: navWidth, color: "grey" }}
              value="1"
              label="Navigation"
              icon={<MapIcon />}
            />
            <BottomNavigationAction
              sx={{ width: navWidth, color: "red" }}
              value="2"
              label="POI"
              icon={<LocationOnIcon />}
            />
            <BottomNavigationAction
              sx={{ width: navWidth, color: "green" }}
              value="3"
              label="Step"
              icon={<DirectionsIcon />}
            />
            <BottomNavigationAction
              sx={{ width: navWidth }}
              value="4"
              label="List View"
              icon={<FormatListBulletedIcon />}
            />
            <BottomNavigationAction
              sx={{ width: navWidth}}
              value="5"
              label="Files"
              icon={<FileCopyIcon />}
            />
            <BottomNavigationAction
              style={{ width: navWidth}}
              value="6"
              label="Members"
              icon={<People />}
            />
            <BottomNavigationAction
              style={{ width: navWidth }}
              value="7"
              label="Journal"
              icon={<Message />}
            />
          </BottomNavigation>
        </div>
        <div style={{ height: "90vh" }}>
          <>
            <Map
              idTrip={id}
              mode={value}
              changeMode={setValue}
              addPoiToDay={addPoiToDay}
              poisForDay={poisForDay}
              removePoiOfDay={removePoiOfDay}
            />
          </>
        </div>
      </div>

      {/* <StepList idTrip={id} titleTrip={data.response[0]?.title} /> */}
    </>
  );
};

export default BaseApp;
