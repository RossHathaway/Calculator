import React from "react";
import ReactDOM from "react-dom";
import NumberRow from "./NumberRow";
import OperatorSection from "./OperatorSection";
import MathFunctions from "./MathFunctions";

export default class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNum: "",
      secondNum: "",
      firstNumActive: true,
      operation: "",
      display: ""
    };
    this.submitNumber = this.submitNumber.bind(this);
    this.clearScreen = this.clearScreen.bind(this);
    this.submitOperation = this.submitOperation.bind(this);
    this.calculate = this.calculate.bind(this);
    this.changeSign = this.changeSign.bind(this);
  }

  render() {
    const { firstNum, display } = this.state;
    return (
      <div className="calc">
        <div className="screen">{display}</div>
        <div className="keys">
          <div className="left-keys">
            <div className="top-left-keys">
              <button onClick={this.clearScreen}>
                {firstNum === "" ? "AC" : "C"}
              </button>
              <button onClick={this.changeSign}>+/-</button>
              <button>%</button>
            </div>
            <NumberRow numbers={[7, 8, 9]} submitNumber={this.submitNumber} />
            <NumberRow numbers={[4, 5, 6]} submitNumber={this.submitNumber} />
            <NumberRow numbers={[1, 2, 3]} submitNumber={this.submitNumber} />
            <NumberRow numbers={[0, "."]} submitNumber={this.submitNumber} />
          </div>
          <div className="right-keys">
            <OperatorSection
              submitOp={this.submitOperation}
              calc={this.calculate}
            />
          </div>
        </div>
      </div>
    );
  }

  submitNumber(num) {
    const { operation } = this.state;
    const keyToChange = operation === "" ? "firstNum" : "secondNum";
    const valToChange = this.state[keyToChange];
    const updatedNum =
      valToChange.includes(".") && num === "."
        ? valToChange
        : valToChange + num;

    this.setState({
      [keyToChange]: updatedNum,
      display: updatedNum
    });
  }

  clearScreen() {
    this.setState({
      firstNum: "",
      secondNum: "",
      firstNumActive: true,
      operation: "",
      display: ""
    });
  }

  submitOperation(op) {
    const { operation } = this.state;

    if (operation === "") {
      this.setState({ operation: op, firstNumActive: false });
    } else {
      this.calculate(op);
    }
  }

  calculate(op = "") {
    const { operation, firstNum, secondNum } = this.state;

    if (secondNum !== "") {
      const result = String(
        MathFunctions[operation](firstNum * 1, secondNum * 1)
      );
      this.setState({
        firstNum: result,
        secondNum: "",
        firstNumActive: false,
        operation: op,
        display: result
      });
    }
  }

  changeSign() {
    this.setState(state => {
      const keyToChange = state.firstNumActive ? "firstNum" : "secondNum";
      let updatedNum = null;

      if (state[keyToChange][0] === "-") {
        updatedNum = state[keyToChange].slice(1);
      } else {
        updatedNum = "-" + state[keyToChange];
      }

      return {
        [keyToChange]: updatedNum
      };
    });
  }
}

ReactDOM.render(<Calc />, document.getElementById("root"));
