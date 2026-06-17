import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Accueil from "./Accueil";
import Page2 from "./Page2";
import Page3 from "./Page3";

const App = () => {
  const [time, setTime] = useState(600);
  const [hourStart, setHourStart] = useState(14);
  const [minuteStart, setMinuteStart] = useState(30);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Accueil 
            time={time} 
            setTime={setTime} 
            hourStart={hourStart} 
            setHourStart={setHourStart} 
            minuteStart={minuteStart} 
            setMinuteStart={setMinuteStart} />
          } 
          />

         <Route path="/sieste" element={
          <Page2 
          time={time} 
          setTime={setTime}
          hourStart={hourStart}
          minuteStart={minuteStart}/>
         } 
         />

         <Route path="/reveil" element={
          <Page3 
          />} 
        />
          


      </Routes>
    </BrowserRouter>
  );
};

export default App;
