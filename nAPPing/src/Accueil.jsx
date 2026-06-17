import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LogoCat from "./assets/LogoCat.webp";
import CatSleeping from "./assets/CatSleeping.webp";

import BellSong from "./assets/BellSong.svg";
import ClockSong from "./assets/ClockSong.svg";
import ArrowDown from "./assets/ArrowDown.svg";

import "./Accueil.css";

/**
 * Premier composant affiché, permet de régler la durée du timer
 */
function Accueil({ time, setTime, hourStart, setHourStart, minuteStart, setMinuteStart }) {
  // const [duration, setDuration] = useState(20);
  const navigate = useNavigate();

  const [reminder, setReminder] = useState(false);
  const [alarm, setAlarm] = useState("Hisashiburi");

  /**
   * Fonction qui redirige vers la page 2
   */
  function startTime() {
    // redirection de l'utilisation vers la page de sieste
    navigate("/sieste");
  }

  /**
   * Fonction qui gère la modification de l'heure
   */
  function handleHourChange(event) {
    const value = event.target.value;
    const [hour, minute] = value.split(":");
    // TODO appeler le "setHour" et "setMinutes"
    setHourStart(Number(hour));
    setMinuteStart(Number(minute));
  }

  return (
    <>
      <div className="container">
        {/* HEADER */}
        <header className="header">
          <div className="logoCat">
            <img src={LogoCat} className="logo" alt="logo" />

            <span>nAPPing</span>
          </div>

          <h1>Planifiez votre sieste</h1>

          <img src={CatSleeping} className="sleeping" alt="chat" />
        </header>

        {/* LIGNE 1 */}

        <section className="row">
          {/* Heure */}

          <div className="card">
            <label>Heure de la sieste</label>

            <div className="input-box">
              <input type="time" onChange={handleHourChange} defaultValue={hourStart + ":" + minuteStart} />

              <img src={ClockSong} className="icon" alt="clock" />
            </div>
          </div>

          {/* Durée */}

          <div className="card">
            <label>Durée de la sieste</label>

            <div className="duration-group">
              {[10, 20, 30].map((item) => (
                <button key={item} className={time === item * 60 ? "active" : ""} onClick={() => setTime(item * 60)}>
                  {item} min
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* LIGNE 2 */}

        <section className="row">
          {/* Rappel */}

          <div className="card">
            <label>Rappel avant la sieste</label>

            <div className="switch-box">
              <div className="left">
                <img src={BellSong} className="icon" alt="bell" />

                <span>10 min avant</span>
              </div>

              <input type="checkbox" checked={reminder} onChange={() => setReminder(!reminder)} />
            </div>
          </div>

          {/* Alarme */}

          <div className="card">
            <label>Choix de l'alarme</label>

            <div className="select-box">
              <select value={alarm} onChange={(e) => setAlarm(e.target.value)}>
                <option>KittyJJK</option>

                <option>Hisashiburi</option>
              </select>

              <img src={ArrowDown} className="arrow" alt="open" />
            </div>
          </div>
        </section>

        {/* Bouton */}

        <button className="start-btn" onClick={startTime}>
          Lancer la sieste
        </button>
      </div>
    </>
  );
}

export default Accueil;
