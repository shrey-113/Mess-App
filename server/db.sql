Drop Database IF EXISTS Mess_App;

Create Database Mess_App;

Use Mess_App;

Create Table Users(
    RegistrationNo Varchar(10) PRIMARY KEY,
    Name Varchar(50),
    Password Text
);

Create Table Orders(
    RegistrationNo Varchar(10),
    Order_Type Varchar(10),
    Order_Qty int,
    Order_Date Date,
    Order_Time Time,
    FOREIGN KEY (RegistrationNo) REFERENCES Users(RegistrationNo)
);

