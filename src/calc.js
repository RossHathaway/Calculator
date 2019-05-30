import React from "react";
import ReactDOM from "react-dom";
import NumberRow from "./NumberRow";
import OperatorSection from "./OperatorSection";

export default class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNum: "",
      currentSign: "",
      prevNum: "",
      operation: ""
    };
  }
  render() {
    const { currentNum, currentSign, prevNum, operation } = this.state;
    return (
      <div className="calc">
        <div className="screen">2</div>
        <div className="keys">
          <div className="left-keys">
            <div className="top-left-keys">
              <button>{currentNum === "" ? "AC" : "C"}</button>
              <button>+/-</button>
              <button>%</button>
            </div>
            <NumberRow numbers={[7, 8, 9]} />
            <NumberRow numbers={[4, 5, 6]} />
            <NumberRow numbers={[1, 2, 3]} />
            <NumberRow numbers={[0, "."]} />
          </div>
          <div className="right-keys">
            <OperatorSection />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calc />, document.getElementById("root"));
