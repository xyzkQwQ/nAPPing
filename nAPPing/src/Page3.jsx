import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BellWakeUp from "./assets/BellWakeUp.svg";
import LogoCat from "./assets/LogoCat.webp";
import CatSleeping from "./assets/CatSleeping.webp";
import waveform from "./assets/waveform.svg";

import "./Page3.css";

function Page3() {
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* HEADER */}
      <header className="header">
        <div className="logoCat">
          <img src={LogoCat} className="logo" alt="logo" />
          <span>nAPPing</span>
        </div>

        <h1> It's time! </h1>

        <img src={CatSleeping} className="sleeping" alt="chat" />
      </header>

      {/* CONTENU */}
      <main className="wakeUp-content">
        <img src={BellWakeUp} className="bell" alt="cloche" />

        <div className="message">
          <p>La sieste est terminée.</p>
          <p>Bonne reprise !</p>
        </div>

        <div className="music-card">
          <div className="music-header">
            <span className="music-icon">♫</span>
            <span className="music-title">Miaou Miaou Miaou</span>
          </div>

          <div className="waveform-row">
            {Array.from({ length: 8 }).map((_, index) => (
              <img key={index} src={waveform} alt="" className="waveform-piece" />
            ))}
          </div>
        </div>

        {/* BOUTON */}

        <button className="start-btn" onClick={() => navigate("/")}>
          Retour à l'acceuil
        </button>
      </main>
    </div>
  );
}

export default Page3;
