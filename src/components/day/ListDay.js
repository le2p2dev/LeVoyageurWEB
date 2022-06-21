import React from "react";
import { useQuery } from "react-query";
import listAPI from "../../api/listApi";
import PoiList from "../POI/PoiList";
import { Button, Grid, GridItem } from "@mui/material";

const ListDay = ({ idStep, idTrip, openModal }) => {
  const { isLoading, data: days } = useQuery(idStep + "days", () =>
    listAPI.GetDaysfromStep({ idStep: idStep, tripId: idTrip })
  );

  if (isLoading) {
    return <>Loading</>;
  } else
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflow: "auto",
        }}
      >
        {days?.map((day) => {
          return (
            <div
              key={day.id}
              style={{
                margin: "2px",
                boxShadow: "rgba(0, 0, 0, 0.40) 0px 2px 4px",
                borderRadius: "5px",
                textAlign: "center",
                minHeight: "150px",
                minWidth: "230px",
                maxWidth: "230px",
              }}
            >
              <p style={{ fontSize: 20 }}>Day {day.number}</p>
              {day.id ? (
                <PoiList
                  idDay={day.id}
                  idStep={idStep}
                  idTrip={idTrip}
                  openModal={openModal}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    );
};

export default ListDay;
