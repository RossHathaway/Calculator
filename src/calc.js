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
      display: "",
      firstPercent: false,
      secondPercent: false
    };
    this.submitNumber = this.submitNumber.bind(this);
    this.clearScreen = this.clearScreen.bind(this);
    this.submitOperation = this.submitOperation.bind(this);
    this.calculate = this.calculate.bind(this);
    this.changeSign = this.changeSign.bind(this);
    this.percent = this.percent.bind(this);
  }

  render() {
    const { firstNum, display } = this.state;
    return (
      <div className="calc">
        <div className="screen">
          <div className="history">1 + 1 history</div>
          <div className="result">{display}</div>
        </div>
        <div className="keys">
          <div className="left">
            <div className="top">
              <button onClick={this.clearScreen}>
                {firstNum === "" ? "AC" : "C"}
              </button>
              <button onClick={this.changeSign}>+/-</button>
              <button onClick={this.percent}>%</button>
            </div>
            <NumberRow numbers={[7, 8, 9]} submitNumber={this.submitNumber} />
            <NumberRow numbers={[4, 5, 6]} submitNumber={this.submitNumber} />
            <NumberRow numbers={[1, 2, 3]} submitNumber={this.submitNumber} />
            <NumberRow
              numbers={[0, "."]}
              submitNumber={this.submitNumber}
              className="zero-decimal"
            />
          </div>
          <div className="right">
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
    const { firstNumActive, firstPercent, secondPercent } = this.state;

    let percent, keyToChange;
    if (firstNumActive) {
      keyToChange = "firstNum";
      percent = firstPercent ? " %" : "";
    } else {
      keyToChange = "secondNum";
      percent = secondPercent ? " %" : "";
    }

    const valToChange = this.state[keyToChange];
    const updatedNum =
      valToChange.includes(".") && num === "."
        ? valToChange
        : valToChange + num;

    this.setState({
      [keyToChange]: updatedNum,
      display: updatedNum + percent
    });
  }

  clearScreen() {
    this.setState({
      firstNum: "",
      secondNum: "",
      firstNumActive: true,
      operation: "",
      display: "",
      firstPercent: false,
      secondPercent: false
    });
  }

  submitOperation(op) {
    const { firstNumActive, operation } = this.state;

    if (firstNumActive) {
      this.setState({ operation: op, firstNumActive: false });
    } else if (operation) {
      // if this is the second or farther in a chain of calculaions made without using = sign
      this.calculate(op);
    } else {
      // after equal button is used to do a calculation
      this.setState({ operation: op });
    }
  }

  calculate(op = "") {
    const {
      operation,
      firstNum,
      secondNum,
      firstPercent,
      secondPercent
    } = this.state;

    let firstNumConv = firstNum * 1;
    let secondNumConv = secondNum * 1;
    let updatedFirstPercent = false;

    if (firstNumConv + "" === "NaN" || secondNumConv + "" === "NaN") return;

    if (secondNum !== "") {
      if (firstPercent && secondPercent) {
        // regular calc
        updatedFirstPercent = true;
      } else if (firstPercent || secondPercent) {
        // convert num with percentage to the value that is given % of other number
        // use that calculated percentage of other number in calculation
        // firstPercent set to false
        if (firstPercent) {
          firstNumConv = (secondNumConv * firstNumConv) / 100;
        } else {
          secondNumConv = (firstNumConv * secondNumConv) / 100;
        }
      } else {
        // regular calc, firstPercent set to false
      }

      const result = String(
        MathFunctions[operation](firstNumConv, secondNumConv)
      );

      this.setState({
        firstNum: result,
        secondNum: "",
        firstNumActive: false,
        operation: op,
        display: result,
        firstPercent: updatedFirstPercent,
        secondPercent: false
      });
    } else if (firstPercent) {
      // calculate and set first percent to false after
      this.setState(state => {
        const result = String(state.firstNum / 100);
        return {
          firstNum: result,
          secondNum: "",
          firstNumActive: false,
          operation: "",
          display: result,
          firstPercent: false,
          secondPercent: false
        };
      });
    }
    // else do nothing
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
        [keyToChange]: updatedNum,
        display: updatedNum
      };
    });
  }

  percent() {
    this.setState(state => {
      const { firstNumActive, display } = state;
      const keyToChange = firstNumActive ? "firstPercent" : "secondPercent";
      return {
        [keyToChange]: !state[keyToChange],
        display: state[keyToChange]
          ? display.slice(0, display.length - 2)
          : display + " %"
      };
    });
  }
}

ReactDOM.render(<Calc />, document.getElementById("root"));
