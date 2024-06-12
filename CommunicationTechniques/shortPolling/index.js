const express = require("express");

const app = express();

let data = "Initial Data";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/getData", (req, res) => {
  res.send({ data });
});

//use post/put to update -> just to simply to avoid postman
app.get("/updateData", (req, res) => {
  data = "updated data";
  res.send({
    data,
  });
});

const port = process.env.PORT || 5011;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
