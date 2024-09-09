import React from 'react'

function Button(
    {
        children,
        onClick,
        className='',
        bgColor='bg-blue-600',
        type='button',
        ...props
    }
) {
  return (
    <button className={`px=4 py-2 rounded ${bgColor} text-white ${className}`}{...props}>
      {children}
    </button>
  )
}

export default Button
