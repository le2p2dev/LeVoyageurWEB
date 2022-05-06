import React, {useRef, useState } from "react";
import Avatar from '@mui/material/Avatar';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import "./Profile.css"
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LinkIcon from '@mui/icons-material/Link';
import PasswordIcon from '@mui/icons-material/Password';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const Profile = () => {

    const Input = styled('input')({
        display: 'none',
    });

    const [srcPath,setSrcPath] = useState("../assets/user.jpg");

    const  handleUploadBtnClick = async (event) => {

        const file = event.target.files[0];
        console.log("file = ",file);
        const url = await(readURL(file));
        console.log("url=",url)
        setSrcPath(url);
    }

    const readURL = file => {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = e => res(e.target.result);
            reader.onerror = e => rej(e);
            reader.readAsDataURL(file);
        });
    };

    return(
        <div id="profilePage">      

            <Box  id="img">
                <Grid 
                    container   
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-end"
                    rowSpacing={0} 
                    columnSpacing={{ xs: 1, sm: 2, md: 2 }} 
                >
                    <Grid item xs={3} md={12}>
                        <div id="avatarAndButton">
                        <Avatar
                            //alt='user avatar'
                            src={srcPath}
                            sx={{ width: 280, height: 280 }}
                        />  
                        <label id = "addImgBtn" htmlFor="contained-button-file">
                            <Input onChange = {handleUploadBtnClick}  accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button variant="contained" component="span"> <AddPhotoAlternateOutlinedIcon/> </Button>
                        </label>      
                        </div>     
                    </Grid>
                </Grid>
            </Box>
            
            <Box id = "userInfo">

                <div id="userNameTitle">
                    <div id="name"> Stef Sim </div>
                </div>
                
                <Grid 
                    container  
                    rowSpacing={0} 
                    columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                    id="infoContainer">
                    <Grid item xs={3} md={12}>
                        <span className="spanBox">
                            <LocationOnOutlinedIcon className="uIcons"/>
                            <div className="uInfo"> Strasbourg,France </div>
                        </span>
                    </Grid>
                    <Grid item xs={3} md={12}>
                        <span className="spanBox">
                            <LinkIcon className="uIcons"/>
                            <div className="uInfo"> stefTwitter.com </div>
                        </span>
                    </Grid>
                    <Grid item xs={3} md={12}>
                        <span className="spanBox">
                            <AlternateEmailIcon className="uIcons"/>
                            <div  className="uInfo"> stefssim@gmail.com </div>
                        </span>
                        
                    </Grid>
                    <Grid item xs={3} md={12}>
                        <span className="spanBox">
                            <PasswordIcon className="uIcons"/>
                            <div className="uInfo"> ******** </div>
                        </span>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Profile;