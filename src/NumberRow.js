import React from "react";

const NumberRow = props => (
  <>
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
  </>
);

export default NumberRow;
