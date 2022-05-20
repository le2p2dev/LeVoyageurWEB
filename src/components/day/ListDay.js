import React from "react";
import { useQuery } from "react-query";
import listAPI from "../../api/listApi";
import PoiList from "../POI/PoiList";

const ListDay = ({ idStep, idTrip,openModal }) => {
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
              border: "2px solid black",
              borderRadius: "20px",
              textAlign: "center",
              height : "150px",
              width : "300px"
            }}
          >
            Jour {day.number}
            <PoiList idDay={day.id} idStep={idStep} idTrip={idTrip} openModal={openModal}/>
          </div>
        );
      })}
    </div>
  );
};

export default ListDay;
