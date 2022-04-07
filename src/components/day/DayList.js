import {useQuery} from "react-query";
import listAPI from "../../api/listApi";
import {Grid} from "@mui/material";
import CardPoi from "./CardPoi";




const DayList = ({idStep,poisForDay}) => {


    //const {isLoading, data : days} = useQuery(idStep+"StepPOIs", () => listAPI.GetDaysfromStep(idStep));

    if( isLoading){
        return "loading"
    }

    return <Grid container spacing={1}>

        {days?.response.map( (day) => {
           return  <Day poisForDay={poisForDay} key={day.id} id={day.id} idStep={idStep} POIs={day.poiList} />
        })}
    </Grid>
}

export default PoiList