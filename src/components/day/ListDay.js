import React from "react";
import { useQuery } from "react-query";
import listAPI from "../../api/listApi";

const ListDay = ({ idStep, idTrip }) => {
  const { isLoading2, data: days } = useQuery(
    "getDayByStepid",
    () => {
      listAPI.GetDaysfromStep({ tripId: idTrip, idStep: idStep });
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  return <div>{idStep}</div>;
};

export default ListDay;
