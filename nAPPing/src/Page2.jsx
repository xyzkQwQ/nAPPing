import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LogoCat from "./assets/LogoCat.webp";
import CatSleeping from "./assets/CatSleeping.webp";

import "./Page2.css";

/**
 * Deuxième composant affiché
 *
 */
function Page2({ time, setTime, hourStart, minuteStart }) {
  // const [timeLeft, setTimeLeft] = useState(time);

  const [totalTime] = useState(time);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const progress = ((totalTime - time) / totalTime) * 100;

  let endHour = hourStart;
  let endMinute = minuteStart + Math.floor(time / 60);
  if (endMinute >= 60) {
    endHour += Math.floor(endMinute / 60);
    endMinute = endMinute % 60;
  }

  return (
    <div className="container">
      {/* HEADER */}
      <header className="header">
        <div className="logoCat">
          <img src={LogoCat} className="logo" alt="logo" />

          <span>nAPPing</span>
        </div>

        <h1>Sieste en cours...</h1>

        <img src={CatSleeping} className="sleeping" alt="chat" />
      </header>

      {/* TIMER */}

      <section className="timer-section">
        <div
          className="circle"
          style={{
            background: `conic-gradient(#999 ${progress}%, #ddd ${progress}% 100%)`,
          }}
        >
          <div className="time">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </div>

          <div className="remaining">Minutes
            <br />restantes</div>
        </div>

        <h2>
          Sieste prévue jusqu'à {endHour}h{endMinute.toString().padStart(2, "0")}
        </h2>
      </section>

      {/* BOUTON */}

      <button 
        className="start-btn"
        onClick={() => navigate("/reveil")}
        >
        Arrêter la sieste
      </button>
    </div>
  );
}

export default Page2;
