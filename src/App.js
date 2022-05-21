import './App.css';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';

function App() {
  const [preState, setPreState] = useState("");
  const [currState, setCurrState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  useEffect(() => {
    setInput(currState);
  }, [currState]);

  useEffect(() => {
    setInput("0")
  }, [])

  const inputNum = (e) => {
    if (currState.includes(".") && e.target.innerText === ".") return

    if (total) {
      setPreState("");
    }
    currState ? setCurrState((pre) => pre + e.target.innerText) : setCurrState(e.target.innerText);
    setTotal(false);
  }

  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (currState === "") return;
    if (preState != "") {
      equals();
    }
    else {
      setPreState(currState);
      setCurrState("");
    }
  }

  const equals = (e) => {
    if (e.target.innerText === "=") {
      setTotal(true);
    }
    let result;
    switch (operator) {
      case "+":
        result = parseFloat(preState) + parseFloat(currState);
        break;
      case "-":
        result = parseFloat(preState) - parseFloat(currState);
        break;
      case "X":
        result = parseFloat(preState) * parseFloat(currState);
        break;
      case "/":
        result = parseFloat(preState) / parseFloat(currState);
        break;
      default:
        return;
    }
    setInput("");
    setPreState(String(result));
    setCurrState("");
  }

  const minusPlus = () => {
    if (currState.charAt(0) === "-") {
      setCurrState(currState.substring(1));
    } else {
      setCurrState("-" + currState);
    }
  }

  const percent = () => {
    preState
      ? setCurrState(String((parseFloat(currState) / 100) * preState))
      : setCurrState(String(parseFloat(currState) / 100));
  }

  const reset = () => {
    setPreState("");
    setCurrState("");
    setInput("0");
    setTotal(false);
  }


  return (
    <div className="container">
      <div className="wrapper">
        <div className='screen'>{input !== "" || input === "0" ? (
          <NumberFormat
            value={input}
            displayType={"text"}
            thousandSeparator={true}
          />
        ) : (
          <NumberFormat
            value={preState}
            displayType={"text"}
            thousandSeparator={true}
          />
        )}
        </div>
      <div className="btn light-gray" onClick={reset}>AC</div>
      <div className="btn light-gray" onClick={percent}>%</div>
      <div className="btn light-gray" onClick={minusPlus}>-/+</div>
      <div className="btn orange" onClick={operatorType}>/</div>
      <div className="btn" onClick={inputNum}>7</div>
      <div className="btn" onClick={inputNum}>8</div>
      <div className="btn" onClick={inputNum}>9</div>
      <div className="btn orange" onClick={operatorType}>X</div>
      <div className="btn" onClick={inputNum}>4</div>
      <div className="btn" onClick={inputNum}>5</div>
      <div className="btn" onClick={inputNum}>6</div>
      <div className="btn orange" onClick={operatorType}>-</div>
      <div className="btn" onClick={inputNum}>1</div>
      <div className="btn" onClick={inputNum}>2</div>
      <div className="btn" onClick={inputNum}>3</div>
      <div className="btn orange" onClick={operatorType}>+</div>
      <div className="btn" onClick={inputNum}>0</div>
      <div className="btn orange" onClick={inputNum}>.</div>
      <div className="btn orange" onClick={equals}>=</div>



    </div>
    </div >
  );
}

export default App;
