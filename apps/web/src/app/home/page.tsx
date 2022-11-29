import type { NextPage } from "next";
import styles from "./Home.module.scss";

const Home: NextPage = () => {
  return <div className={styles["home-container"]}>WestPoint is cool</div>;
};

export default Home;
