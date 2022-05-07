import {useQuery} from "react-query";
import listAPI from "../../api/listApi";
import {Grid} from "@mui/material";
import CardPoi from "./CardPoi";




const PoiList = ({idDay,idStep,POIs}) => {


   // const {isLoading, data : POIs} = useQuery(idStep+"StepPOIs", () => listAPI.GetPOIsFromStep(idStep));


    return <Grid container spacing={1}>

        {POIs?.map( (poi) => {
           return  <CardPoi key={poi.id} id={poi.id} title={poi.title} description={poi.description} />
        })}
    </Grid>
}

export default PoiList
