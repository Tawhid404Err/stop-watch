import { useState, useEffect, useRef } from "react";

function StopWatch() {
  const [isRunning, setRunning] = useState(false);
  const [passedTime, setPassedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setPassedTime(Date.now() - startTimeRef.current);
      }, 10);

      return () => {
        clearInterval(intervalIdRef.current);
      };
    }
  }, [isRunning]);

  function resetTimer() {
    setPassedTime(0);
    setRunning(false);
  }

  function startTimer() {
    setRunning(true);
    startTimeRef.current = Date.now() - passedTime;
  }

  function stopTimer() {
    setRunning(false);
  }

  function formatTime() {
    let hours = Math.floor(passedTime / (1000 * 60 * 60));
    let minutes = Math.floor((passedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((passedTime / 1000) % 60);
    let milliSeconds = Math.floor((passedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliSeconds = String(milliSeconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliSeconds}`;
  }

  return (
    <>
      <div className="wrapper">
        <div className="watch_container">
          <div className="display_timer">
            <p>{formatTime()}</p>
          </div>

          <div className="button_container">
            <button onClick={resetTimer}>Reset</button>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StopWatch;
