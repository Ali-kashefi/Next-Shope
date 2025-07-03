"use client";
// Using the ChartJS library and processing input data with the Props function
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const formatPrice = (price) => {
  if (price === undefined || price === null) return "0";
  return new Intl.NumberFormat("fa-IR", {
    style: "decimal",
    minimumFractionDigits: 0,
  }).format(price);
};

function SalesChart({ chartData }) {
  const [dataForChart, setDataForChart] = useState({
    labels: [],
    datasets: [],
  });

 
  const primaryColorBorder = "#4A90E2";
  const primaryColorBackground = "rgba(74, 144, 226, 0.2)"; 

  useEffect(() => {
    if (chartData?.labels && chartData.salesAmounts) {
      setDataForChart({
        labels: chartData.labels,
        datasets: [
          {
            label: "مبلغ فروش (تومان)",
            data: chartData.salesAmounts,
       
            borderColor: primaryColorBorder,
            backgroundColor: primaryColorBackground,
            tension: 0.4,
            fill: true,
          },
        ],
      });
    }
  }, [chartData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: { family: "Vazirmatn, Arial, sans-serif" },
        },
      },
      title: {
        display: true,
        text: "روند فروش در 30 روز گذشته",
        font: { size: 18, family: "Vazirmatn, Arial, sans-serif" },
      },
      tooltip: {
        rtl: true,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += formatPrice(context.parsed.y) + " تومان";
            }
            return label;
          },
        },
        bodyFont: { family: "Vazirmatn, Arial, sans-serif" },
        titleFont: { family: "Vazirmatn, Arial, sans-serif" },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "تاریخ",
          font: { family: "Vazirmatn, Arial, sans-serif" },
        },
        ticks: { font: { family: "Vazirmatn, Arial, sans-serif" } },
        rtl: true,
      },
      y: {
        title: {
          display: true,
          text: "مبلغ (تومان)",
          font: { family: "Vazirmatn, Arial, sans-serif" },
        },
        ticks: {
          font: { family: "Vazirmatn, Arial, sans-serif" },
          callback: function (value) {
            return formatPrice(value);
          },
        },
      },
    },
  };

  if (!chartData || chartData.labels.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-secondary-600">
        داده‌ای برای نمایش نمودار فروش موجود نیست.
      </div>
    );
  }

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <Line data={dataForChart} options={options} />
    </div>
  );
}

export default SalesChart;