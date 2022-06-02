import { Button } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import listAPI from "../../api/listApi";
import ListDay from "../day/ListDay";

const ListView = ({openModal}) => {
  const { id } = useParams();

  const { isLoading, data: Steps } = useQuery(id + "POIs", () =>
    listAPI.GetStepsFromTrip(id)
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div style={{
            width: "95vw",
            height: "90vh",
            overflow: "hidden",
            overflowY: "scroll",}}>
        <h3 style={{paddingLeft: "1%",}}>List View</h3>
        {Steps.map((step, no) => {
          return (
            <div
              key={step.id}
              style={{
                margin: "1%",
                padding: "1%",
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              {step.title ? (
                <h3>
                  Step {no} : {step.title}
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
