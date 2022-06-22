import React, { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import "./Profile.css";
import listAPI from "./api/listApi";
import Notification from "./components/map/Notification";

//#region MUI Imports
import TextField from "@mui/material/TextField";
import { Input } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import Slide from "@mui/material/Slide";
import { FileUpload } from "@mui/icons-material";

//#endregion

const Profile = () => {
    const navigate = useNavigate();

    // const Input = styled('input')({
    //     display: 'none',
    // });

    const queryClient = useQueryClient();
    const Disconnect = () => {
        window.localStorage.removeItem("isLogged");
        window.localStorage.removeItem("username");
        navigate("/signin");
    };

    //#region DATA
    const [selectedFile, setSelectedFile] = useState();

    const [srcPath, setSrcPath] = useState("../assets/user.jpg");
    const [srcUrl, setSrcURl] = useState("");
    const [modifyName, setModifyName] = useState(false);
    const [modifyPassword, setModifyPassword] = useState(false);
    const [urlPictureClick, setUrlPictureClick] = useState(false);
    const [urlBtn, setUrlBtn] = useState(false);
    const [username, setUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassowrd, setShowNewPassoword] = useState(false);
    const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);
    const [currentPswToSend, setCurrentPswToSend] = useState("");

    const [notificationTransition, setNotificationTransition] =
        useState(undefined);
    const [
        isOpenDeleteAccountNotification,
        setIsOpenDeleteAccountNotification,
    ] = useState(false);

    //#endregion

    //#region Handler functions

    const handleNewUsernameChange = (event) => {
        setNewUsername(event.target.value);
    };
    const handleChangeCurrentPassword = (event) => {
        setCurrentPassword(event.target.value);
    };

    const handleChangeNewPassowrd = (event) => {
        setNewPassword(event.target.value);
    };
    const handleChangeNewPassowrdConfirm = (event) => {
        setNewPasswordConfirm(event.target.value);
    };

    const handleSrcUrlChange = (event) => {
        setSrcURl(event.target.value);
    };
    const openDeleteAccountNotification = (NotificationTransition) => {
        setIsOpenDeleteAccountNotification(true);
        setNotificationTransition(() => NotificationTransition);
    };
    const closeDeleteAccountNotification = (NotificationTransition) => {
        console.log("here");
        setIsOpenDeleteAccountNotification(false);
        setNotificationTransition(() => NotificationTransition);
    };

    function TransitionUp(props) {
        return <Slide {...props} direction="up" />;
    }

    //#endregion

    //#region Show password handlers
    const handleClickShowCurrentPassword = () => {
        if (showCurrentPassword == false) {
            setShowCurrentPassword(true);
        } else setShowCurrentPassword(false);
    };

    const handleClickShowNewPassword = () => {
        if (showNewPassowrd == false) {
            setShowNewPassoword(true);
        } else setShowNewPassoword(false);
    };

    const handleClickShowNewPasswordConfirm = () => {
        if (showNewPasswordConfirm == false) {
            setShowNewPasswordConfirm(true);
        } else setShowNewPasswordConfirm(false);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //#endregion

    //#region Upload picture functions

    const handleUpload = (e) => {
        console.log(selectedFile);
        updateUser.mutate({
            currentPassword: currentPassword,
            image: selectedFile,
        });
        e.preventDefault();
    };
    const handleUploadBtnClick = async (event) => {
        const file = event.target.files[0];
        const url = await readURL(file);
        setSrcPath(url);
        updateUser.mutate({
            image: file,
            currentPassword: currentPassword,
        });
        //event.target.value = '';
    };

    const readURL = (file) => {
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.onload = (e) => res(e.target.result);
            reader.onerror = (e) => rej(e);
            reader.readAsDataURL(file);
        });
    };

    const handleUrlBtn = () => {
        if (urlBtn == false) {
            setUrlBtn(true);
        } else setUrlBtn(false);
    };

    //#endregion

    //#region UseQuerry GetUser
    const { isLoading: isLoadingUser, data: userData } = useQuery(
        "user",
        () => listAPI.GetUser(),
        {
            onSuccess: (data) => {
                setUrlPictureClick(true);
                setUsername(data.username);
                setSrcURl(data.avatar);
                setCurrentPswToSend(data.password);
            },
        }
    );

    //#endregion

    //#region UseMutate change user info
    const updateUser = useMutation(listAPI.UpdateUser, {
        onSuccess: () => queryClient.invalidateQueries("user"),
        onError: () => alert("Error updating profile"),
    });
    //#endregion

    //#region UseMutate delete user

    const deleteUser = useMutation(listAPI.DeleteUser, {
        onSucces: () => queryClient.invalidateQueries("user"),
        onError: () => alert("Error deleting account"),
    });

    //#endregion

    //#region Logical functions

    const modifyBtn = (toModify, ev) => {
        if (toModify == "name") {
            if (modifyName == false) {
                setModifyName(true);
            } else if (modifyName == true) {
                //use mutate to change name
                updateUser.mutate({
                    username: newUsername,
                    currentPassword: currentPswToSend,
                });
                setModifyName(false);
            }
        } else if (toModify == "password") {
            if (modifyPassword == false) {
                setModifyPassword(true);
            } else if (modifyPassword == true) {
                var passwordVerification = checkPasswordChange();

                if (passwordVerification == true) {
                    updateUser.mutate({
                        currentPassword: currentPassword,
                        password: newPassword,
                        username: username,
                    });
                    setModifyPassword(false);
                } else {
                    //show notification that passwords dont match
                    //block fields
                    console.log("passowrds dont match");
                }
            }
        } else return;
    };

    const onCancelClick = (toModify) => {
        if (toModify == "name") {
            setModifyName(false);
        } else if (toModify == "password") {
            setModifyPassword(false);
        } else return;
    };

    const checkPasswordChange = () => {
        console.log(newPassword);
        console.log(newPasswordConfirm);
        if (newPassword == newPasswordConfirm) {
            setDoPasswordsMatch(true);
            console.log("here match");
            return true;
        } else {
            setDoPasswordsMatch(false);
            console.log("password no match");
            return false;
        }
    };

    const onUrlPictureBtnClick = () => {
        updateUser.mutate({
            image: srcUrl,
        });
    };

    const deleteAccount = () => {
        console.log("deleteAccount in profile");
        deleteUser.mutate();
        openDeleteAccountNotification(TransitionUp);
        Disconnect();
    };

    //#endregion

    return (
        <div id="page">
            <div id="sidePannel">
                <div id="img">
                    <div id="avatarAndButton">
                        <Avatar
                            src={urlPictureClick ? srcUrl : srcPath}
                            sx={{ width: 280, height: 280 }}
                        />
                        <label id="addImgBtn" htmlFor="contained-button-file">
                            <input
                                onChange={handleUploadBtnClick}
                                accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                                style={{ display: "none" }}
                            />
                            <Button
                                onClick={() =>
                                    document
                                        .getElementById("contained-button-file")
                                        .click()
                                }
                                variant="contained"
                            >
                                {" "}
                                <AddPhotoAlternateOutlinedIcon />{" "}
                            </Button>
                        </label>
                    </div>
                </div>
                <div id="urlUpload"></div>
            </div>

            <div id="infoPannel">
                <header id="headerProfilePage">
                    <h1> Your personal information</h1>
                    <Button onClick={() => navigate("/trip/list")}>
                        My Trips
                    </Button>
                </header>
                <div className="infoBoxes">
                    <div>
                        <p> Name </p>
                        {modifyName == false ? (
                            <h2 id="uname"> {username} </h2>
                        ) : (
                            <div id="nameChange">
                                <TextField
                                    margin="dense"
                                    label="Name"
                                    type="text"
                                    value={newUsername}
                                    onChange={handleNewUsernameChange}
                                />
                                <Button
                                    onClick={() => onCancelClick("name")}
                                    className="modifyButton"
                                    variant="contained"
                                >
                                    {" "}
                                    Cancel{" "}
                                </Button>
                            </div>
                        )}
                    </div>
                    <Button
                        onClick={(ev) => modifyBtn("name", ev)}
                        className="modifyButton"
                        variant="contained"
                    >
                        {" "}
                        {modifyName == false ? "Modify" : "Save"}{" "}
                    </Button>
                </div>
                <div className="infoBoxes">
                    <div>
                        <p> Password </p>
                        {modifyPassword == false ? (
                            <h2> ******** </h2>
                        ) : (
                            <div id="passwordChange">
                                <OutlinedInput
                                    margin="dense"
                                    label="Current Password"
                                    name="Current PassWord"
                                    type={
                                        showCurrentPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={currentPassword}
                                    onChange={handleChangeCurrentPassword}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowCurrentPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showCurrentPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
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
                                    type={showNewPassowrd ? "text" : "password"}
                                    value={newPassword}
                                    onChange={handleChangeNewPassowrd}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowNewPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showNewPassowrd ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
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
                                    type={
                                        showNewPasswordConfirm
                                            ? "text"
                                            : "password"
                                    }
                                    value={newPasswordConfirm}
                                    onChange={handleChangeNewPassowrdConfirm}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowNewPasswordConfirm
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showNewPasswordConfirm ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                >
                                    <InputLabel>
                                        {" "}
                                        Confirm New Password{" "}
                                    </InputLabel>
                                </OutlinedInput>
                                <Button
                                    onClick={() => onCancelClick("password")}
                                    className="modifyButton"
                                    variant="contained"
                                >
                                    {" "}
                                    Cancel{" "}
                                </Button>
                            </div>
                        )}
                    </div>
                    <Button
                        onClick={(ev) => modifyBtn("password", ev)}
                        className="modifyButton"
                        variant="contained"
                    >
                        {" "}
                        {modifyPassword == false ? "Modify" : "Save"}{" "}
                    </Button>
                </div>
            </div>

            <div id="deleteAccount" onClick={deleteAccount}>
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
                <p> Delete Account </p>
                {isOpenDeleteAccountNotification ? (
                    <Notification
                        severity={"info"}
                        message="Account Deleted Succesfully"
                        open={isOpenDeleteAccountNotification}
                        close={closeDeleteAccountNotification}
                        transition={notificationTransition}
                    />
                ) : null}
            </div>
        </div>
    );
};

export default Profile;
