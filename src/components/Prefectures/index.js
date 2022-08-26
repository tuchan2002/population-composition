import React, { useState } from "react";
import styles from "./Prefectures.module.css";

const Prefectures = ({
  prefectures,
  checkedPrefCode,
  handleCheckedPrefCode,
}) => {
  console.log(checkedPrefCode);

  return (
    <div>
      <h2 className={styles.title}>都道府県</h2>
      <div className={styles.prefectures}>
        {prefectures.map((prefecture) => (
          <div key={prefecture.prefCode}>
            <input
              type="checkbox"
              checked={checkedPrefCode.includes(prefecture.prefCode)}
              onChange={() => {
                handleCheckedPrefCode(prefecture.prefCode);
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
