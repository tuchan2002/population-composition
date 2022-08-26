import { useEffect, useState } from "react";
import { getPrefectures } from "./apis";
import LineChart from "./components/Charts/LineChart";
import Header from "./components/Header";
import Prefectures from "./components/Prefectures";

function App() {
  const [prefectures, setPrefectures] = useState([]);
  const [checkedPrefCode, setCheckedPrefCode] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const prefectures = await getPrefectures();
      setPrefectures(prefectures);
      console.log(prefectures);
    };
    fetchData();
  }, []);

  const handleCheckedPrefCode = (prefCode) => {
    setCheckedPrefCode((prev) => {
      const isChecked = checkedPrefCode.includes(prefCode);
      if (isChecked) {
        return checkedPrefCode.filter((item) => item !== prefCode);
      } else {
        return [...prev, prefCode];
      }
    });
  };

  return (
    <div>
      <Header />
      <Prefectures
        prefectures={prefectures}
        checkedPrefCode={checkedPrefCode}
        handleCheckedPrefCode={handleCheckedPrefCode}
      />
      <LineChart checkedPrefCode={checkedPrefCode} />
    </div>
  );
}

export default App;
