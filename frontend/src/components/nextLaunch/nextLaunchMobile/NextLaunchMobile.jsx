import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import styles from "./NextLaunchMobile.module.css";
import CountdownTimer from "../countdownTimer/CountdownTimer";
import InfosModal from "../infosModal/InfosModal";

function NextLaunchMobile() {
  const url = `https://ll.thespacedevs.com/2.2.0/launch/upcoming/`;

  const [launcherIndex, setLauncherIndex] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: import.meta.env.VITE_TOKEN,
        },
      })
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const nextLaunch = () => {
    setLauncherIndex(
      launcherIndex === data.results.length - 1
        ? 0
        : (prevIndex) => prevIndex + 1
    );
  };

  const prevLaunch = () => {
    setLauncherIndex(
      launcherIndex === 0
        ? data.results.length - 1
        : (prevIndex) => prevIndex - 1
    );
  };

  return (
    <div className={styles.launchAndButtonsContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.nextLaunchTitle}>NEXT LAUNCHES</h2>
      </div>
      <div className={styles.launchContainer}>
        <div className={styles.leftButtonContainer}>
          <FaAngleLeft className={styles.button} onClick={() => prevLaunch()} />
        </div>
        <div className={styles.nextLaunchMobileContainer}>
          <div className={styles.launcherImageMobileContainer}>
            {data.results ? (
              <img
                className={styles.launcherMobileImage}
                src={data.results[launcherIndex].image}
                alt="launcher"
              />
            ) : null}
          </div>
          <div className={styles.descriptionMobileContainer}>
            <div className={styles.missionMobileContainer}>
              <p className={styles.titleMobileDescription}>Mission Name</p>

              {data.results ? (
                <h1 className={styles.missionMobileName}>
                  {data.results[launcherIndex].mission !== null
                    ? data.results[launcherIndex].mission.name
                    : "NO MISSION"}
                </h1>
              ) : null}

              {data.results
                ? data.results[launcherIndex].mission !== null && (
                    <InfosModal
                      missionName={data.results[launcherIndex].mission.name}
                      missionDescription={
                        data.results[launcherIndex].mission.description
                      }
                    />
                  )
                : null}
            </div>
            <div className={styles.rocketMobileContainer}>
              <p className={styles.titleMobileDescription}>Rocket</p>
              {data.results ? (
                <h1 className={styles.missionMobileName}>
                  {data.results[launcherIndex].rocket.configuration.name}
                </h1>
              ) : null}
            </div>
            <div className={styles.padMobileContainer}>
              <p className={styles.titleMobileDescription}>Pad</p>
              {data.results ? (
                <h1 className={styles.missionMobileName}>
                  {data.results[launcherIndex].pad.name}
                </h1>
              ) : null}
            </div>
            <div className={styles.providerMobileContainer}>
              <p className={styles.titleMobileDescription}>Service Provider</p>
              {data.results ? (
                <h1 className={styles.missionMobileName}>
                  {data.results[launcherIndex].launch_service_provider.name}
                </h1>
              ) : null}
            </div>
          </div>
          <div className={styles.countdownMobileContainer}>
            {data.results ? (
              <CountdownTimer data={data} launcherIndex={launcherIndex} />
            ) : null}
          </div>
        </div>
        <div className={styles.rightButtonContainer}>
          <FaAngleRight
            className={styles.button}
            onClick={() => nextLaunch()}
          />
        </div>
      </div>
    </div>
  );
}

export default NextLaunchMobile;
