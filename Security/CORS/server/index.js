const express = require("express");
const { title } = require("process");
const app = express();
const cors = require("cors");

var allowedOrigin = ["http://127.0.0.1:5500"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("CORS error"));
    }
  },
};

app.use(cors(corsOptions));

app.get("/list", (req, res) => {
  res.send([
    {
      id: 1,
      title: "Namaste Frontend system design",
    },
  ]);
});

const port = process.env.PORT || 5010;
app.listen(port, () => {
  console.log(`Sever is running on port ${port}`);
});
