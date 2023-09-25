import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const MessAdmin = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState({});
  const [recentOrders, setRecentOrders] = useState([]); // State to hold recent orders
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

    const fetchRecentOrders = async () => {
      try {
        const response = await fetch(`${apiurl}/getrecentorders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRecentOrders(data.orders);
        }
      } catch (error) {
        toast(`Error fetching recent orders: ${error}`);
      }
    };

    // Fetch orders and recent orders initially
    fetchOrders();
    fetchRecentOrders();

    // Set an interval to fetch orders and recent orders every 5 seconds
    const interval = setInterval(() => {
      fetchOrders();
      fetchRecentOrders();
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [token, apiurl]);

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

          <h6 className="order-history__title">Recent Orders</h6>

          {/* Display Recent Orders */}
          {recentOrders.map((order, index) => (
            <div className="order-card" key={index}>
              <div className="order-card__header">
                <span className="order-card__date">
                  Registration No: {order.RegistrationNo} <br />
                  Order Date: {order.Order_Date.slice(0, 10)} <br /> Time:{" "}
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
      </div>
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default MessAdmin;
