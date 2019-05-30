import React from "react";

const OperatorSection = function(props) {
  const operators = ["/", "x", "-", "+", "="];

  return (
    <div>
      {operators.map(function makeOpBtn(op) {
        return (
          <button className="btn-op" onClick={props.submitOp} key={op}>
            {op}
          </button>
        );
      })}
    </div>
  );
};

export default OperatorSection;
