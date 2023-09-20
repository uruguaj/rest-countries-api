import "./style.css";
import { BsMoon } from "react-icons/bs";
import { useState } from "react";
import { redirect } from "react-router-dom";
export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const setDark = () => {
    return isDark == false ? setIsDark(true) : setIsDark(false);
  };
  return (
    <div className="header">
      <nav className="nav">
        <span
          className="header-title"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Where in the world?
        </span>
        <button onClick={setDark} className="toggle-button">
          <span className="icon">
            <BsMoon />
          </span>
        </button>
      </nav>
    </div>
  );
}
