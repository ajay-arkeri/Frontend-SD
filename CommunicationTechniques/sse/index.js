const express = require("express");
const app = express();
const { join } = require("node:path");

app.get("/sse", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  //wrong format
  // res.write("data : Welcome to server sent event \n\n");
  res.write("data: Welcome to server sent event \n\n");

  const intervalId = setInterval(() => {
    res.write(`data: servr time ${new Date().toLocaleDateString()}\n\n`);
  }, 5000);

  req.on("close", () => {
    clearInterval(intervalId);
  });
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sever is running on http://localhost:${port}`);
});
