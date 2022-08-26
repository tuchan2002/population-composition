import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const generateOptions = (reports) => {
  const years = reports[0].data.map((item) => item.year);
  return {
    chart: {
      height: 520,
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: years,
      crosshair: true,
      title: {
        text: "年度",
      },
    },
    yAxis: {
      min: 0,

      title: {
        text: "人口数",
      },
    },

    plotOptions: {
      series: {
        stickyTracking: false,
      },
    },
    series: reports.map((report) => {
      return {
        name: report.prefName,
        color:
          "#" +
          (
            "00000" +
            Math.floor(0.02 * report.prefCode * Math.pow(16, 6)).toString(16)
          ).slice(-6),
        lineWidth: 4,
        data: report.data.map((item) => item.value),
      };
    }),
  };
};
const LineChart = ({ reports }) => {
  const [options, setOptions] = useState({});
  useEffect(() => {
    console.log("REPORTS", reports);
    if (reports.length > 0) {
      setOptions(generateOptions(reports));
    }
  }, [reports.length]);
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LineChart;
