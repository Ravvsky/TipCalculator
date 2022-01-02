import { useEffect, useState } from "react";
import PersonIcon from "../../img/icon-person.svg"
import Button from "../UI/Button/Button";
import classes from "./BillCalculation.module.css";
const BillCalculation = (props) => {
  const [bill, setBill] = useState("0.00");
  const [peopleCount, setPeopleCount] = useState("1");
  const [tipPercentage, setTipPercentage] = useState("0");
  const [customPercentage, setCustomPercentage] = useState("Custom");
  const [pressed, setPressed] = useState();
  const [error, setError] = useState();
  const [isError, setIsError] = useState("");
  const [isResetable, setIsResetable] = useState(false);

  const billHandler = (event) => {
    if (event.target.value < 0) {
      setError("Bill cannot be lower than $0.00");
      setBill("0");
      setIsError("bill");
    } else {
      setBill(event.target.value);
      setError(null);
    }
  };

  const peopleAmountHandler = (event) => {
    if (event.target.value < 1) {
      setError(`Can't be lower than one`);
      setPeopleCount("0");
      setIsError("people");
    } else {
      setPeopleCount(event.target.value);
    }
  };

  const tipPercentageHandler = (event) => {
    setTipPercentage(event.target.value);
    setPressed("pressed");
    setCustomPercentage("Custom");
  };

  const customPercentageHandler = (event) => {
    setCustomPercentage(event.target.value);
    setTipPercentage(event.target.value / 100);
    setPressed("pressed");
  };

  const customPercentageResetHandler = () => {
    if (customPercentage === "Custom") {
      setCustomPercentage("");
      setPressed("pressed");
      setTipPercentage(null);
    }

    if (customPercentage === "") {
      setCustomPercentage("Custom");
    }
  };

  useEffect(() => {
    console.log(props.resetData);
    setBill("0.00");
    setPeopleCount("1");
    setTipPercentage("0");
    setCustomPercentage("Custom");
    setPressed(null);
    setError(null);
  }, [props.resetData]);

  useEffect(() => {
    const data = {
      total: ((bill * (1 + Number(tipPercentage))) / peopleCount).toFixed(2),
      tip: ((Number(bill) * Number(tipPercentage)) / peopleCount)
        .toFixed(2)
        .toString(),
    };

    props.onBillChange(data);
  }, [bill, tipPercentage, peopleCount, props]);

  return (
    <form className={classes.bill}>
      <label>Bill {isError === "bill" && error}</label>
      <input
        onChange={billHandler}
        type="number"
        value={bill}
        step="0.01"
        min="0"
        className={error && classes.error}
      ></input>
      <label>Select Tip %</label>
      <div className={classes.buttons}>
        <Button
          value="0.05"
          onClick={tipPercentageHandler}
          className={tipPercentage === "0.05" && pressed}
        >
          5%
        </Button>
        <Button
          value="0.1"
          onClick={tipPercentageHandler}
          className={tipPercentage === "0.1" && pressed}
        >
          10%
        </Button>
        <Button
          value="0.15"
          onClick={tipPercentageHandler}
          className={tipPercentage === "0.15" && pressed}
        >
          15%
        </Button>
        <Button
          value="0.25"
          onClick={tipPercentageHandler}
          className={tipPercentage === "0.25" && pressed}
        >
          25%
        </Button>
        <Button
          value="0.50"
          onClick={tipPercentageHandler}
          className={tipPercentage === "0.50" && pressed}
        >
          50%
        </Button>
        <Button
          value={customPercentage}
          className={
            (customPercentage !== "Custom" && pressed) ||
            (customPercentage === "" && pressed)
          }
        >
          <input
            value={customPercentage}
            onChange={customPercentageHandler}
            onFocus={customPercentageResetHandler}
            onBlur={customPercentageResetHandler}
          ></input>
        </Button>
      </div>
      <label>Number of People {isError === "people" && error}</label>

      <input
        onChange={peopleAmountHandler}
        type="number"
        value={peopleCount}
        step="1"
        min="1"
        className={error && classes.error}
      ></input>
    </form>
  );
};

export default BillCalculation;
