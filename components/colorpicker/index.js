import s from "./styles.module.css";

const ColorPicker = (props) => {
  const { colorKey, colorValues, updateColor } = props;
  
  const handleColorChange = (e) => {
    const { name, value } = e.target;
    updateColor(colorKey, {
      ...colorValues,
      [name]: value
    });
  };

  const paletteColor = `rgb(${colorValues.R}, ${colorValues.G},${colorValues.B})`

  return (
    <div className={s.colorPicker}>
      <div className={s.colorSquare} style={{ backgroundColor: paletteColor }} />
      <h3>{paletteColor}</h3>
      <input type="range" min="0" max="255" value={colorValues.R} name="R" id={`${colorKey}-R`} onChange={handleColorChange} />
      <input type="range" min="0" max="255" value={colorValues.G} name="G" id={`${colorKey}-G`} onChange={handleColorChange} />
      <input type="range" min="0" max="255" value={colorValues.B} name="B" id={`${colorKey}-B`} onChange={handleColorChange} />
    </div>
  )
}

export default ColorPicker