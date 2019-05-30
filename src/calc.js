import React from "react";
import ReactDOM from "react-dom";
import NumberRow from "./NumberRow";
import OperatorSection from "./OperatorSection";

export default class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNum: "",
      sign: "",
      secondNum: "",
      operation: "",
      display: ""
    };
    this.setDisplay = this.setDisplay.bind(this);
    this.submitNumber = this.submitNumber.bind(this);
  }

  setDisplay(val) {
    this.setState({ display: val });
  }

  submitNumber(num) {
    if (this.state.operation === "") {
      this.setState(state => {
        return {
          firstNum: this.state.firstNum + num,
          display: this.state.firstNum + num
        };
      });
    }
  }

  render() {
    const { currentNum, currentSign, prevNum, operation, display } = this.state;
    return (
      <div className="calc">
        <div className="screen">{display}</div>
        <div className="keys">
          <div className="left-keys">
            <div className="top-left-keys">
              <button>{currentNum === "" ? "AC" : "C"}</button>
              <button>+/-</button>
              <button>%</button>
            </div>
            <NumberRow numbers={[7, 8, 9]} submitNumber={this.submitNumber} />
            <NumberRow numbers={[4, 5, 6]} submitNumber={this.submitNumber} />
            <NumberRow numbers={[1, 2, 3]} submitNumber={this.submitNumber} />
            <NumberRow numbers={[0, "."]} submitNumber={this.submitNumber} />
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
