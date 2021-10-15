import { useColorModeValue } from "@chakra-ui/color-mode";
import { Feedback } from "@prisma/client";
import React from "react";
import { PieChart } from "react-minimal-pie-chart";

export type FeedbackPieChartProps = { data: Feedback[] };

function getChartData(data: Feedback[]) {
  const piechartData = [];
  const totals: {
    [currentScore: number]: number;
  } = data.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.score]: acc[curr.score] ? acc[curr.score] + 1 : 1,
    }),
    {}
  );
  if (totals[1]) {
    piechartData.push({
      title: "Very unhappy",
      value: totals[1],
      color: "#FF0000",
    });
  }
  if (totals[2]) {
    piechartData.push({ title: "Unhappy", value: totals[2], color: "#FF6900" });
  }
  if (totals[3]) {
    piechartData.push({ title: "Neutral", value: totals[3], color: "#FFD300" });
  }
  if (totals[4]) {
    piechartData.push({ title: "Happy", value: totals[4], color: "#9FFF00" });
  }
  if (totals[5]) {
    piechartData.push({
      title: "Very happy",
      value: totals[5],
      color: "#51bf03",
    });
  }
  return piechartData;
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
        fill: useColorModeValue("black", "white"),
      })}
      labelPosition={60}
      data={pieChartData}
    />
  );
}
