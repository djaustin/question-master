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
        threeCount =+ 1;
        break;
      case 4:
        fourCount += 1;
        break;
      case 5:
        fiveCount += 1;
        break;
      }  
  });
  return (
    <PieChart
    data={[
      { title: 'One', value: 1, color: '#E38627' },
      { title: 'Two', value: 2, color: '#C13C37' },
      { title: 'Three', value: 3, color: '#6A2135' },
      { title: 'Four', value: 4, color: '#6A2135' },
      { title: 'Five', value: 5, color: '#6A2135' },
    ]}
    />
  )
  
};