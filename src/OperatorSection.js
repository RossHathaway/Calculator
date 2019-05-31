import React from "react";

const OperatorSection = function(props) {
  const operators = ["/", "x", "-", "+"];

  return (
    <>
      {operators.map(function makeOpBtn(op) {
        return (
          <button
            className="btn-op"
            onClick={function() {
              props.submitOp(op);
            }}
            key={op}
          >
            {op}
          </button>
        );
      })}
      <button className="btn-op">{/*onClick= evaluate */}=</button>
    </>
  );
};

export default OperatorSection;
