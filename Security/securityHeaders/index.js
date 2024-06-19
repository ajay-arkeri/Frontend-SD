const express = require("express");
const app = express();

const redirectToHttps = (req, res, next) => {
  if (req.protocol !== "https") {
    return res.redirect(["https://", req.get("Host"), req.url].join(""));
  }
};

app.use(redirectToHttps);

app.use((req, res, next) => {
  res.removeHeader("X-Powered-By");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  next();
});

app.get("/list", (req, res) => {
  res.send([
    {
      id: 1,
      title: "Frontend SD",
    },
  ]);
});

const port = process.env.PORT || 5010;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
