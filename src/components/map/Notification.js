import React from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


  
const Notification = ({severity,message,open,close,transition}) => {



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            close();
            return;
        };

        close();
    };

    
    return(
        <div>
            <Snackbar 
                open={open}  
                onClose={handleClose}
                autoHideDuration={3000}
                TransitionComponent={transition}
                key={transition ? transition.name : ''}
                anchorOrigin={{ vertical:'bottom', horizontal:'right' }}

                >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}> {message} </Alert>
            </Snackbar>

        </div>
    );
}

export default Notification;