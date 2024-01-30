import s from "./styles.module.css";

const colorTypes = ['R', 'G', 'B'];

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
      {colorTypes.map(type => (
        <div key={type}>
          <label htmlFor={`${colorKey}-${type}`}>{type}:</label>
          <input
            type="range"
            min="0"
            max="255"
            value={colorValues[type]}
            name={type}
            id={`${colorKey}-${type}`}
            onChange={handleColorChange}
          />
        </div>
      ))}
    </div>
  )
}

export default ColorPicker