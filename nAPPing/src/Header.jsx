import LogoCat from "./assets/LogoCat.webp";
import CatSleeping from "./assets/CatSleeping.webp";

const Header = ({ title }) => {
  return (
    <header className="header">
      <div className="logoCat">
        <img src={LogoCat} className="logo" alt="logo" />

        <span>nAPPing</span>
      </div>

      <h1>{title}</h1>

      <img src={CatSleeping} className="sleeping" alt="chat" />
    </header>
  );
};

export default Header;
