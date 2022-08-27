import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { IoMenu } from "react-icons/io5";

const Header = ({ isShowMenuIcon, handleClickMenuIcon }) => {
  return (
    <div className={styles.header}>
      <div className={styles.menuIcon} onClick={handleClickMenuIcon}>
        {isShowMenuIcon && <IoMenu size={44} />}
      </div>
      <h2 className={styles.title}>日本の都道府県別人口構成</h2>
    </div>
  );
};

export default Header;
