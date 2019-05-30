import React from "react";

const NumberRow = props => (
  <div className="bottom-left-keys">
    {props.numbers.map(function makeNumBtn(num) {
      return (
        <button
          className="btn-number"
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
