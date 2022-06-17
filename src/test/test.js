let listAPI = require("../api/listApi");

test("test jest running", () => {
  let test = "test";

  expect(test).toBe("test");
});

test("Async data", async () => {
  const response = listAPI.GetTrips();

  console.log(response);
});
