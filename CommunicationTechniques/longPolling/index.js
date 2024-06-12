const express = require("express");

const app = express();

let data = "Initial Data";
const waitingClients = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/getData", (req, res) => {
  if (data !== req.query.lastData) {
    res.json({ data });
  } else {
    waitingClients.push(res);
  }
});

//use post/put to update -> just to simply to avoid postman
app.get("/updateData", (req, res) => {
  data = req.query.data;

  while (waitingClients.length > 0) {
    const client = waitingClients.pop();
    client.json({ data });
  }

  res.send({ success: "Data Updated Successfully" });
});

const port = process.env.PORT || 5011;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
