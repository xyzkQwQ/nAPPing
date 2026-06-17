import { useEffect } from "react";


import BellWakeUp from "./assets/BellWakeUp.svg"
import LogoCat from "./assets/LogoCat.webp";
import CatSleeping from "./assets/CatSleeping.webp";
import waveform from "./assets/waveform.svg";



return (
    <div className="container">

    {/* HEADER */}
      <header className="header">
        <div className="logoCat">
          <img src={LogoCat} className="logo" alt="logo" />

          <span>nAPPing</span>
        </div>

        <h1>C'est l'heure de se réveiller!</h1>

        <img src={CatSleeping} className="sleeping" alt="chat" />
      </header>
</div>
);

export default Page3;
