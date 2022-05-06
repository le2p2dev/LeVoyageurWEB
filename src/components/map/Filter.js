import React, {useEffect, useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
// import Button from '@mui/material/Button';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import Grow from '@mui/material/Grow';
// import Paper from '@mui/material/Paper';
// import Popper from '@mui/material/Popper';
// import MenuList from '@mui/material/MenuList';
// import CheckIcon from '@mui/icons-material/Check';


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


    // const [open, setOpen] = React.useState(false);
    // const anchorRef = React.useRef(null);
  
    // const handleToggle = () => {
    //   setOpen((prevOpen) => !prevOpen);
    // };
  
    // const handleClose = (event) => {
    //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //     return;
    //   }
  
    //   setOpen(false);
    // };
  
    // function handleListKeyDown(event) {
    //   if (event.key === 'Tab') {
    //     event.preventDefault();
    //     setOpen(false);
    //   } else if (event.key === 'Escape') {
    //     setOpen(false);
    //   }
    // }
  
    // // return focus to the button when we transitioned from !open -> open
    // const prevOpen = React.useRef(open);
    // React.useEffect(() => {
    //   if (prevOpen.current === true && open === false) {
    //     anchorRef.current.focus();
    //   }
  
    //   prevOpen.current = open;
    // }, [open]);
  


    return(
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Filter</InputLabel>

            <Select
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



    
    //     <div>
    //         <Button
    //             ref={anchorRef}
    //             id="composition-button"
    //             aria-controls={open ? 'composition-menu' : undefined}
    //             aria-expanded={open ? 'true' : undefined}
    //             aria-haspopup="true"
    //             onClick={handleToggle}>
    //             Filter
    //         </Button>

    //         <Popper
    //             open={open}
    //             anchorEl={anchorRef.current}
    //             role={undefined}
    //             placement="bottom-start"
    //             transition
    //             disablePortal
    //         >
    //             {({ TransitionProps, placement }) => (
    //                 <Grow
    //                     {...TransitionProps}
    //                     style={{
    //                         transformOrigin:
    //                         placement === 'bottom-start' ? 'left top' : 'left bottom',
    //                     }}
    //                 >
    //                 <Paper>
    //                     <ClickAwayListener onClickAway={handleClose}>
    //                     <MenuList
    //                         autoFocusItem={open}
    //                         id="composition-menu"
    //                         aria-labelledby="composition-button"
    //                         onKeyDown={handleListKeyDown}
    //                     >
    //                         <MenuItem onClick={handleClose}> <CheckIcon/> All Businesses</MenuItem>
    //                         <MenuItem onClick={handleClose}>Restaurants</MenuItem>
    //                         <MenuItem onClick={handleClose}>Lodging</MenuItem>
    //                         <MenuItem onClick={handleClose}>Attractions</MenuItem>
    //                         <MenuItem onClick={handleClose}>Shopping</MenuItem>
    //                         <MenuItem onClick={handleClose}>Park</MenuItem>
    //                     </MenuList>
    //                     </ClickAwayListener>
    //                 </Paper>
    //             </Grow>
    //         )}
    //         </Popper>
    //   </div>
    );
}

export default Filter;