import React, { useState, useEffect } from "react";
import { View } from "./components/View";

// getting the values of local storage
const getDatafromLS = () => {
  const data = localStorage.getItem("products");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const App = () => {
  const [products, setproducts] = useState(getDatafromLS());

  // input
  const [productid, setproductid] = useState("");
  const [sellingprice, setsellingprice] = useState("");
  const [productname, setproductname] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  // form submit

  const handleAddproductsubmit = (e) => {
    e.preventDefault();
    // creating an object

    let obj = {
      productid,
      sellingprice,
      productname
    };
    setproducts([...products, obj]);
    setTotalPrice((prev) => prev + Number(sellingprice));

    ///////////////////////////////////////////////////////////////
    setproductid("");
    setsellingprice("");
    setproductname("");
  };

  // delete
  const deleteproduct = (productname) => {
    var product = products.find((prod) => prod.productname === productname);

    const filteredproducts = products.filter((element, index) => {
      return element.productname !== productname;
    });
    setproducts(filteredproducts);
    ////////////////////////////////////////////////////////////
    setTotalPrice((prev) => prev - product.sellingprice);
  };

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleRemoveAll = () => {
    setproducts([]);
    setTotalPrice(0);
  };

  return (
    <div className="wrapper">
      <h1>Seller's admin page with total stock value</h1>

      <div className="main">
        <div className="form-container">
          <form
            autoComplete="off"
            className="form-group"
            onSubmit={handleAddproductsubmit}
          >
            <label>Product Id</label>
            <input
              type="number"
              className="form-control"
              required
              onChange={(e) => setproductid(e.target.value)}
              value={productid}
            ></input>
            <br></br>
            <label>Selling Price</label>
            <input
              type="number"
              className="form-control"
              required
              onChange={(e) => setsellingprice(e.target.value)}
              value={sellingprice}
            ></input>
            <br></br>
            <label>Product Name</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setproductname(e.target.value)}
              value={productname}
            ></input>
            <br></br>
            <button type="submit" className="btn btn-success btn-md">
              ADD
            </button>
          </form>

          <h1>Products</h1>
          <h3>Total Value Worth of product rs.{totalPrice}</h3>
        </div>

        <div className="view-container">
          {products.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>productname#</th>
                      <th>productid</th>
                      <th>sellingprice</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <View products={products} deleteproduct={deleteproduct} />
                  </tbody>
                </table>
              </div>
              <button
                className="btn btn-danger btn-md"
                onClick={handleRemoveAll}
              >
                Remove All
              </button>
            </>
          )}
          {products.length < 1 && <div>No products are added yet</div>}
        </div>
      </div>
    </div>
  );
};

export default App;
