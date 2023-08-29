Drop Database IF EXISTS Mess_App;

Create Database Mess_App;

Use Mess_App;

Create Table Users(
    RegistrationNo Varchar(10) PRIMARY KEY,
    Name Varchar(50),
    Email Varchar(100),
    Img Text,
    Role ENUM('Student', 'Mess', 'Admin')
);

CREATE TABLE Orders (
    RegistrationNo VARCHAR(10),
    Order_Type ENUM('Milk', 'Curd'),
    Order_Qty INT,
    Order_Date DATE,
    Order_Time TIME,
    FOREIGN KEY (RegistrationNo) REFERENCES Users(RegistrationNo)
);

Insert into Users 
values('21bcs114', 'SHREYANSH TIWARI IIIT DHARWAD', '21bcs114@iiitdwd.ac.in', 'https://lh3.googleusercontent.com/a/AAcHTtdVcbV0bwhx20IzzfmMxNtWngpULulD4p_y0zXpVq2QRA=s100', 'Admin');

SELECT RegistrationNo,
SUM(CASE WHEN Order_Type = 'Milk' THEN Order_Qty ELSE 0 END) AS TotalMilk,
SUM(CASE WHEN Order_Type = 'Curd' THEN Order_Qty ELSE 0 END) AS TotalCurd
FROM Orders
WHERE Order_Date >= '2023-08-23' AND Order_Date <= '2023-08-30'
GROUP BY RegistrationNo;
