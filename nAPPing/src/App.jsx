import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Accueil from "./Accueil";
import Page2 from "./Page2";

const App = () => {
  const [time, setTime] = useState(600);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil time={time} setTime={setTime} />} />
        <Route path="/sieste" element={<Page2 time={time} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
