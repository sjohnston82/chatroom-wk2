import React from "react";
import "../styles/CompletedOn.css";

const CompletedOn = (props) => {
  return (
    <div>
      <p id="completed-on">Completed on {props.data}</p>
    </div>
  );
};

export default CompletedOn;
