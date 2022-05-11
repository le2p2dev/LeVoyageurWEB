import { useQuery } from "react-query";
import listAPI from "../../api/listApi";
import { Grid } from "@mui/material";
import Day from "./Day";

const DayList = ({ idStep, poisForDay, removePoiOfDay, idTrip }) => {
  const { isLoading, data: days } = useQuery(idStep + "days", 
    () => listAPI.GetDaysfromStep({ idStep: idStep, tripId: idTrip })
  );

  if (isLoading) return "Loading ..."
  else
  return (
    <Grid container spacing={1}>
      {
      days.data.map((day) => {
        return(
          <Day
            removePoiOfDay={removePoiOfDay}
            poisForDay={poisForDay}
            key={day.id}
            id={day.id}
            number={day.number}
            idStep={idStep}
            idTrip={idTrip}
            POIs={day.poiList}
          />)
        
      })}
    </Grid>
  );
};

export default DayList;
