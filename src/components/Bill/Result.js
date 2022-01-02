import { useEffect, useState } from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import classes from "./Result.module.css";
const Result = (props) => {
  const [total, setTotal] = useState("");
  const [tip, setTip] = useState("")
  useEffect(() => {
    setTotal(props.total);
    setTip(props.tip)
    //console.log(props.total);
  }, [props.total, props.tip]);


  const resetHandler = () => {


    props.onReset(true)
  }
  return (
    <Card className={`${classes.result}`}>
      <div>
        Tip Amount/person <h1>${tip}</h1>
      </div>
      <div>
        Total/person <h1>${total}</h1>
      </div>


      <Button onClick={resetHandler} className="reset">Reset</Button>
    </Card>
  );
};

export default Result;
