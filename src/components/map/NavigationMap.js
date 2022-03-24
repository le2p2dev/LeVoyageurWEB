import React, {useState } from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const NavigationMap = () => {


    const [value, setValue] = React.useState(0);
    return(

        <div>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                setValue(newValue); 
            }}>
            <BottomNavigationAction label="Navigation" icon={<RestoreIcon />} />
            <BottomNavigationAction label="POI" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Etape" icon={<LocationOnIcon />} />
            <BottomNavigationAction label="List View" icon={<LocationOnIcon />} />
            </BottomNavigation>
        </div>

    );

}

export default NavigationMap;