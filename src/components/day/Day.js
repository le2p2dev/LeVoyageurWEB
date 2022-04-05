import React from "react";
import PoiList from "../POI/PoiList";

const Day = ({id,idStep,POIs}) => {

    return <PoiList idDay={id} POIs={POIs} idStep={idStep}/>

}

export default Day;