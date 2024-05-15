const express = require("express");
const app = express();
const port = 3200;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const studentController = require("./src/student/student.controller")
app.use('/students', studentController)

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);