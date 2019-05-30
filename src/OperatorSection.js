import React from "react";

const OperatorSection = function(props) {
  const operators = ["/", "x", "-", "+", "="];

  return (
    <>
      {operators.map(function makeOpBtn(op) {
        return (
          <button className="btn-op" onClick={props.submitOp} key={op}>
            {op}
          </button>
        );
      })}
    </>
  );
};

export default OperatorSection;
