const express = require("express");
const fs = require("fs");
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());

app.get("/", (req, res) => {
  let timeLog = [];
  let cpuLog = [];
  let memLog = [];
  fs.readFile("debug.log", function (err, buf) {
    const arrlog = buf.toString().split("\n");
    timeLog = arrlog.map((log) => {
      return log.split(" | ")[0];
    });
    cpuLog = arrlog.map((log) => {
      return log.split(" | ")[3];
    });
    memLog = arrlog.map((log) => {
      return log.split(" | ")[4];
    });
    res.json({
      cpuLog: {
        x: timeLog,
        y: cpuLog,
      },
      memLog: {
        x: timeLog,
        y: memLog,
      },
    });
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
