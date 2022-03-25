import React, {useState } from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import PushPinIcon from '@mui/icons-material/PushPin';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import "./NavigationMap.css";

const NavigationMap = ({tabChange}) => {


    const [value, setValue] = useState(0);
    let setTabChange = (x) => {
        console.log("tabChange", tabChange);
        tabChange(x);
        console.log("here");
    }

    return(

        <div className="NavMap">
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue)
                    setTabChange(newValue); 
                    }}
                >

                <BottomNavigationAction value = "1" label="Navigation" icon={<MapIcon />} />
                <BottomNavigationAction value = "2" label="POI" icon={<LocationOnIcon />} />
                <BottomNavigationAction value = "3" label="Step" icon={<PushPinIcon/>} />
                <BottomNavigationAction value = "4" label="List View" icon={<FormatListBulletedIcon/>} />

            </BottomNavigation>
        </div>
    );



}

export default NavigationMap;