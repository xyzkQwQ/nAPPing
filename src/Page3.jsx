import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BellWakeUp from "./assets/BellWakeUp.svg";
import waveform from "./assets/waveform.svg";

import Hisashiburi from "./assets/Hisashiburi.mp3";
import KittyJJK from "./assets/KittyJJK.mp3";

import "./Page3.css";

function Page3({ alarm }) {
  const navigate = useNavigate();
  const songs = {
    Hisashiburi,
    KittyJJK,
  };

  useEffect(() => {
    // TODO déclencher la musique
    const audio = new Audio(songs[alarm]);
    audio.play();

    return () => {
      console.log(audio);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [alarm]);

  return (
    // <div className="container">
    <main className="wakeUp-content">
      <img src={BellWakeUp} className="bell" alt="cloche" />

      <div className="message">
        <p>La sieste est terminée.</p>
        <p>Bonne reprise !</p>
      </div>

      <div className="music-card">
        <div className="music-header">
          <span className="music-icon">♫</span>
          <span className="music-title">{alarm}</span>
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
    // </div>
  );
}

export default Page3;
