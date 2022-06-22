import jwtDecode from "jwt-decode";

const urlPrefix = "http://levoyageur.mathieuv.pro:3630/api/";

const listAPI = {
    //Listes des voyages pour un utilisateurs
    getJournalEntries: (idTrip) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${idTrip}/journal`;

        return fetch(urlPrefix + urlSuffix, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            }, //body: JSON.stringify({"idTrip" : data.idTrip})
        }).then((res) => res.json());
    },
    postMessage: (idTrip, content, title) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${idTrip}/journal`;
        return fetch(urlPrefix + urlSuffix, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },

            body: JSON.stringify({
                title: title,
                content: content,
            }),
        }).then((res) => res.json());
    },

    DeleteStepFile: (idTrip, idStep, idFile) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${idTrip}/step/${idStep}/file/${idFile}`;

        return fetch(urlPrefix + urlSuffix, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },

    CreateStepFile: (idTrip, idStep, file) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${idTrip}/step/${idStep}/file`;

        const formData = new FormData();
        formData.append("image", file);

        return fetch(urlPrefix + urlSuffix, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: formData,
        }).then((res) => res.json());
    },

    getStep: (idTrip, idStep) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${idTrip}/step/${idStep}`;

        return fetch(urlPrefix + urlSuffix, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            }, //body: JSON.stringify({"idTrip" : data.idTrip})
        }).then((res) => res.json());
    },

    AddFileToPoi: (idTrip, idPoi, file) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${idTrip}/poi/${idPoi}/file`;

        const formData = new FormData();
        formData.append("image", file);

        return fetch(urlPrefix + urlSuffix, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: formData,
        }).then((res) => res.json());
    },

    deletePoiFile: (idTrip, idPoi, idFile) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${idTrip}/poi/${idPoi}/file/${idFile}`;

        return fetch(urlPrefix + urlSuffix, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },
    deleteTripFile: (idTrip, idFile) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${idTrip}/file/${idFile}`;

        return fetch(urlPrefix + urlSuffix, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },
    AddFileToTrip: (idTrip, file) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${idTrip}/file`;

        const formData = new FormData();
        formData.append("image", file);

        return fetch(urlPrefix + urlSuffix, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: formData,
        }).then((res) => res.json());
    },
    GetTrips: () => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip`;

        return fetch(urlPrefix + urlSuffix, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            //body: JSON.stringify({'search' : data.email})
        }).then((res) => res.json());
    },

    GetTrip: (id) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${id}`;

        return fetch(urlPrefix + urlSuffix, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((res) => res.json());
    },

    GetMembersFromTrip: (id) => {
        var idTrip = id.queryKey[1][0];
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${idTrip}/users`;
        return fetch(urlPrefix + urlSuffix, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((res) => res.json());
    },

    CreateTrip: (data) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip`;
        return fetch(urlPrefix + urlSuffix, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },

            body: JSON.stringify({
                title: data.tripName,
                description: data.description,
            }),
        }).then((res) => res.json());
    },

    UpdateTrip: (data) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${data.id}`;
        return fetch(urlPrefix + urlSuffix, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                title: data.tripName,
                description: data.description,
                backgroundUrl: data.background,
                newuser: data.newuser,
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                console.log("nok ");
                return res.status;
            }
        });
    },
    DeleteTrip: (id) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${id}`;
        return fetch(urlPrefix + urlSuffix, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });
    },
    //Listes des marker d'un voyage
    GetPOIsFromTrip: (id) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${id}/poi`;

        return fetch(urlPrefix + urlSuffix, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            //body: JSON.stringify({"idTrip" : data.idTrip})
        }).then((res) => res.json());
    },

    GetPOIsFromDay: (data) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${data.tripId}/step/${data.idStep}/day/${data.idDay}`;

        return fetch(urlPrefix + urlSuffix, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            //body: JSON.stringify({"idTrip" : data.idTrip})
        }).then((res) => res.json());
    },

    GetPoi: (tripId, idPoi) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${tripId}/poi/${idPoi}`;

        return fetch(urlPrefix + urlSuffix, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            //body: JSON.stringify({"idTrip" : data.idTrip})
        }).then((res) => res.json());
    },
    CreatePOI: (data) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${data.tripId}/poi`;
        return fetch(urlPrefix + urlSuffix, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                latitude: data.latitude,
                longitude: data.longitude,
            }),
        }).then((res) => {
            return res.json();
        });
    },

    UpdatePOI: (data) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${data.tripId}/poi/${data.id}`;
        return fetch(urlPrefix + urlSuffix, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                title: data.title,
                description: data.description,
                latitude: data.latitude,
                longitude: data.longitude,
                poiType: data.poiType,
                tripId: data.tripId,
                stepId: data.stepId,
                dayId: data.dayId,
            }),
        }).then((res) => res.json());
    },
    DeletePOI: (data) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${data.tripId}/poi/${data.id}`;
        return fetch(urlPrefix + urlSuffix, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((res) => res);
    },
    UpdateStep: (data) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${data.tripId}/step/${data.id}`;
        return fetch(urlPrefix + urlSuffix, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                title: data.title,
                description: data.description,
                latitude: data.latitude,
                longitude: data.longitude,
                duration: data.duration,
            }),
        }).then((res) => res.json());
    },
    DeleteStep: (data) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${data.tripId}/step/${data.id}`;
        return fetch(urlPrefix + urlSuffix, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((res) => res);
    },
    CreateStep: (data) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${data.tripId}/step`;
        return fetch(urlPrefix + urlSuffix, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                latitude: data.latitude,
                longitude: data.longitude,
            }),
        }).then((res) => res.json());
    },

    //list des steps d'un voyage
    GetStepsFromTrip: (id) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${id}/step`;

        return fetch(urlPrefix + urlSuffix, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            }, //body: JSON.stringify({"idTrip" : data.idTrip})
        }).then((res) => res.json());
    },

    //list des steps d'un voyage
    GetStepByID: (data) => {
        var tripId = data.queryKey[1][1];
        var stepId = data.queryKey[1][0];

        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${tripId}/step/${stepId}`;
        return fetch(urlPrefix + urlSuffix, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            }, //body: JSON.stringify({"idTrip" : data.idTrip})
        }).then((res) => res.json());
    },

    GetDaysfromStep: (data) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${data.tripId}/step/${data.idStep}/day`;
        return fetch(urlPrefix + urlSuffix, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            }, //body: JSON.stringify({"idTrip" : data.idTrip})
        }).then((res) => res.json());
    },

    GetRidesFromTrip: (tripId) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${tripId}/ride`;
        return fetch(urlPrefix + urlSuffix, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((res) => res.json());
    },

    UpdateRide: (data) => {
        const urlSuffix = `user/${
            jwtDecode(localStorage.getItem("token")).id
        }/trip/${data.tripId}/ride/${data.id}`;
        return fetch(urlPrefix + urlSuffix, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                estimation: data.time,
                travelType: data.directionType,
            }),
        }).then((res) => res.json());
    },

    Login: (username, password) => {
        const urlSuffix = "login";
        return fetch(urlPrefix + urlSuffix, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then((res) => res.json());
    },
    Register: (username, password) => {
        const urlSuffix = "signup";
        return fetch(urlPrefix + urlSuffix, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then((res) => res.json());
    },

    GetUser: () => {
        const urlSuffix = `user/${jwtDecode(localStorage.getItem("token")).id}`;
        return fetch(urlPrefix + urlSuffix, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((res) => res.json());
    },

    UpdateUser: (data) => {
        const formData = new FormData();
        if (data.username != null) {
            console.log("here");
            formData.append("username", data.username);
        }
        if (data.password != null) {
            console.log("here2");

            formData.append("password", data.password);
            formData.append("currentPassword", data.currentPassword);
        } else {
            console.log("here3");

            formData.append("image", data.image);
        }

        console.log(formData);
        const urlSuffix = `user/${jwtDecode(localStorage.getItem("token")).id}`;
        console.log(formData);
        fetch(urlPrefix + urlSuffix, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: formData,
            // formData
            // {
            //   username: data.username,
            //   password: data.password,
            //   avatar: data.avatar,
            // }
        }).then((res) => {
            console.log("res=", res);
            return res.json();
        });
    },

    DeleteUser: () => {
        const urlSuffix = `user/${jwtDecode(localStorage.getItem("token")).id}`;
        return fetch(urlPrefix + urlSuffix, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then((res) => res);
    },
};

export default listAPI;
