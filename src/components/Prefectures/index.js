import React, { useState } from "react";
import styles from "./Prefectures.module.css";

const Prefectures = ({
  prefectures,
  checkedPrefectures,
  handleCheckedPrefectures,
}) => {
  return (
    <div>
      <h2 className={styles.title}>都道府県</h2>
      <div className={styles.prefectures}>
        {prefectures.map((prefecture) => (
          <div key={prefecture.prefCode}>
            <input
              type="checkbox"
              checked={checkedPrefectures.includes(prefecture)}
              onChange={() => {
                handleCheckedPrefectures(prefecture);
              }}
            />
            {prefecture.prefName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prefectures;
