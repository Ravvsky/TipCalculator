
import { useState } from "react";
import "./App.css";
import BillCalculation from "./components/Bill/BillCalculation";
import Result from "./components/Bill/Result";
import Card from "./components/UI/Card/Card";

const App = () => {

  const [total, setTotal] = useState('0.00')
  const [tip, setTip] = useState('0.00')
  const [resetData, setResetData] = useState(false)
  const billChangeHandler = (data) => {
   // console.log(data.total);
   setTotal(data.total)
   setTip(data.tip)
  }

  const resetHandler = (data) =>{
    setResetData(prevState => !prevState)
  }

  return (
    <Card className="main">
      <BillCalculation onBillChange={billChangeHandler} resetData={resetData && resetData}></BillCalculation>
      <Result total={total} tip={tip} onReset={resetHandler}></Result>
    </Card>
  );
};

export default App;
