import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import styles from "./NextLaunchContainer.module.css";
import CountdownTimer from "./countdownTimer/CountdownTimer";
import Weather from "./weather/Weather";
import InfosModal from "./infosModal/InfosModal";

function NextLaunchContainer() {
  const url = `https://ll.thespacedevs.com/2.2.0/launch/upcoming/?format=json`;

  const [launcherIndex, setLauncherIndex] = useState(1);
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
    <div className={styles.nextLaunchContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.nextLaunchTitle}>NEXT LAUNCHES</h2>
      </div>
      <div className={styles.launchContainer}>
        <div className={styles.leftButtonContainer}>
          <FaAngleLeft className={styles.button} onClick={() => prevLaunch()} />
        </div>
        <div className={styles.leftContainer}>
          <div className={styles.launcherImageContainer}>
            {data.results ? (
              <img
                className={styles.launcherImage}
                src={data.results[launcherIndex].image}
                alt="launcher"
              />
            ) : null}
          </div>
          {data.results ? (
            <CountdownTimer data={data} launcherIndex={launcherIndex} />
          ) : null}
        </div>
        <div className={styles.rightContainer}>
          {data.results ? (
            <Weather dataLauncher={data} launcherIndex={launcherIndex} />
          ) : null}
          <div className={styles.descriptionContainer}>
            <div className={styles.missionContainer}>
              <p className={styles.titleMobileDescription}>Mission Name</p>

              {data.results ? (
                <h1 className={styles.missionName}>
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
            <div className={styles.rocketContainer}>
              <p className={styles.titleDescription}>Rocket</p>
              {data.results ? (
                <h1 className={styles.missionName}>
                  {data.results[launcherIndex].rocket.configuration.name}
                </h1>
              ) : null}
            </div>
            <div className={styles.padContainer}>
              <p className={styles.titleDescription}>Pad</p>
              {data.results ? (
                <h1 className={styles.missionName}>
                  {data.results[launcherIndex].pad.name}
                </h1>
              ) : null}
            </div>
            <div className={styles.providerContainer}>
              <p className={styles.titleDescription}>Service Provider</p>
              {data.results ? (
                <h1 className={styles.missionName}>
                  {data.results[launcherIndex].launch_service_provider.name}
                </h1>
              ) : null}
            </div>
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

export default NextLaunchContainer;
