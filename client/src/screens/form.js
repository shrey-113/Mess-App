import React, { useContext, useState } from "react";
import "../assets/css/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "../services/authContext";
import { useNavigate } from "react-router-dom";

const OrderScreen = () => {
  const [milkQuantity, setMilkQuantity] = useState(0);
  const [curdQuantity, setCurdQuantity] = useState(0);
  const navigate = useNavigate();

  const { logout } = useContext(authContext);

  const apiurl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const decreaseQuantity = (itemId) => {
    if (itemId === "milk") {
      if (milkQuantity > 0) {
        setMilkQuantity(milkQuantity - 1);
      }
    } else if (itemId === "curd") {
      if (curdQuantity > 0) {
        setCurdQuantity(curdQuantity - 1);
      }
    }
  };

  const increaseQuantity = (itemId) => {
    if (itemId === "milk") {
      setMilkQuantity(milkQuantity + 1);
    } else if (itemId === "curd") {
      setCurdQuantity(curdQuantity + 1);
    }
  };

  const handleOrder = async (event) => {
    event.preventDefault();
    // Perform form submission logic here using milkQuantity and curdQuantity
    const data = { curdQuantity: curdQuantity, milkQuantity: milkQuantity };
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(`${apiurl}/order`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast("Order placed successfully!");
      } else {
        toast("Order placement failed!", {});
      }

      setMilkQuantity(0);
      setCurdQuantity(0);
    } catch (error) {
      toast(`Error occurred: ${error}`);
      // Handle error here
    }
  };

  return (
    <div className="container">
      <div className="order">
        <div className="order__content">
          <form className="order__form">
            <div>
              <h1 className="order__title">
                <span>Order</span>
              </h1>

              <p className="order__description">
                Add the number of Milk and Curd Packets you would like to get
              </p>
            </div>
            <div>
              <span>Registration Number</span>
              <br />
              <span>Name</span>
            </div>

            <div className="input_container">
              <label htmlFor="milk" className="order__label">
                Milk
              </label>
              <div className="number_inputs">
                <button onClick={() => decreaseQuantity("milk")} type="button">
                  -
                </button>
                <input
                  id="milk"
                  type="number"
                  min="0"
                  value={milkQuantity}
                  readOnly
                />
                <button onClick={() => increaseQuantity("milk")} type="button">
                  +
                </button>
              </div>
            </div>
            <div className="input_container">
              <label htmlFor="curd" className="order__label">
                Curd
              </label>
              <div className="number_inputs">
                <button onClick={() => decreaseQuantity("curd")} type="button">
                  -
                </button>
                <input
                  id="curd"
                  type="number"
                  min="0"
                  value={curdQuantity}
                  readOnly
                />
                <button onClick={() => increaseQuantity("curd")} type="button">
                  +
                </button>
              </div>
            </div>

            <div className="order__buttons">
              <button
                className="order__button"
                type="submit"
                onClick={handleOrder}
              >
                Submit
              </button>
            </div>
            <button
              className="order__button"
              onClick={() => {
                navigate("/orderhistory");
              }}
              style={{ margin: "0px auto" }}
            >
              Order History
            </button>
            <button
              className="order__button"
              onClick={logout}
              style={{ margin: "0px auto" }}
            >
              Log Out
            </button>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default OrderScreen;
