import { Feedback } from "@prisma/client";
import React from "react";
import { PieChart } from 'react-minimal-pie-chart';

export type FeedbackPieChartProps = { data: Feedback[] };

export default function FeedbackPieChart({
  data,
}: FeedbackPieChartProps) {

  let oneCount = 0;
  let twoCount = 0;
  let threeCount = 0;
  let fourCount = 0;
  let fiveCount = 0;

  data.map((feedback) => {
    switch (feedback.score) {
      case 1:
        oneCount += 1;
        break;
      case 2:
        twoCount += 1;
        break;
      case 3:
        threeCount += 1;
        break;
      case 4:
        fourCount += 1;
        break;
      case 5:
        fiveCount += 1;
        break;
      }  
  });

  const pieChartData = [
    { title: "Really unhappy", value: oneCount, color: '#33667F' },
    { title: "Unhappy", value: twoCount, color: '#337F66' },
    { title: "Neutral", value: threeCount, color: '#66337F' },
    { title: "Happy", value: fourCount, color: '#7F3366' },
    { title: "Really happy", value: fiveCount, color: '#667F33' },
  ]

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