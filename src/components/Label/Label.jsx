import React from 'react'

const Label = ({ className, title ,htmlFor}) => {
  return (
    <label className={className} htmlFor={htmlFor}>
      {title}
    </label>
  )
}

export default Label