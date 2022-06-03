import { useQuery } from "react-query";
import listAPI from "../../api/listApi";
import { Grid } from "@mui/material";
import CardPoi from "./CardPoi";

const PoiList = ({ idDay, idStep, idTrip,openModal }) => {
  const { isLoading, data } = useQuery(idDay + "DayPOIs", () =>
    listAPI.GetPOIsFromDay({ idStep, idDay, tripId: idTrip })
  );


  if (!isLoading)
    return (
      <Grid container spacing={1}>
        {data.Pois?.map((poi) => {
          return (
            <>
              <CardPoi
                key={poi.id}
                poi={poi}
                openModal={openModal}
              />
            </>
          );
        })}
      </Grid>
    );
  else return "loading ...";
};

export default PoiList;
