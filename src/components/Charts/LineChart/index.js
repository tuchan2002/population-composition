import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styles from "./LineChart.module.css";
import { IoArrowBack } from "react-icons/io5";

const initOptions = {
  chart: {
    height: 650,
  },
  title: {
    text: null,
  },
  xAxis: {
    crosshair: true,
    title: {
      text: null,
    },
  },
  yAxis: {
    min: 0,
    title: {
      text: null,
    },
  },
  plotOptions: {
    series: {
      stickyTracking: false,
    },
  },
  series: [],
};

const generateOptions = (reports) => {
  const years = reports[0].data.map((item) => item.year);
  return {
    ...initOptions,
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
    xAxis: {
      categories: years,
      crosshair: true,
      title: {
        text: null,
      },
    },
  };
};
const LineChart = ({ reports }) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (reports.length > 0) {
      setOptions(generateOptions(reports));
    } else {
      setOptions(initOptions);
    }
  }, [reports.length]);

  return reports.length > 0 ? (
    <>
      <h2 className={styles.title}>人口数</h2>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  ) : (
    <div className={styles.hintWrapper}>
      <IoArrowBack className={styles.arrowIcon} size={44} />
      <h2 className={styles.hint}>
        チャートを表示するには、都道府県を少なくとも 1 つ選択してください。
      </h2>
    </div>
  );
};

export default LineChart;
