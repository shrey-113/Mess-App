Drop Database IF EXISTS Mess_App;

Create Database Mess_App;

Use Mess_App;

Create Table Users(
    RegistrationNo Varchar(10) PRIMARY KEY,
    Name Varchar(50),
    Email Varchar(100),
    Img Text,
    Role ENUM('Student', 'Admin')
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

