import React from 'react'

const Input=({name, onChange, value, FieldLabel})=> {
  return (
    <div>
      <label>
        {FieldLabel}: <input name={name} onChange={onChange} value={value} />
      </label>
    </div>
  )
}
export default Input
