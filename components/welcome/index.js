import { useState, useEffect } from "react";
import axios from "axios";

import s from "./styles.module.css";

const defaultPalette = { 'R': '255', 'G': '0', 'B': '0'}
const Welcome = () => {
  const [palette, setPalette] = useState(defaultPalette);

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setPalette(prevPalette => ({
      ...prevPalette,
      [name]: value
    }));
  };

  const paletteColor = `rgb(${palette.R}, ${palette.G},${palette.B})`
  
  return (
    <div className={s.welcomeContainer}>
      <h1 className={s.welcome}>Create Palette</h1>
      <div className={s.colorSquare} style={{ backgroundColor: paletteColor }} />
      {paletteColor}
      <input type="range" min="0" max="255" value={palette.R} name="R" id="R" onChange={handleColorChange} />
      <input type="range" min="0" max="255" value={palette.G} name="G" id="G" onChange={handleColorChange} />
      <input type="range" min="0" max="255" value={palette.B} name="B" id="B" onChange={handleColorChange} />
    </div>
  );
};

export default Welcome;
