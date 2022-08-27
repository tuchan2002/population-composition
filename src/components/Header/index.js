import React from "react";
import styles from "./Header.module.css";
import { IoMenu } from "react-icons/io5";

const Header = ({ handleClickMenuIcon }) => {
  return (
    <div className={styles.header}>
      <IoMenu
        className={styles.menuIcon}
        onClick={handleClickMenuIcon}
        size={44}
      />
      <h2 className={styles.title}>日本の都道府県別人口構成</h2>
    </div>
  );
};

export default Header;
