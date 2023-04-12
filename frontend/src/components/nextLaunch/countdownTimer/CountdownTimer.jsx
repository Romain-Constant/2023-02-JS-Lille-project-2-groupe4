import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./CountdownTimer.module.css";
import getRemainingTimeUntilMsTimestamp from "./Utils/CountdownTimerUtils";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

function CountdownTimer({ countdownTimestampMs }) {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdownTimestampMs]);

  return (
    <div className={styles.countdownTimer}>
      <span>{remainingTime.days}</span>
      <span>days</span>
      <span className={styles.twoNumbers}>{remainingTime.hours}</span>
      <span>hours</span>
      <span className={styles.twoNumbers}>{remainingTime.minutes}</span>
      <span>minutes</span>
      <span className={styles.twoNumbers}>{remainingTime.seconds}</span>
      <span>seconds</span>
    </div>
  );
}

CountdownTimer.propTypes = {
  countdownTimestampMs: PropTypes.number.isRequired,
};

export default CountdownTimer;
