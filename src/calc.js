import React from "react";
import ReactDOM from "react-dom";
import NumberSection from "./NumberSection";
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
            <NumberSection />
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
