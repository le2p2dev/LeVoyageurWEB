import { Logout } from "@mui/icons-material";
import data from "./data.json";

const JsonData = {
  login: (username, password) => {
    const users = data["Users"];
    let valueR = false;

    users.forEach((user) => {
      if (user.password === password && user.username === username)
        valueR = true;
      return;
    });
    return valueR;
  },
};

export default JsonData;
