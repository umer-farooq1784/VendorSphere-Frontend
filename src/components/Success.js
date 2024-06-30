import React from 'react'

const Success = ({ content }) => {
  return (
    <div className="bg-green-200 border-green-600 text-green-600 border-l-4 p-4" role="alert">
      <p className="font-bold">Success</p>
      <p>{content}</p>
    </div>
  )
}

export default Success
