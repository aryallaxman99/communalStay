import React from 'react'

const Button = (props) => {
    const{children , className ,...rest}= props
  return (
    <button {...rest} className={`p-2 w-full text-white rounded-2xl ${className ?? ""}`}>
      {children}
    </button>
    )
}

export default Button