import React, { useState } from "react";
import { useQuery,useQueryClient,useMutation } from "react-query";
import "./Profile.css"
import listAPI from "./api/listApi";


//#region MUI Imports
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';


//#endregion

const Profile = () => {

    // const Input = styled('input')({
    //     display: 'none',
    // });

    const queryClient = useQueryClient();


    //#region DATA
    const [srcPath,setSrcPath] = useState("../assets/user.jpg");
    const [srcUrl,setSrcURl] = useState('');
    const [modifyName,setModifyName] = useState(false);
    const [modifyPassword,setModifyPassword] = useState(false);
    const [urlPictureClick,setUrlPictureClick] = useState(false);
    const [urlBtn,setUrlBtn] = useState(false);
    const [username,setUsername] = useState('');
    const [currentPassword,setCurrentPassword]=useState('');
    const [newUsername,setNewUsername]=useState('');
    const [newPassword,setNewPassword]=useState('');
    const [newPasswordConfirm,setNewPasswordConfirm]=useState('');
    const [doPasswordsMatch,setDoPasswordsMatch] = useState(false);
    const [showCurrentPassword,setShowCurrentPassword] = useState(false);
    const [showNewPassowrd,setShowNewPassoword] = useState(false);
    const [showNewPasswordConfirm,setShowNewPasswordConfirm] = useState(false);

    //#endregion

    //#region Handler functions

    const handleNewUsernameChange = (event) => {
        setNewUsername(event.target.value);
    }
    const handleChangeCurrentPassword = (event) => {
        setCurrentPassword(event.target.value);
    }

    const handleChangeNewPassowrd =(event) => {
        setNewPassword(event.target.value);
    }
    const handleChangeNewPassowrdConfirm = (event) => {
        setNewPasswordConfirm(event.target.value);
    }

    const handleSrcUrlChange = (event) => {
        setSrcURl(event.target.value);
    }


    //#endregion

    //#region Show password handlers
    const handleClickShowCurrentPassword = () => {
        if(showCurrentPassword==false){
            setShowCurrentPassword(true);
        }
        else setShowCurrentPassword(false);
    };

    const handleClickShowNewPassword = () => {
        if(showNewPassowrd==false){
            setShowNewPassoword(true);
        }
        else setShowNewPassoword(false);
    };

    const handleClickShowNewPasswordConfirm = () => {
        if(showNewPasswordConfirm==false){
            setShowNewPasswordConfirm(true);
        }
        else setShowNewPasswordConfirm(false);
    };
  
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    

    //#endregion
    
    //#region Upload picture functions
    const  handleUploadBtnClick = async (event) => {

        const file = event.target.files[0];
        const url = await(readURL(file));
        setSrcPath(url);

        event.target.value = '';

    }

    const readURL = file => {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = e => res(e.target.result);
            reader.onerror = e => rej(e);
            reader.readAsDataURL(file);
        });
    };
   
    //#endregion

    //#region UseQuerry GetUser
    const { isLoading: isLoadingUser, data: userData } = useQuery(
        "user",
        ()=>listAPI.GetUser(),
        {
            onSuccess: (data) => {
                setUsername(data.username);
                setCurrentPassword(data.password);
            }
        }
    );

    //#endregion

    //#region UseMutate change user info 
    const updateUser = useMutation(listAPI.UpdateUser, {
        onSuccess: () => queryClient.invalidateQueries("user"),
        onError: () => alert("Error updating profile")
    });
    //#endregion

    //#region Logical functions

    const handleUrlBtn = () => {

        if(urlBtn==false){
            setUrlBtn(true)
        }
        else setUrlBtn(false);
    }

    const modifyBtn = (toModify,ev) => {
    
        if (toModify == "name"){
            if(modifyName==false){
                setModifyName(true);
            }
            else if(modifyName==true){
                //use mutate to change name
                updateUser.mutate({
                    username:newUsername
                })
                setModifyName(false);
            }
         
        } 
        else if(toModify == "password"){
            if(modifyPassword==false){
                setModifyPassword(true);
            }
            else if(modifyPassword==true){
                var passwordVerification = checkPasswordChange();

                if(passwordVerification==true){
                    updateUser.mutate({
                        password:newPassword
                    })
                    setModifyPassword(false);

                }
                else{
                    //show notification that passwords dont match
                    //block fields
                    console.log("passowrds dont match")
                }
            }

        }
    
        else return;
    }

    const onCancelClick = (toModify) => {

        if (toModify == "name"){
            setModifyName(false);
        }
        else if(toModify == "password"){
            setModifyPassword(false);
        }
        else return;
    }

    const checkPasswordChange = () => {

        console.log(newPassword);
        console.log(newPasswordConfirm);
        if(newPassword == newPasswordConfirm){
            setDoPasswordsMatch(true);
            console.log("here match");
            return true;
        }
        else {
            setDoPasswordsMatch(false);
            console.log("password no match")
            return false;
        }

    }

    const onUrlPictureBtnClick = () => {

        if(urlPictureClick == false){
            setUrlPictureClick(true);
            //mutate url
            updateUser.mutate({
                avatar:srcUrl
            })

        }
        else{
            setUrlPictureClick(false);
        }
    }

    

    //#endregion


    return(

        <div id = "page">
            <div id="sidePannel">
                <div id="img">
                    <div id="avatarAndButton">
                        <Avatar
                            src={(urlPictureClick)? srcUrl : srcPath}
                            sx={{ width: 280, height: 280 }}
                        />  
                        <label id = "addImgBtn" htmlFor="contained-button-file">
                            <input onChange = {handleUploadBtnClick}  accept="image/*" id="contained-button-file" multiple type="file" style={{display:"none"}} />
                            <Button variant="contained"> <AddPhotoAlternateOutlinedIcon/> </Button>
                        </label>      
                    </div>     
                </div>
                <div id="urlUpload">
                    <Button variant="contained" onClick = {handleUrlBtn}> {(urlBtn)? "Close" : "Upload By URL" } </Button> 
                    {
                        (urlBtn)? 
                            <div id="urlSEction">

                                <TextField 
                                id="outlined-basic" 
                                label="Image URL" 
                                variant="outlined" 
                                value={srcUrl}
                                onChange={handleSrcUrlChange}
                                />
                                <Button
                                    onClick = {onUrlPictureBtnClick}
                                    variant="contained"
                                >
                                    Change Picture
                                </Button>
                            </div>
                            :null
                    }
                    

                </div>

            </div>

            <div id = "infoPannel">
                <header id="headerProfilePage">
                    <h1> Your personal information</h1>
                </header>
                <div className = "infoBoxes">
                    <div>
                        <p> Name </p>
                        {
                            (modifyName==false)? <h2 id="uname"> {username}  </h2> :
                            <div id = "nameChange">
                                 <TextField
                                    margin="dense"
                                    label="Name"
                                    type="text"
                                    value={newUsername}
                                    onChange={handleNewUsernameChange}
                                />
                                <Button onClick = {() => onCancelClick("name") }className = "modifyButton" variant="contained" >  Cancel  </Button>


                            </div>
                        }
                    </div>
                    <Button onClick = {(ev) => modifyBtn("name",ev)} className = "modifyButton" variant="contained" > {modifyName==false? "Modify" : "Save"}  </Button>

                </div>
                <div className = "infoBoxes">
                    <div>
                        <p> Password </p>
                        {
                            (modifyPassword==false)? <h2> ********  </h2> :
                            <div id = "passwordChange">
                                <OutlinedInput
                                    margin="dense"
                                    label="Current Password"
                                    name="Current PassWord"
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    value={currentPassword}
                                    onChange={handleChangeCurrentPassword}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowCurrentPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                >

                                    <InputLabel> Current Password </InputLabel> 
                                </OutlinedInput>

                                <OutlinedInput
                                    required
                                    label="New Passowrd"
                                    margin="dense"
                                    type={showNewPassowrd ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={handleChangeNewPassowrd}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowNewPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showNewPassowrd ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                >
                                    <InputLabel> New Password </InputLabel> 
                                </OutlinedInput>

                                <OutlinedInput
                                    required
                                    margin="dense"
                                    label="Confirm New Password"
                                    type={showNewPasswordConfirm ? 'text' : 'password'}
                                    value={newPasswordConfirm}
                                    onChange={handleChangeNewPassowrdConfirm}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowNewPasswordConfirm}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showNewPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                >
                                    <InputLabel> Confirm New Password </InputLabel> 

                                </OutlinedInput>
                                <Button onClick = {() => onCancelClick("password") }className = "modifyButton" variant="contained" >  Cancel  </Button>


                            </div>
                        }
                    </div>
                    <Button onClick = {(ev) => modifyBtn("password",ev)}  className = "modifyButton" variant="contained" >  {modifyPassword==false? "Modify" : "Save"}  </Button>

                </div> 

            </div>
        </div>
    )
}

export default Profile;