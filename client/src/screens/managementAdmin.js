import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import the jspdf-autotable plugin

const ManagementAdmin = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const apiurl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const [ordersData, setOrdersData] = useState([]);

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const generateCSVAndDownload = (orders) => {
    const csvContent = [
      "RegistrationNo,Milk,Curd",
      ...orders.map((order) =>
        [order.RegistrationNo, order.TotalMilk, order.TotalCurd].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, `${startDate}-${endDate}.csv`);
  };

  const generatePDFAndDownload = (orders) => {
    const doc = new jsPDF();

    doc.text("Order Report", 10, 10);

    // Define the table columns
    const columns = [
      { header: "Order", dataKey: "orderNumber" },
      { header: "Registration Number", dataKey: "RegistrationNo" },
      { header: "Total Milk", dataKey: "TotalMilk" },
      { header: "Total Curd", dataKey: "TotalCurd" },
    ];

    // Prepare the data for the table
    const tableData = orders.map((order, index) => ({
      orderNumber: index + 1,
      RegistrationNo: order.RegistrationNo,
      TotalMilk: order.TotalMilk,
      TotalCurd: order.TotalCurd,
    }));

    // Add the table to the PDF
    doc.autoTable({
      head: columns,
      body: tableData,
      startY: 20, // Starting y position for the table
      theme: "grid", // Table theme (optional)
    });

    const pdfBlob = doc.output("blob");
    saveAs(pdfBlob, `${startDate}-${endDate}-report.pdf`);

    // Print the PDF after generating and downloading
    const printWindow = window.open();
    printWindow.document.open();
    printWindow.document.write(
      "<iframe src='" + doc.output("datauristring") + "'></iframe>"
    );
    printWindow.document.close();
  };

  const handleGenerateCSV = async (e) => {
    e.preventDefault();

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

  const generateTable = async (e) => {
    e.preventDefault();

    try {
      const data = {
        startDate: startDate,
        endDate: endDate,
      };

      if (startDate && endDate) {
        const response = await fetch(`${apiurl}/admin/generate`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const data = await response.json();
          const orders = data.orders;
          setOrdersData(orders);

          console.log(orders);
        } else {
          toast("FAILED TO GENERATE TABLE. PLEASE RETRY");
        }
      } else {
        toast("ENTER START AND END DATES!!!!");
      }
    } catch (error) {
      toast(error);
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
              <button className="order__button" onClick={generateTable}>
                Generate Table
              </button>
              <button className="order__button" onClick={handleGenerateCSV}>
                Generate CSV
              </button>
            </div>
          </form>

          {/* Display the generated table */}
          {ordersData.length > 0 && (
            <div
              className="order__table"
              style={{ height: "500px", overflow: "auto" }}
            >
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>Registration Number</th>
                    <th>Total Milk</th>
                    <th>Total Curd</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersData.map((order) => (
                    <tr key={order.RegistrationNo}>
                      <td>{order.RegistrationNo}</td>
                      <td>{order.TotalMilk}</td>
                      <td>{order.TotalCurd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default ManagementAdmin;
