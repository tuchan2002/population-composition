import { useEffect, useState } from "react";
import { getPrefectures, getReportByPrefecture } from "./apis";
import LineChart from "./components/Charts/LineChart";
import Header from "./components/Header";
import Prefectures from "./components/Prefectures";

function App() {
  const [prefectures, setPrefectures] = useState([]);
  const [checkedPrefectures, setCheckedPrefectures] = useState([]);
  const [clickedPrefecture, setClickedPrefecture] = useState();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const prefectures = await getPrefectures();
      setPrefectures(prefectures);
      console.log(prefectures);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleSetReportsData = async () => {
      console.log("clickedPrefecture", clickedPrefecture);
      console.log("checkedPrefectures", checkedPrefectures);

      if (
        checkedPrefectures.filter(
          (item) => item.prefCode === clickedPrefecture.prefCode
        ).length > 0
      ) {
        const report = await getReportByPrefecture(
          checkedPrefectures[checkedPrefectures.length - 1]
        );

        console.log("report", report);
        setReports((prev) => [...prev, report]);
      } else {
        setReports(
          reports.filter(
            (report) => report.prefCode !== clickedPrefecture.prefCode
          )
        );
      }
    };
    if (checkedPrefectures.length > 0) {
      handleSetReportsData();
    }
  }, [checkedPrefectures.length, prefectures]);

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

  return (
    <div>
      <Header />
      <Prefectures
        prefectures={prefectures}
        checkedPrefectures={checkedPrefectures}
        handleCheckedPrefectures={handleCheckedPrefectures}
      />
      <LineChart checkedPrefectures={checkedPrefectures} reports={reports} />
    </div>
  );
}

export default App;
