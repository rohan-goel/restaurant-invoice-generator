import React,{useState} from "react";
import MenuItems from "../menuItems";
import Item from "./Item";
export default function Menu() {

  const [subTotal, setsubTotal] = useState(0)
  const [tip, setTip] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  function handleInputChange(e) {
    setTip(e.target.value);
  }
  
  function calculate() {
    setTotalAmount(subTotal + subTotal*(tip/100))
  }


  
  return (
    <div>
      {MenuItems.map((element) => (
        <Item data={element} key={element.description} subTotal={subTotal} setsubTotal={setsubTotal}/>
      ))}
      SubTotal Amount: {subTotal}
      <br />
      <label>
        Tip %
        <input type="number" value={tip} onChange={handleInputChange} />
      </label>
      <br />
      <button onClick={calculate}>Calculate</button>Total Amount: {totalAmount}
    </div>
  );
}
