import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import "./Profile.css"
import TextField from '@mui/material/TextField';


const Profile = () => {


    const Input = styled('input')({
        display: 'none',
    });

    const [srcPath,setSrcPath] = useState("../assets/user.jpg");
    const [modifyName,setModifyName] = useState(false);
    const [modifyPassword,setModifyPassword] = useState(false);
    const [userInfo,setUserInfo] = useState();
    const [username,setUsername] = useState('stef');
    const [currentPassword,setCurrentPassword]=useState('');
    const [newPassword,setNewPassword]=useState('');
    const [newPasswordConfirm,setNewPasswordConfirm]=useState('');
    const [doPasswordsMatch,setDoPasswordsMatch] = useState(false);

    const handleChangeCurrentPassword = (event) => {
        setCurrentPassword(event.target.value);
    }

    const handleChangeNewPassowrd =(event) => {
        setNewPassword(event.target.value);
    }
    const handleChangeNewPassowrdConfirm = (event) => {
        setNewPasswordConfirm(event.target.value);
    }

    const checkPasswordChange = () => {

        console.log(newPassword);
        console.log(newPasswordConfirm);
        if(newPassword == newPasswordConfirm){
            setDoPasswordsMatch(true);
            console.log("here");
        }
        else {
            setDoPasswordsMatch(false);
        }

    }


    const  handleUploadBtnClick = async (event) => {

        const file = event.target.files[0];
        const url = await(readURL(file));
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
   
    

    const modifyBtn = (toModify,ev) => {
    
        
        if ((toModify == "name") && (modifyName==false)){
            setModifyName(true);
        }
        else if(modifyName==true){
            //use mutate to change name
        }
        else if((toModify == "password") && (modifyPassword==false)){
            setModifyPassword(true);
        }
        else if(modifyPassword==true){
            checkPasswordChange();
            console.log("do they?",doPasswordsMatch);
            if(doPasswordsMatch==true){
                //use mutate to change psw
                console.log("oke");
            }
            else{
                //show notification that passwords dont match
                console.log("noke");
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

    return(

        <div id = "page">
            <div id="sidePannel">
                <div id="img">
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
                </div>
            </div>

            <div id = "infoPannel">
                <header id="headerProfilePage">
                    <h1> Your personal information</h1>
                </header>
                <div className = "infoBoxes">
                    <div>
                        <p> {username} </p>
                        {
                            (modifyName==false)? <p> info from back end  </p> :
                            <div>
                                 <TextField
                                    label="Name"
                                    type="text"
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
                            (modifyPassword==false)? <p> ********  </p> :
                            <div id = "passwordChange">
                                <TextField
                                    label="Current Password"
                                    type="password"
                                    value={currentPassword}
                                    onChange={handleChangeCurrentPassword}
                                />
                                <TextField
                                    label="New Password"
                                    type="password"
                                    value={newPassword}
                                    onChange={handleChangeNewPassowrd}
                                />
                                <TextField
                                    label="Confirm New Password"
                                    type="password"
                                    value={newPasswordConfirm}
                                    onChange={handleChangeNewPassowrdConfirm}
                                />
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