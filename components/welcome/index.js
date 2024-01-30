import { useState, useEffect } from "react";
import axios from "axios";

import ColorPicker from '../colorpicker';

import s from "./styles.module.css";

const defaultPalette = {
  'color1': { 'R': '255', 'G': '0', 'B': '0' },
  'color2': { 'R': '0', 'G': '255', 'B': '0' },
  'color3': { 'R': '0', 'G': '0', 'B': '255' },
  'color4': { 'R': '255', 'G': '255', 'B': '0' },
  'color5': { 'R': '255', 'G': '0', 'B': '255' },
};

const Welcome = () => {
  const [palette, setPalette] = useState(defaultPalette);

   const updateColor = (colorKey, newValues) => {
    setPalette(prevPalette => ({
      ...prevPalette,
      [colorKey]: newValues
    }));
  };

  return (
    <div className={s.welcomeContainer}>
      <section className={s.paletteCreate}>
      <h1>Create Palette</h1>
        <div className={s.colorPickers}>
          {Object.entries(palette).map(([colorKey, colorValues]) => {
            return (
              <ColorPicker
                key={colorKey}
                colorKey={colorKey}
                colorValues={colorValues}
                updateColor={updateColor}
              />
            )
          })}
          </div>
      </section>
      <section className={s.paletteList}>
        <h2>Palette List</h2>
      </section>
    </div>
  );
};

export default Welcome;
