import React from "react";
import styles from "./Prefectures.module.css";
import { IoClose } from "react-icons/io5";

const Prefectures = ({
  prefectures,
  checkedPrefectures,
  handleCheckedPrefectures,
  handleClickCloseIcon,
}) => {
  return (
    <>
      <div className={styles.top}>
        <IoClose
          onClick={handleClickCloseIcon}
          className={styles.closeIcon}
          size={44}
        />
      </div>
      <h2 className={styles.title}>都道府県</h2>
      <div className={styles.prefectureList}>
        {prefectures.map((prefecture) => (
          <div key={prefecture.prefCode} className={styles.prefectureItem}>
            <input
              type="checkbox"
              checked={checkedPrefectures.includes(prefecture)}
              onChange={() => {
                handleCheckedPrefectures(prefecture);
              }}
              id={"cb" + prefecture.prefCode}
            />
            <label htmlFor={"cb" + prefecture.prefCode}>
              {prefecture.prefName}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default Prefectures;
