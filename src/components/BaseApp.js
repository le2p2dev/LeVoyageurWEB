import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import InsertDriveFile from "@mui/icons-material/InsertDriveFile";
import MapIcon from "@mui/icons-material/Map";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import listAPI from "../api/listApi";
import Map from "./map/Map";
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
              sx={{ width: navWidth, color: "#81C654" }}
              value="1"
              label="Map"
              icon={<MapIcon />}
            />
            <BottomNavigationAction
              sx={{ width: navWidth, color:"#1978CF" }}
              value="4"
              label="List"
              icon={<FormatListBulletedIcon />}
            />
            <BottomNavigationAction
              style={{ width: navWidth, color:"#1978CF" }}
              value="7"
              label="Journal"
              icon={<Message />}
            />
            <BottomNavigationAction
              style={{ width: navWidth, color:"#FF8C00"}}
              value="6"
              label="Members"
              icon={<People />}
            />
            <BottomNavigationAction
              sx={{ width: navWidth}}
              value="5"
              label="Files"
              icon={<InsertDriveFile />}
            />
          </BottomNavigation>
        </div>
        <div style={{ height: "88vh" }}>
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
    </>
  );
};

export default BaseApp;
