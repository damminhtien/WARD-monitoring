import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import moment from "moment";
import "./App.css";

import DatePicker from "./container/DatePicker";

function App() {
  const [startDate, setStartDate] = useState(new Date((new Date()).getTime() - 3600000));
  const [endDate, setEndDate] = useState(new Date((new Date()).getTime() + 3600000));
  const [timeLog, setTimeLog] = useState([]);
  const [cpuLog, setCpuLog] = useState([]);
  const [memLog, setMemLog] = useState([]);

  function handleChangeStartDate(date) {
    setStartDate(date);
  }

  function handleChangeEndDate(date) {
    setEndDate(date);
  }

  useEffect(() => {
    const requestTimer = setInterval(() => {
      axios
        .get("http://172.19.18.97:4000")
        .then(function (response) {
          const data = response.data;
          console.log(
            data.cpuLog.x.map((time) =>
              moment(Number(time)).format("YYYY-MM-DD HH:mm:ss")
            )
          );
          setTimeLog(
            data.cpuLog.x.map((time) =>
              moment(Number(time)).format("YYYY-MM-DD HH:mm:ss")
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
      <div>
        Start time <DatePicker date={startDate} onChange={handleChangeStartDate} />
        End time <DatePicker date={endDate} onChange={handleChangeEndDate} />
      </div>
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
          paper_bgcolor: "rgba(0,0,0,0)",
          plot_bgcolor: "rgba(0,0,0,0)",
          xaxis: {
            range: [startDate, endDate],
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
          paper_bgcolor: "rgba(0,0,0,0)",
          plot_bgcolor: "rgba(0,0,0,0)",
          xaxis: {
            range: [startDate, endDate],
          },
        }}
      />
    </div>
  );
}

export default App;
