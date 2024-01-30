import { useState, useEffect } from "react";
import axios from "axios";

import s from "./styles.module.css";

const defaultPalette = { 'R': '255', 'G': '0', 'B': '0'}
const Welcome = () => {
  const [palette, setPalette] = useState(defaultPalette);

  const paletteColor = `rgb(${palette.R}, ${palette.G},${palette.B})`
  
  return (
    <div className={s.welcomeContainer}>
      <h1 className={s.welcome}>Create Palette</h1>
      <div className={s.colorSquare} style={{ backgroundColor: paletteColor }} />
    </div>
  );
};

export default Welcome;
