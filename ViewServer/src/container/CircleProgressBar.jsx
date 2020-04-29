import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CircularProgressBar(props) {
  const { percentage } = props;
  return (
    <CircularProgressbar
      value={percentage}
      text={`${percentage}%`}
      circleRatio={0.75}
      styles={buildStyles({
        rotation: 1 / 2 + 1 / 8,
        strokeLinecap: "butt",
        textColor: "black",
        pathColor: "turquoise",
        trailColor: "white",
      })}
    />
  );
}

export default CircularProgressBar;
