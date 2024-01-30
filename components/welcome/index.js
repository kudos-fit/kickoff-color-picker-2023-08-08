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

  const fetchPalettes = async () => {
    try {
      const { status, data } = await axios.get("/api/palette");
      
      if (status === 200) {
        setPalettes(data);
      } else {
        throw new Error("Error fetching palettes");
      }
    } catch (error) {
      console.error('Error fetching palettes:', error);
    }
  };
  
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formattedPalette = {
        color1: `rgb(${currentPalette.color1.R}, ${currentPalette.color1.G}, ${currentPalette.color1.B})`,
        color2: `rgb(${currentPalette.color2.R}, ${currentPalette.color2.G}, ${currentPalette.color2.B})`,
        color3: `rgb(${currentPalette.color3.R}, ${currentPalette.color3.G}, ${currentPalette.color3.B})`,
        color4: `rgb(${currentPalette.color4.R}, ${currentPalette.color4.G}, ${currentPalette.color4.B})`,
        color5: `rgb(${currentPalette.color5.R}, ${currentPalette.color5.G}, ${currentPalette.color5.B})`,
      };
      await axios.post('/api/palette', formattedPalette);
      await fetchPalettes();
    } catch (error) {
      console.error('Error saving palette:', error);
    }
  };

  useEffect(() => {
    fetchPalettes();
  }, []);

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
