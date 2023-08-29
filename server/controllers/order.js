const { DB } = require("../db/dbConnection");

const order = async (req, res, next) => {
  const rollno = req.userId;

  const { curdQuantity, milkQuantity } = req.body;

  try {
    const currentDate = new Date();
    const orderDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
    const orderTime = currentDate.toTimeString().slice(0, 8);

    const orders = [];

    if (curdQuantity > 0) {
      orders.push({
        RegistrationNo: rollno,
        Order_Type: "Curd",
        Order_Qty: curdQuantity,
        Order_Date: orderDate,
        Order_Time: orderTime,
      });
    }

    if (milkQuantity > 0) {
      orders.push({
        RegistrationNo: rollno,
        Order_Type: "Milk",
        Order_Qty: milkQuantity,
        Order_Date: orderDate,
        Order_Time: orderTime,
      });
    }

    if (orders.length > 0) {
      for (const orderData of orders) {
        const response = await DB.query(
          `INSERT INTO Orders (RegistrationNo, Order_Type, Order_Qty, Order_Date, Order_Time) VALUES (?, ?, ?, ?, ?)`,
          [
            orderData.RegistrationNo,
            orderData.Order_Type,
            orderData.Order_Qty,
            orderData.Order_Date,
            orderData.Order_Time,
          ]
        );
      }

      return res.status(200).json({
        message: `Successfully added ${curdQuantity} quantity of Curd and ${milkQuantity} quantity of Milk to the orders.`,
      });
    } else {
      return res.status(400).json({ message: "No valid quantities provided." });
    }
  } catch (error) {
    next(error);
  }
};

const getPreviousOrders = async (req, res, next) => {
  const rollno = req.userId;

  try {
    const query = `
      SELECT *
      FROM Orders
      WHERE RegistrationNo = ?
      ORDER BY Order_Date DESC, Order_Time DESC
      LIMIT 30
    `;

    const orders = await DB.query(query, [rollno]);

    const formattedOrders = orders.map((order) => ({
      ...order,
      Order_Date: order.Order_Date.toLocaleDateString().slice(0, 10), // Format date as YYYY-MM-DD
      Order_Time: order.Order_Time, // Format time as HH:MM:SS
    }));

    return res.status(200).json({ orders: formattedOrders });
  } catch (error) {
    next(error);
  }
};

const getOrderTotalsByDateRange = async (req, res, next) => {
  const { startDate, endDate } = req.body;

  try {
    const query = `
      SELECT
        RegistrationNo,
        SUM(CASE WHEN Order_Type = 'Milk' THEN Order_Qty ELSE 0 END) AS TotalMilk,
        SUM(CASE WHEN Order_Type = 'Curd' THEN Order_Qty ELSE 0 END) AS TotalCurd
      FROM Orders
      WHERE Order_Date >= ? AND Order_Date <= ?
      GROUP BY RegistrationNo;
    `;

    const result = await DB.query(query, [startDate, endDate]);

    return res.status(200).json({ orders: result });
  } catch (error) {
    console.error("Error getting order totals:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getDailyMonthlyTotalQuantity = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    // Calculate daily total milk and curd quantity
    const dailyMilkQuery = `
      SELECT
        SUM(Order_Qty) AS DailyMilkQuantity
      FROM Orders
      WHERE Order_Type = 'Milk' AND DATE(Order_Date) = DATE(NOW())
    `;

    const dailyCurdQuery = `
      SELECT
        SUM(Order_Qty) AS DailyCurdQuantity
      FROM Orders
      WHERE Order_Type = 'Curd' AND DATE(Order_Date) = DATE(NOW())
    `;

    // Calculate monthly total milk and curd quantity
    const monthlyMilkQuery = `
      SELECT
        SUM(Order_Qty) AS MonthlyMilkQuantity
      FROM Orders
      WHERE Order_Type = 'Milk' AND YEAR(Order_Date) = ? AND MONTH(Order_Date) = ?
    `;

    const monthlyCurdQuery = `
      SELECT
        SUM(Order_Qty) AS MonthlyCurdQuantity
      FROM Orders
      WHERE Order_Type = 'Curd' AND YEAR(Order_Date) = ? AND MONTH(Order_Date) = ?
    `;

    const [dailyMilkResult] = await DB.query(dailyMilkQuery);
    const [dailyCurdResult] = await DB.query(dailyCurdQuery);
    const [monthlyMilkResult] = await DB.query(monthlyMilkQuery, [
      currentYear,
      currentMonth,
    ]);
    const [monthlyCurdResult] = await DB.query(monthlyCurdQuery, [
      currentYear,
      currentMonth,
    ]);

    return res.status(200).json({
      dailyMilkQuantity: dailyMilkResult.DailyMilkQuantity || 0,
      dailyCurdQuantity: dailyCurdResult.DailyCurdQuantity || 0,
      monthlyMilkQuantity: monthlyMilkResult.MonthlyMilkQuantity || 0,
      monthlyCurdQuantity: monthlyCurdResult.MonthlyCurdQuantity || 0,
    });
  } catch (error) {
    console.error("Error calculating total quantities:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  order,
  getPreviousOrders,
  getOrderTotalsByDateRange,
  getDailyMonthlyTotalQuantity,
};
