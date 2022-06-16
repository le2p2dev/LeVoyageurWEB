const users = {
  createUser: (username, password) => {
    if (!username || !password) {
      return {
        error: "username or password not given",
      };
    }
    return {
      username: username,
      password: password,
    };
  },
};

module.exports = users;
