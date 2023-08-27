import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const OrderHistory = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  const apiurl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${apiurl}/user/getorders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
        }
      } catch (error) {
        toast(`Error fetching orders: ${error}`);
      }
    };

    fetchOrders();
  }, [token, apiurl]);

  return (
    <div className="container">
      <div className="order-history">
        <div className="order-history__content">
          <h1 className="order-history__title">Order History</h1>

          {orders.map((order, index) => (
            <div className="order-card" key={index}>
              <div className="order-card__header">
                <span className="order-card__date">
                  Date: {order.Order_Date.slice(0, 10)} <br /> Time:{" "}
                  {order.Order_Time}
                </span>
              </div>
              <div className="order-card__body">
                <p className="order-card__item">
                  Order Type: {order.Order_Type}
                </p>
                <p className="order-card__item">
                  Quantity: {order.Order_Qty} units
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="order__button"
          onClick={() => {
            navigate("/order");
          }}
          style={{ margin: "0px auto" }}
        >
          Back
        </button>
      </div>
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default OrderHistory;
