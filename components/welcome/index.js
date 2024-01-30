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
  const [currentPalette, setCurrentPalette] = useState(defaultPalette);
  const [palettes, setPalettes] = useState();

  const updateColor = (colorKey, newValues) => {
    setCurrentPalette(prevPalette => ({
      ...prevPalette,
      [colorKey]: newValues
    }));
   };
  
  const handleSave = (e) => {
    e.preventDefault();
    console.log('Saved palette:', palette);
  };


 useEffect(() => {
    const fetchPalettes = async () => {
      const { status, data } = await axios.get("/api/palette");

      if (status === 200) {
        setPalettes(data);
      } else {
        throw new Error("Error connecting to server");
      }
    };

    fetchPalettes();
  }, [setPalettes, axios]);

  return (
    <div className={s.welcomeContainer}>
      <section className={s.paletteCreate}>
        <h1>Create Palette</h1>
        <form onSubmit={handleSave}>
          <button className={s.button} type="submit">
            Save
          </button>
        <div className={s.colorPickers}>
          {Object.entries(currentPalette).map(([colorKey, colorValues]) => {
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
        </form>
      </section>
      <section className={s.paletteList}>
        <h2>Saved Palettes</h2>
        {palettes?.map((palette) => (
        <div key={palette.id} className={s.paletteContainer}>
          <div className={s.colorSquare} style={{ backgroundColor: palette.color1 }}></div>
          <div className={s.colorSquare} style={{ backgroundColor: palette.color2 }}></div>
          <div className={s.colorSquare} style={{ backgroundColor: palette.color3 }}></div>
          <div className={s.colorSquare} style={{ backgroundColor: palette.color4 }}></div>
          <div className={s.colorSquare} style={{ backgroundColor: palette.color5 }}></div>
        </div>
      ))}
      </section>
    </div>
  );
};

export default Welcome;
