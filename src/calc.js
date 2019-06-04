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
      // history: ""
    };
    this.submitNumber = this.submitNumber.bind(this);
    this.clearScreen = this.clearScreen.bind(this);
    this.submitOperation = this.submitOperation.bind(this);
    this.calculate = this.calculate.bind(this);
    this.changeSign = this.changeSign.bind(this);
    this.percent = this.percent.bind(this);
  }

  render() {
    const {
      firstNum,
      secondNum,
      operation,
      display,
      firstPercent,
      secondPercent
      // history
    } = this.state;
    return (
      <div className="calc">
        <div className="screen">
          <div className="history">
            {/* {history}{" "} */}
            {`${firstNum}${
              firstPercent ? " %" : ""
            } ${operation} ${secondNum} ${secondPercent ? " % " : ""}`}
          </div>
          <div className="result">{display}</div>
        </div>
        <div className="keypad">
          <button onClick={this.clearScreen} className="top">
            {firstNum === "" ? "AC" : "C"}
          </button>
          <button onClick={this.changeSign} className="top">
            +/-
          </button>
          <button onClick={this.percent} className="top">
            %
          </button>
          <NumberRow numbers={[7, 8, 9]} submitNumber={this.submitNumber} />
          <NumberRow numbers={[4, 5, 6]} submitNumber={this.submitNumber} />
          <NumberRow numbers={[1, 2, 3]} submitNumber={this.submitNumber} />
          <NumberRow
            numbers={[0, "."]}
            submitNumber={this.submitNumber}
            className="zero-decimal"
          />

          <OperatorSection
            submitOp={this.submitOperation}
            calc={this.calculate}
          />
        </div>
      </div>
    );
  }

  submitNumber(num) {
    const {
      firstNumActive,
      operation,
      firstPercent,
      secondPercent
    } = this.state;

    let percent, keyToChange;
    if (firstNumActive) {
      keyToChange = "firstNum";
      percent = firstPercent ? " %" : "";
    } else if (operation === "") {
      // after calculation has been performed
      // a new number is being submitted, so need to clear old numbers
      this.setState({
        firstNum: num,
        secondNum: "",
        firstNumActive: true,
        operation: "",
        display: num,
        firstPercent: false,
        secondPercent: false
      });
      // do not complete anything more in this function
      return;
    } else {
      keyToChange = "secondNum";
      percent = secondPercent ? " %" : "";
    }
    const valToChange = this.state[keyToChange];
    const updatedNum =
      valToChange.includes(".") && num === "."
        ? valToChange
        : valToChange + num;

    this.setState(state => {
      return {
        [keyToChange]: updatedNum,
        display: updatedNum + percent
        // history: state.history + updatedNum + percent
      };
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
      // history: ""
    });
  }

  submitOperation(op) {
    const { secondNum, firstNumActive, operation } = this.state;

    if (firstNumActive) {
      this.setState(state => {
        return {
          operation: op,
          firstNumActive: false,
          display: op
          // history: state.history + ` ${op} `
        };
      });
    } else if (operation && secondNum !== "") {
      // if this is the second or farther in a chain of calculaions made without using = sign
      this.calculate(op);
    } else {
      // after equal button is used to do a calculation
      this.setState(state => {
        return {
          operation: op,
          display: op
          // history: state.history + ` ${op} `
        };
      });
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
        // (A% + B = (A / 100 * B) + B)
        // firstPercent set to false
        if (firstPercent) {
          firstNumConv = (secondNumConv * firstNumConv) / 100;
        } else {
          secondNumConv = (firstNumConv * secondNumConv) / 100;
        }
      } else {
        // regular calc - firstPercent set to false
      }

      const result = String(
        MathFunctions[operation](firstNumConv, secondNumConv)
      );
      // if (secondNum !== "")
      this.setState(state => {
        return {
          firstNum: result,
          secondNum: "",
          firstNumActive: false,
          operation: op,
          display: result + (updatedFirstPercent ? " %" : ""),
          firstPercent: updatedFirstPercent,
          secondPercent: false
          // history: `${state.history} = ${result}
          // ${result} ${op}
          // `
        };
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
          // history: state.history + " = " + result
        };
      });
    }
    // else do nothing
  }

  changeSign() {
    const {
      secondNum,
      firstNumActive,
      operation,
      firstPercent,
      secondPercent
    } = this.state;

    this.setState(state => {
      let keyToChange, updatedNum, percent;

      if (
        (!firstNumActive && operation === "" && secondNum === "") ||
        state.firstNumActive
      ) {
        // after calculation has been performed, change sign of result, which is stored in firstNum
        // or if user is still entering first number
        keyToChange = "firstNum";
        percent = firstPercent ? " %" : "";
      } else {
        keyToChange = "secondNum";
        percent = secondPercent ? " %" : "";
      }

      if (state[keyToChange][0] === "-") {
        updatedNum = state[keyToChange].slice(1);
      } else {
        updatedNum = "-" + state[keyToChange];
      }

      return {
        [keyToChange]: updatedNum,
        display: updatedNum + percent
      };
    });
  }

  percent() {
    const {
      secondNum,
      firstNumActive,
      operation,
      display,
      firstPercent,
      secondPercent
    } = this.state;

    this.setState(state => {
      let keyToChange, updatedNum, percent;

      if (
        (!firstNumActive && operation === "" && secondNum === "") ||
        state.firstNumActive
      ) {
        // after calculation has been performed, toggle result's %.
        // result is stored in firstNum
        // this is also for when user is still entering first number
        keyToChange = "firstPercent";
        percent = firstPercent ? "" : " %";
      } else {
        keyToChange = "secondPercent";
        percent = secondPercent ? "" : " %";
      }

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
