const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = 3000;

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const payload = req.body;

  console.log("received webhook payload:", payload);

  res.status(200).send("webhook received successfully");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
