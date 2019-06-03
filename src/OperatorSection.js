import React from "react";

const OperatorSection = function(props) {
  const operators = ["/", "x", "-", "+"];

  return (
    <div className="operators">
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
      <button
        className="btn-op"
        onClick={function() {
          props.calc();
        }}
      >
        =
      </button>
    </div>
  );
};

export default OperatorSection;
