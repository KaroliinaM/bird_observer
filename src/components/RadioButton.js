import React from 'react'

const RadioButton=({selection, value, checked})=> {
  return(
    <div>
    <label>
      <input type="radio" name="newRarity" onChange={selection} value={value} checked={checked} />
      {value}
    </label>
    </div>
  )
}

export default RadioButton
