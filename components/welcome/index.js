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

const parseRGB = (rgbString) => {
  const colors = rgbString.replace(/[rgb()]/g, '').split(',').map(c => c.trim());
  
  return {
    R: colors[0] || '0',
    G: colors[1] || '0',
    B: colors[2] || '0'
  };
}

const Welcome = () => {
  const [currentPalette, setCurrentPalette] = useState(defaultPalette);
  const [editingPaletteId, setEditingPaletteId] = useState(null);
  const [palettes, setPalettes] = useState();
  const [loading, setLoading] = useState(true);

  const updateColor = (colorKey, newValues) => {
    setCurrentPalette(prevPalette => ({
      ...prevPalette,
      [colorKey]: newValues
    }));
  };

  const fetchPalettes = async () => {
    setLoading(true);
    try {
      const { status, data } = await axios.get("/api/palette");
      
      if (status === 200) {
        setPalettes(data);
      } else {
        throw new Error("Error fetching palettes");
      }
    } catch (error) {
      console.error('Error fetching palettes:', error);
    } finally {
      setLoading(false)
    }
  };

  const editPalette = (palette) => {
    setEditingPaletteId(palette.id);
    setCurrentPalette({
      color1: parseRGB(palette.color1),
      color2: parseRGB(palette.color2),
      color3: parseRGB(palette.color3),
      color4: parseRGB(palette.color4),
      color5: parseRGB(palette.color5),
    });
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

      if (editingPaletteId) {
        await axios.put('/api/palette', { id: editingPaletteId, ...formattedPalette });
      } else {
        await axios.post('/api/palette', formattedPalette);
      }
      await fetchPalettes();
    } catch (error) {
      console.error('Error saving palette:', error);
    } finally {
      setEditingPaletteId(null)
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete('/api/palette', { data: { id } });
      await fetchPalettes();
    } catch (error) {
      console.error('Error deleting palette:', error);
    }
  }

  useEffect(() => {
    fetchPalettes();
  }, []);

  return (
    <div className={s.welcomeContainer}>
      <section className={s.paletteCreate}>
        <h1>{editingPaletteId ? `Edit Palette #${editingPaletteId}` : 'Create Palette'}</h1>
        <form onSubmit={handleSave}>
          <button className={s.button} type="submit">
            {`Save ${ editingPaletteId ? ' Edits' : ''}`}
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
        {loading ? <span>Loading...</span> : null}
        {!loading && !palettes.length ? <span>No palettes saved</span> : null}
        {!loading && palettes.length ? palettes?.map((palette) => (
          <div key={palette.id}>
            <h4>Palette #{palette.id}</h4>
            <div key={palette.id} className={s.paletteContainer}>
              <div className={s.colorSquare} style={{ backgroundColor: palette.color1 }} />
              <div className={s.colorSquare} style={{ backgroundColor: palette.color2 }} />
              <div className={s.colorSquare} style={{ backgroundColor: palette.color3 }} />
              <div className={s.colorSquare} style={{ backgroundColor: palette.color4 }} />
              <div className={s.colorSquare} style={{ backgroundColor: palette.color5 }} />
            </div>
            <div className={s.buttonsPanel}>
              <button onClick={() => editPalette(palette)} className={s.button}>
                Edit
              </button>
              <button onClick={() => handleDelete(palette.id)} className={s.button}>
                Delete
              </button>
            </div>
          </div>
      )): null}
      </section>
    </div>
  );
};

export default Welcome;
