const trip = require("./trip.js");

describe("Trip creation", () => {
  describe("title and description given", () => {
    test("check 1", () => {
      let response = trip.createTrip("jest", "jest");
      expect(response.title).toBe("jest");
    });
  });
  describe("title and description not given", () => {
    test("check 2", () => {
      let response = trip.createTrip("", "");
      expect(response.error).toBe("title or description not given");
    });
  });
  describe("description not given", () => {
    test("check 3", () => {
      let response = trip.createTrip("jest", "");
      expect(response.error).toBe("title or description not given");
    });
  });

  describe("title not given", () => {
    test("check 4", () => {
      let response = trip.createTrip("", "jest");
      expect(response.error).toBe("title or description not given");
    });
  });
});
