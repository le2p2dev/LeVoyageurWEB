import { Button } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import listAPI from "../../api/listApi";
import DayList from "../day/DayList";
import ListDay from "../day/ListDay";

const ListView = ({openModal}) => {
  const { id } = useParams();

  const styles = {
    border: "solid 3px black",
    borderRadius: "15px",
    width: "92vw",
    height: "80vh",
    overflow: "hidden",
    overflowY: "scroll",
  };

  const { isLoading, data: Steps } = useQuery(id + "POIs", () =>
    listAPI.GetStepsFromTrip(id)
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div style={styles}>
        <h3> List View for steps</h3>
        {Steps.map((step, no) => {
          return (
            <div
              key={step.id}
              style={{
                margin: "10px",
                padding: "10px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              {step.title ? (
                <h3>
                  {no}. {step.title}
                </h3>
              ) : (
                <h3>{no}. no title</h3>
              )}
              <div>
                <p>{step.description}</p>{" "}
                <Button onClick={()=>openModal(step,"step")}>"""%</Button>
              </div>
              <ListDay openModal ={openModal} idStep={step.id} idTrip={id} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListView;
