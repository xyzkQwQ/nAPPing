import { useState } from "react";

import LogoCat from "./assets/LogoCat.webp";
import CatSleeping from "./assets/CatSleeping.webp";

// import CircleDark from "./assets/CircleDark.svg";

import "./Page2.css";


function Page2() {

 return (
    <>
     <div className="container">
     {/* HEADER */}
          <header className="header">
    
            <div className="logoCat">
              <img
                src={LogoCat}
                className="logo"
                alt="logo"
              />
    
              <span>nAPPing</span>
            </div>
    
            <h1>Sieste en cours...</h1>
    
            <img
              src={CatSleeping}
              className="sleeping"
              alt="chat"
            />
    
          </header>

    {/* Bouton */}

      <button className="start-btn">
        Arrêter la sieste
      </button>
    </div>
    </>
 );
}
export default Page2;