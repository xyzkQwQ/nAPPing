import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Accueil from "./Accueil";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Header from "./Header"


const App = () => {
  const [time, setTime] = useState(600);
  const [hourStart, setHourStart] = useState(14);
  const [minuteStart, setMinuteStart] = useState(30);
  const [alarm, setAlarm] = useState("Hisashiburi");

  return (
    <div className="container">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Header title="Planifiez votre sieste" />
            <Accueil 
              time={time} 
              setTime={setTime} 
              hourStart={hourStart} 
              setHourStart={setHourStart} 
              minuteStart={minuteStart} 
              setMinuteStart={setMinuteStart}
              alarm={alarm} 
              setAlarm={setAlarm} />
            </>
          } 
          />

         <Route path="/sieste" element={
          <>
            <Header title="Sieste en cours..." />

            <Page2 
              time={time} 
              setTime={setTime}
              hourStart={hourStart}
              minuteStart={minuteStart}/>
          </>
         } 
         />

         <Route path="/reveil" element={
          <>
            <Header title="It's time!" />
            <Page3
              alarm={alarm} />
          </>
        } 
        />
          


      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
