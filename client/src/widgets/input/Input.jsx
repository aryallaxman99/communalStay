import React from 'react'

const Input = (props) => {
    const{className, ...rest}=props
  return (
    <input className={`w-full border my-1 py-2 px-3 rounded-2xl ${className}`} {...rest}/>
  )
}

export default Input