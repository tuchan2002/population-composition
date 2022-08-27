import { useEffect, useRef, useState } from "react";
import { getPrefectures, getReportByPrefecture } from "./apis";
import LineChart from "./components/Charts/LineChart";
import Header from "./components/Header";
import Prefectures from "./components/Prefectures";
import styles from "./App.module.css";

function App() {
  const [prefectures, setPrefectures] = useState([]);
  const [checkedPrefectures, setCheckedPrefectures] = useState([]);
  const [clickedPrefecture, setClickedPrefecture] = useState();
  const [reports, setReports] = useState([]);

  const prefecturesRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const prefectures = await getPrefectures();
      setPrefectures(prefectures);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleSetReportsData = async () => {
      if (
        checkedPrefectures.filter(
          (item) => item.prefCode === clickedPrefecture.prefCode
        ).length > 0
      ) {
        const report = await getReportByPrefecture(
          checkedPrefectures[checkedPrefectures.length - 1]
        );

        setReports((prev) => [...prev, report]);
      } else {
        setReports(
          reports.filter(
            (report) => report.prefCode !== clickedPrefecture.prefCode
          )
        );
      }
    };
    handleSetReportsData();
  }, [checkedPrefectures.length, prefectures, clickedPrefecture]);

  const handleCheckedPrefectures = (prefecture) => {
    setClickedPrefecture(prefecture);
    setCheckedPrefectures((prev) => {
      if (
        checkedPrefectures.filter(
          (item) => item.prefCode === prefecture.prefCode
        ).length > 0
      ) {
        return checkedPrefectures.filter(
          (item) => item.prefCode !== prefecture.prefCode
        );
      } else {
        return [...prev, prefecture];
      }
    });
  };

  const handleClickMenuIcon = () => {
    prefecturesRef.current.style.transform = "translateX(0)";
  };

  const handleClickCloseIcon = () => {
    prefecturesRef.current.style.transform = "translateX(-100%)";
  };

  return (
    <div>
      <Header handleClickMenuIcon={handleClickMenuIcon} />
      <div className={styles.main}>
        <div className={styles.prefectures} ref={prefecturesRef}>
          <Prefectures
            prefectures={prefectures}
            checkedPrefectures={checkedPrefectures}
            handleCheckedPrefectures={handleCheckedPrefectures}
            handleClickCloseIcon={handleClickCloseIcon}
          />
        </div>
        <div className={styles.linechart}>
          <LineChart
            checkedPrefectures={checkedPrefectures}
            reports={reports}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
