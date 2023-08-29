import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const MessAdmin = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState({}); // Initialize with an empty object
  const apiurl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${apiurl}/getdailyorders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        toast(`Error fetching orders: ${error}`);
      }
    };

    fetchOrders();
  }, [token, apiurl]);

  console.log(orders);

  return (
    <div className="container">
      <div className="order-history">
        <div className="order-history__content">
          <h1 className="order-history__title">Mess Management</h1>

          {/* Display Daily Curd and Milk Quantity */}
          <div className="order-card">
            <div className="order-card__header">
              <span className="order-card__date">Daily Quantities</span>
            </div>
            <div className="order-card__body">
              <p className="order-card__item">
                Curd Quantity: {orders.dailyCurdQuantity || "loading"} units
              </p>
              <p className="order-card__item">
                Milk Quantity: {orders.dailyMilkQuantity || "loading"} units
              </p>
            </div>
          </div>

          {/* Display Monthly Curd and Milk Quantity */}
          <div className="order-card">
            <div className="order-card__header">
              <span className="order-card__date">Monthly Quantities</span>
            </div>
            <div className="order-card__body">
              <p className="order-card__item">
                Curd Quantity: {orders.monthlyCurdQuantity || "loading"} units
              </p>
              <p className="order-card__item">
                Milk Quantity: {orders.monthlyMilkQuantity || "loading"} units
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default MessAdmin;
