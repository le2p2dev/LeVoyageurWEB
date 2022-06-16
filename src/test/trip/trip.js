const trips = {
  createTrip: (title, description) => {
    if (!title || !description) {
      return {
        error: "title or description not given",
      };
    }
    return {
      id: 1,
      title: title,
      description: description,
    };
  },
};

module.exports = trips;
