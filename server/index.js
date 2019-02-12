const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const employees = require('./routes/employee');

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/employees', employees);

app.listen(8080, () => console.log("Job Dispatch API running on port 8080!"));
