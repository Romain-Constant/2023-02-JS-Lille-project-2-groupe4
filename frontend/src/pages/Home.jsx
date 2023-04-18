import React from "react";
import NavBar from "@components/navBar/NavBar";
import NextLaunchContainer from "../components/nextLaunch/NextLaunchContainer";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <NavBar />
      <NextLaunchContainer />
    </div>
  );
}

export default Home;
