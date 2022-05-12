import React from "react";
import { useQuery } from "react-query";
import listAPI from "../../api/listApi";
import PoiList from "../POI/PoiList";

const ListDay = ({ idStep, idTrip }) => {
  const { isLoading, data: days } = useQuery(idStep + "days", () =>
    listAPI.GetDaysfromStep({ idStep: idStep, tripId: idTrip })
  );

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {days.data.map((day) => {
        return (
          <div
            key={day.id}
            style={{
              margin: "2px",
              border: "2px solid red",
              textAlign: "center",
            }}
          >
            Jour {day.number}
            <PoiList idDay={day.id} idStep={idStep} idTrip={idTrip} />
          </div>
        );
      })}
    </div>
  );
};

export default ListDay;
