import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { saveAs } from "file-saver";

const ManagementAdmin = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const apiurl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const generateCSVAndDownload = (orders) => {
    const csvContent = [
      "RegistrationNo,TotalMilk,TotalCurd",
      ...orders.map((order) =>
        [order.RegistrationNo, order.TotalMilk, order.TotalCurd].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "order_data.csv");
  };

  const handleGenerateCSV = async (e) => {
    e.preventDefault();

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const data = {
      startDate: startDate,
      endDate: endDate,
    };

    if (startDate && endDate) {
      try {
        const response = await fetch(`${apiurl}/admin/generate`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const data = await response.json();
          const orders = data.orders;

          generateCSVAndDownload(orders);
        } else {
          toast("FAILED. PLEASE RETRY");
        }
      } catch (error) {
        toast(error);
      }
    } else {
      toast("ENTER START AND END DATES!!!!");
    }
  };

  return (
    <div className="container">
      <div className="order">
        <div className="order__content">
          <form className="order__form">
            <div>
              <h1 className="order__title">
                <span>Export Order Data</span>
              </h1>
              <p className="order__description">
                Select the range of date for which you want to export the CSV
                file of student order data
              </p>
            </div>

            <div className="input_container">
              <label htmlFor="start-date" className="order__label">
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="input_container">
              <label htmlFor="end-date" className="order__label">
                End Date
              </label>
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="order__buttons">
              <button className="order__button" onClick={handleGenerateCSV}>
                Generate CSV
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default ManagementAdmin;
