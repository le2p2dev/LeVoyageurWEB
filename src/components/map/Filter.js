import React, {useEffect, useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


const Filter = ({checkBoxPOI,poiTypes}) => {


    const ITEM_HEIGHT = 100;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

   
    const [value,setValue] = useState([]);

    return(<div style={{ position: "absolute", bottom: "2%", left: "5.5%", zIndex: 2}}>
        <FormControl size="small" sx={{ width: 200 }}>
            <InputLabel id="demo-multiple-checkbox-label">Filter</InputLabel>

            <Select
            style={{
                backgroundColor: "white"}}
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={value}
                input={<OutlinedInput label="Filter"/>}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >

            {
                poiTypes.map(
                    (e,i) => {
                        return(
                            <MenuItem key={i} value={e.name}>
                                <Checkbox onChange = {(ev) => checkBoxPOI(ev,i)} checked={e.value} />
                                <ListItemText primary={e.name} />
                            </MenuItem>
                        )
                    }
                )
            }
            

            </Select>   
        </FormControl>
        </div>
    );
}

export default Filter;