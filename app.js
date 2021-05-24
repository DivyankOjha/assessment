const converter = require("json-2-csv");
const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const testRouter = require("./routes/testRoute");

// const globalErrorHandler = require('./controllers/errorController');
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();
});
//  MIDDLEWARES

app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 5000,
  })
);

app.use(express.static(path.join(__dirname, "public")));

// ROUTES

app.use("/api/test", testRouter);
app.use("/t", (req, res, next) => {
  // var XLSX = require("xlsx");
  // var workbook = XLSX.readFile("node.csv");
  // var sheet_name_list = workbook.SheetNames;
  // let arr = [];
  // sheet_name_list.forEach(function (y) {
  //   var worksheet = workbook.Sheets[y];
  //   var headers = {};
  //   var data = [];
  //   for (z in worksheet) {
  //     if (z[0] === "!") continue;
  //     //parse out the column, row, and value
  //     // var col = z.substring(0, 1);
  //     // var row = parseInt(z.substring(1));
  //     var col = z.replace(/[0-9]/g, "");
  //     var row = parseInt(z.replace(/\D/g, ""));
  //     var value = worksheet[z].v;

  //     //store header names
  //     if (row == 1) {
  //       headers[col] = value;
  //       continue;
  //     }

  //     if (!data[row]) data[row] = {};
  //     data[row][headers[col]] = value;
  //   }
  //   //drop those first two rows which are empty
  //   data.shift();
  //   data.shift();
  //   console.log(data);
  //   for (i in data) {
  //     if (data[i].Date) {
  //       console.log("hi");
  //       arr.push(data[i]);
  //     }
  //   }
  // });
  const reader = require("xlsx");
  const file = reader.readFile("./node.xlsx");

  let data = [];

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach((res) => {
      data.push(res);
    });
  }

  for (i in data) {
    if (data[i].Person == "A") {
      console.log("got a");
    }
  }
  

  res.status(200).json({
    status: "success",
    data,
  });
});

// app.use(globalErrorHandler);

module.exports = app;
