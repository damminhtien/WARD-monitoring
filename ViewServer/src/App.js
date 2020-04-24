import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import moment from "moment";
import "./App.css";

function App() {
  const [timeLog, setTimeLog] = useState([]);
  const [cpuLog, setCpuLog] = useState([]);
  const [memLog, setMemLog] = useState([]);

  useEffect(() => {
    const requestTimer = setInterval(() => {
      axios
        .get("http://172.19.18.97:4000")
        .then(function (response) {
          const data = response.data;
          console.log(
            data.cpuLog.x.map((time) =>
              moment(Number(time)).format("YYYY-MM-DD hh:mm:ss")
            )
          );
          setTimeLog(
            data.cpuLog.x.map((time) =>
              moment(Number(time)).format("YYYY-MM-DD hh:mm:ss")
            )
          );
          setCpuLog(data.cpuLog.y);
          setMemLog(data.memLog.y);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }, 3000);
    return () => {
      clearInterval(requestTimer);
    };
  }, []);

  return (
    <div className="App">
      <Plot
        className="ProcessPlot"
        data={[
          {
            x: timeLog,
            y: memLog,
            fill: "tozeroy",
            type: "scatter",
            line: {
              color: "#17BECF",
            },
          },
        ]}
        layout={{
          width: 1800,
          height: 480,
          title: "Monitoring Memory Usage",
          xaxis: {
            range: ["2020-04-24 12:00:00", "2020-04-24 13:40:00"],
          },
        }}
      />
      <Plot
        className="ProcessPlot"
        data={[
          {
            x: timeLog,
            y: cpuLog,
            fill: "tozeroy",
            type: "scatter",
            line: {
              color: "#7F7F7F",
            },
          },
        ]}
        layout={{
          width: 1800,
          height: 480,
          title: "Monitoring CPU Usage",
          xaxis: {
            range: ["2020-04-24 12:00:00", "2020-04-24 13:40:00"],
          },
        }}
      />
    </div>
  );
}

export default App;
