const users = require("./user.js");

describe("Users creation", () => {
  describe("Username and password is given", () => {
    test("check 1", () => {
      let response = users.createUser("jest", "jest");
      expect(response.username).toBe("jest");
    });
  });
  describe("Username not given", () => {
    test("check 2", () => {
      let response = users.createUser("", "jest");
      expect(response.error).toBe("username or password not given");
    });
  });
  describe("Password not given", () => {
    test("Check 3", () => {
      let response = users.createUser("jest", "");
      expect(response.error).toBe("username or password not given");
    });
  });
});
