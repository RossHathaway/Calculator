import React from "react";

const NumberRow = props => (
  <div className="number-row">
    {props.numbers.map(function makeNumBtn(num) {
      return (
        <button
          className={`btn-number ${num === 0 ? "zero" : "not-zero"}`}
          onClick={function() {
            props.submitNumber(num);
          }}
          key={num}
        >
          {num}
        </button>
      );
    })}
  </div>
);

export default NumberRow;
