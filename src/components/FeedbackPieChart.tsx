import { Feedback } from "@prisma/client";
import React from "react";
import { PieChart } from 'react-minimal-pie-chart';

export type FeedbackPieChartProps = { data: Feedback[] };

export default function FeedbackPieChart({
  data,
}: FeedbackPieChartProps) {

  const totals = data.reduce((acc, curr) => ({...acc, [curr.score]: acc[curr.score] ? acc[curr.score] + 1 : 1}), {});

  const pieChartData = [
    { title: "Really unhappy", value: totals[1], color: '#33667F' },
    { title: "Unhappy", value: totals[2], color: '#337F66' },
    { title: "Neutral", value: totals[3], color: '#66337F' },
    { title: "Happy", value: totals[4], color: '#7F3366' },
    { title: "Really happy", value: totals[5], color: '#667F33' },
  ];

  return (
    <PieChart
      lineWidth={20}
      paddingAngle={18}
      rounded
      label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
      labelStyle={(index) => ({
        fontSize: '5px',
        fontFamily: 'sans-serif',
        fill: pieChartData[index].color
      })}
      labelPosition={60}
      data={pieChartData}
    />
  )
  
};