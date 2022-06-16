const pois = {
  createPoi: (title) => {
    if (!title) {
      return {
        error: "title not given",
      };
    }
    return {
      id: 1,
      title: title,
    };
  },
  duplicatePoi: (poi) => {
    if (!poi) {
      return {
        error: "no poi given",
      };
    }
    return [poi, poi];
  },
};

module.exports = pois;
