const poi = require("../poi/poi.js");

describe("Poi creation", () => {
  describe("poi creation", () => {
    test("check 1", () => {
      let response = poi.createPoi("jest");
      expect(response.title).toBe("jest");
    });
  });
  describe("poi creation no title", () => {
    test("check 2", () => {
      let response = poi.createPoi("");
      expect(response.error).toBe("title not given");
    });
  });

  describe("poi duplication", () => {
    test("check 3", () => {
      let response = poi.createPoi("jest");
      let d = poi.duplicatePoi(response);

      expect(d.length).toBe(2);
    });
  });
});
