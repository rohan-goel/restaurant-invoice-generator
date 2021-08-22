import React, { useState, useEffect } from "react";

export default function Item(props) {
  const index = props.data.index;
  const products = props.data.products;
  const setProducts = props.data.setProducts;
  const element = props.data.element;

  const [dishquantity, setDishquantity] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    let updatedproductlist = [...products];
    updatedproductlist[index] = {
      description: element.description,
      price: element.price,
      quantity: dishquantity,
    };
    setProducts(updatedproductlist);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dishquantity]);

  function addItem() {
    setDishquantity((prevdishquantity) => prevdishquantity + 1);
    props.data.setsubTotal(props.data.subTotal + props.data.element.price);
    setAmount(amount + props.data.element.price);
  }
  function removeItem() {
    if (dishquantity > 0) {
      setDishquantity((prevdishquantity) => prevdishquantity - 1);
      props.data.setsubTotal(props.data.subTotal - props.data.element.price);
      setAmount(amount - props.data.element.price);
    }
  }

  return (
    <>
      <td>{props.data.element.description}</td>
      <td>{props.data.element.price}</td>
      <button onClick={removeItem}>-</button>
      {dishquantity}
      <button onClick={addItem}>+</button>
      <td className="total">{amount}</td>
    </>
  );
}
