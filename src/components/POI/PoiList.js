import {useQuery} from "react-query";
import listAPI from "../../api/listApi";
import {Grid} from "@mui/material";
import CardPoi from "./CardPoi";




const PoiList = ({idDay,idStep,idTrip}) => {


   const {isLoading, data : POIs} = useQuery(idStep+"DayPOIs", () => listAPI.GetPOIsFromDay({idStep,idDay,tripId : idTrip}));


   if(!isLoading) return <Grid container spacing={1}>

        {POIs?.map( (poi) => {
           <CardPoi key={poi.id} id={poi.id} title={poi.title} description={poi.description} />
        })}
    </Grid>

else return "loading ..."
} 

export default PoiList
