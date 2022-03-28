import React from "react";

const TripInfo = ({ id, name, desc }) => {
  return (
    <>
      <h1>
        {" "}
        {name}| {desc}
      </h1>
    </>
  );
};

export default TripInfo;
