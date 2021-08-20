import React, { useState } from "react";

export default function Item(props) {
  const [dishquantity, setdishquantity] = useState(props.data.quantity);
  const [amount, setamount] = useState(0)


  function addItem() {
    setdishquantity((prevdishquantity) => prevdishquantity + 1);
    props.setsubTotal(props.subTotal + props.data.price);
    setamount(amount + props.data.price)
  }
  function removeItem() {
    if (dishquantity > 0) {
      setdishquantity((prevdishquantity) => prevdishquantity - 1);
      props.setsubTotal(props.subTotal - props.data.price);
      setamount(amount - props.data.price)
    }
  }



  return (
    <div>
      Name: {props.data.description}
      Price: {props.data.price} Quantity:
      <button onClick={removeItem}>-</button>
      {dishquantity} <button onClick={addItem}>+</button>
      Amount: {amount}
    </div>
  );
}
