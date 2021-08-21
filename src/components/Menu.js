import React,{useState} from "react";
import MenuItems from "../menuItems";
import Item from "./Item";
import easyinvoice from 'easyinvoice';


export default function Menu() {

  const [subTotal, setsubTotal] = useState(0)
  const [tip, setTip] = useState(10)
  const [totalAmount, setTotalAmount] = useState(0)
  const [products, setProducts] = useState([])

  function handleInputChange(e) {
    setTip(e.target.value);
  }
  
  function calculate() {
    setTotalAmount(subTotal + subTotal*(tip/100))
  }
  function addTipToProduct() {
    const productsListafterTip = products.map(element => {
      const newelement = element;
      newelement["tax"] = tip;
      return newelement;
    })
    setProducts(productsListafterTip);
    //now add productsListafterTip to data of html file

  }
  async function createpdf() {
    addTipToProduct();
    let data = {
      //"documentTitle": "RECEIPT", //Defaults to INVOICE
      //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
      "currency": "INR", //See documentation 'Locales and Currency' for more info
      "taxNotation": "TIP", //or gst
      "marginTop": 25,
      "marginRight": 25,
      "marginLeft": 25,
      "marginBottom": 25,
      "sender": {
        "company": "Delhi Fast Food",
        "address": "Sample Street 123",
        "zip": "1234 AB",
        "city": "New Delhi",
        "country": "India"
      },
      "client": {
        "company": "Client Corp",
        "address": "Clientstreet 456",
        "zip": "4567 CD",
        "city": "Clientcity",
        "country": "Clientcountry"
      },
      "invoiceNumber": "2021.0001",
      "invoiceDate": "1.1.2021",
      // "products": [
      //   {
      //     "description": "burger",
      //     "tax": 5,
      //     "price": 400,
      //     "quantity": "2",
      //   },
      //   {
      //     "quantity": "1",
      //     "description": "pizza",
      //     "price": 600,
      //     "tax": 5,
      //   }
      // ],
      "bottomNotice": "Thank You!!",

    };

    //add products array to data
    data["products"] = products;
    console.log(data);

    const result = await easyinvoice.createInvoice(data);                       
    easyinvoice.download('myInvoice.pdf', result.pdf);

  }
  //subTotal={subTotal} setsubTotal={setsubTotal}
  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Amount</th>
        </tr>
        {MenuItems.map((element, index) => (
        <tr><Item key={index} data={{element,subTotal,setsubTotal,products,setProducts,index}} /></tr>
      ))}
      </table>
      
      <>SubTotal Amount: {subTotal}</>
      
      <label>
        Tip %
        <input type="number" value={tip} onChange={handleInputChange} />
      </label>
      <button onClick={calculate} className="diplayblock">Calculate</button>Total Amount: {totalAmount}
      
      <button onClick={createpdf} className="diplayblock">Create PDF</button>
    </div>
  );
}
