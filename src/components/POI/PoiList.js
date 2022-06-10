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
      <div style={{width:"100%"}}>
        {data.Pois?.map((poi) => {
          return (
              <CardPoi
                key={poi.id}
                poi={poi}
                openModal={openModal}
              />
          );
        })}
      </div>
    );
  else return "loading ...";
};

export default PoiList;
