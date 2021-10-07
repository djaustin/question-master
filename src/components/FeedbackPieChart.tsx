import { Feedback } from "@prisma/client";
import React from "react";
import { PieChart } from "react-minimal-pie-chart";

export type FeedbackPieChartProps = { data: Feedback[] };

function getChartData(data) {
  const getChartData = [];
  const totals = data.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.score]: acc[curr.score] ? acc[curr.score] + 1 : 1,
    }),
    {}
  );
  if (totals[1]) {
    getChartData.push({
      title: "Very unhappy",
      value: totals[1],
      color: "#33667F",
    });
  }
  if (totals[2]) {
    getChartData.push({ title: "Unhappy", value: totals[2], color: "#337F66" });
  }
  if (totals[3]) {
    getChartData.push({ title: "Neutral", value: totals[3], color: "#66337F" });
  }
  if (totals[4]) {
    getChartData.push({ title: "Happy", value: totals[4], color: "#7F3366" });
  }
  if (totals[5]) {
    getChartData.push({
      title: "Very happy",
      value: totals[5],
      color: "#667F33",
    });
  }
  return getChartData;
}

export default function FeedbackPieChart({ data }: FeedbackPieChartProps) {
  const pieChartData = getChartData(data);

  return (
    <PieChart
      lineWidth={20}
      paddingAngle={18}
      rounded
      label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
      labelStyle={(index) => ({
        fontSize: "5px",
        fontFamily: "sans-serif",
        fill: pieChartData[index].color,
      })}
      labelPosition={60}
      data={pieChartData}
    />
  );
}
