import React from "react";

const NumberSection = props => {
  const numbers = ["9", "8", "7", "6", "5", "4", "3", "2", "1", ".", "0"];

  return (
    <div className="bottom-left-keys">
      {numbers.map(function makeNumBtn(num) {
        return (
          <button className="btn-number" onClick={props.submitNumber} key={num}>
            {num}
          </button>
        );
      })}
    </div>
  );
};

export default NumberSection;
