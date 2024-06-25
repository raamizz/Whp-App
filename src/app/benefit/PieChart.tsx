import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";


interface PieChartProps {
  totalAmount: number;
  redemptionAmount: number;
  monthlyDeposit: number;
}

const PieChart: React.FC<PieChartProps> = ({
  totalAmount,
  redemptionAmount,
}) => {
  const remainingAmount = redemptionAmount - totalAmount;

  const data = {
    labels: ["You Pay", "1st Installment"],
    datasets: [
      {
        data: [totalAmount, remainingAmount],
        backgroundColor: ["#4DB4A1", "#E26178"],
        hoverBackgroundColor: ["#265A50", "#b44d60"],
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          font: {
            weight: "bold",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = data.labels[context.dataIndex];
            const value = data.datasets[0].data[context.dataIndex];
            return `${label}: ₹${value.toLocaleString()}`;
          },
        },
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
        },
        formatter: (value: any, context: any) => {
          return `₹${value.toLocaleString()}`;
        },
      },
    },
  };

  return (
    <div className="relative w-64 h-64 md:mb-8 ">
      <Pie data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default PieChart;
