import React from "react";
import ReactDOM from "react-dom";

export default class Calc extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>Hi</h1>;
  }
}

ReactDOM.render(<Calc />, document.getElementById("calc"));
